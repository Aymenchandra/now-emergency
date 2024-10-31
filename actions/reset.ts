"use server"
import * as z from "zod"
import { getUserByEmail } from "@/data/user"
import { ResetSchema } from "@/schemas"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"

export const reset = async (payload: z.infer<typeof ResetSchema>) =>{
    const validatedFields = ResetSchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return { error: 'Email does not exist!' }
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(passwordResetToken.email,passwordResetToken.token);
    
    return { success : "Reset email sent!"}
}