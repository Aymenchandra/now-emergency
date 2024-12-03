"use server"
import bcrypt from "bcryptjs"
import { ProfileSchema } from "@/schemas"
import * as z from "zod"
import { db } from "@/lib/db"
import { getUserByEmail, getUserById } from "@/data/user"
import { CurrentUser } from "@/lib/auth"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"


export const profile = async (payload: z.infer<typeof ProfileSchema>) => {
    
    const validatedFields = ProfileSchema.safeParse(payload);

    if(!validatedFields.success){
        return { error : "Invalid fields!"};
    }

    const user = await CurrentUser();

    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id as string)

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    if (user.isOAuth) {
        validatedFields.data.email = undefined;
        validatedFields.data.password = undefined;
        validatedFields.data.newPassword = undefined;
        validatedFields.data.isTwoFactorEnabled = undefined;
    }

    var emailsent = ''
    if (validatedFields.data.email && validatedFields.data.email !== user.email) {
        const existingUser = await getUserByEmail(validatedFields.data.email);

        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email already in use!" }
        }

        const verificationToken = await generateVerificationToken(validatedFields.data.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        validatedFields.data.emailVerified = null
        emailsent = ' Verification email sent!'
    }

    if(validatedFields.data.password && validatedFields.data.newPassword && dbUser.password){
        const passwordsMatch = await bcrypt.compare(validatedFields.data.password,dbUser.password);
        
        if(!passwordsMatch){
            return { error : "Incorrect password!"}
        }

        const hashedPassword = await bcrypt.hash(validatedFields.data.newPassword, 10)

        validatedFields.data.password = hashedPassword;
        validatedFields.data.newPassword = undefined;
    }

    await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...validatedFields.data,
            location: {
              update: {
                country: validatedFields.data.location.country,
                governorate: validatedFields.data.location.governorate as string,
              }
            }
          }
    })

    return { success: "Profile Updated!" + emailsent }
}