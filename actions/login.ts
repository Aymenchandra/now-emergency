"use server"

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth";
import * as z from "zod"
import {compare} from "bcryptjs"


export const login = async (payload: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data

    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: 'Email does not exist!' }
    }
    
    const matchedPassword = await compare(password, existingUser.password);

    if(!matchedPassword) {
        return { error : 'Please enter the correct password'}
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return { success: "Confirmation email sent!" }
    }
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: '/settings',
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw error;
    }
    return { success: "Email sent!" }
}