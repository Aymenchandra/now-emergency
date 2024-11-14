"use server"
import bcrypt from "bcryptjs"
import { EditUserSchema } from "@/schemas"
import * as z from "zod"
import { db } from "@/lib/db"
import { getUserByEmail, getUserById } from "@/data/user"
import { CurrentUser } from "@/lib/auth"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"


export const editUser = async (payload: z.infer<typeof EditUserSchema>,id : string) => {

    const user = await CurrentUser();

    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id as string)

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    if (user.isOAuth) {
        payload.email = undefined;
        payload.password = undefined;
        payload.newPassword = undefined;
        payload.isTwoFactorEnabled = undefined;
    }

    var emailsent = ''
    if (payload.email && payload.email !== user.email) {
        const existingUser = await getUserByEmail(payload.email);

        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email already in use!" }
        }

        const verificationToken = await generateVerificationToken(payload.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        payload.emailVerified = null
        emailsent = ' Verification email sent!'
    }

    if(payload.password && payload.newPassword && dbUser.password){
        const passwordsMatch = await bcrypt.compare(payload.password,dbUser.password);
        
        if(!passwordsMatch){
            return { error : "Incorrect password!"}
        }

        const hashedPassword = await bcrypt.hash(payload.newPassword, 10)

        payload.password = hashedPassword;
        payload.newPassword = undefined;
    }

    await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...payload
        }
    })

    
    return { success: "Profile Updated!" + emailsent }
}