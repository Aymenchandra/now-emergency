"use server"
import bcrypt from "bcryptjs"
import * as z from "zod"
import { db } from "@/lib/db"
import { getUserByEmail, getUserById } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import { editUserSchema } from "@/schemas/data-table-user-schema"


export const editUser = async (payload: z.infer<typeof editUserSchema>,idUser : string) => {

    const dbUser = await getUserById(idUser);

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    // is OAuth User
    if (payload.password === null) {
        payload.email = undefined;
        payload.newPassword = undefined;
        payload.isTwoFactorEnabled = undefined;
    }

 
    var emailsent = ''
    if (payload.email !== dbUser.email) {
        const existingUser = await getUserByEmail(payload.email as string);

        if (existingUser && existingUser.id !== dbUser.id) {
            return { error: "Email already in use!" }
        }

        const verificationToken = await generateVerificationToken(payload.email as string)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        emailsent = ' Verification email sent!'
    }

    if(payload.newPassword && dbUser.password){

        const hashedPassword = await bcrypt.hash(payload.newPassword, 10)

        payload.password = hashedPassword;
        payload.newPassword = undefined;
    }

    
    await db.user.update({
        where: { id: idUser },
        data: {
            ...payload
        }
    })

    
    return { success: "Profile Updated!" + emailsent }
}