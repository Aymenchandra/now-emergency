"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import { RegisterSchema } from "@/schemas"


export const register = async (payload : z.infer<typeof RegisterSchema> ) => {

    const validatedFields = RegisterSchema.safeParse(payload);

    if(!validatedFields.success){
        return { error : "Invalid fields!"};
    }

    const { email, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password,10)

    const existingUser = await getUserByEmail(email)

    if(existingUser){
        return {error : "Email already in use! "}
    }
    await db.user.create({
        data: {
            ...validatedFields.data,
            password: hashedPassword,
            location: {
              create: {
                country: validatedFields.data.location.country,
                governorate: validatedFields.data.location.governorate as string,
              }
            }
          }
        });

    const verificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(verificationToken.email,verificationToken.token)
    return {success : "Confirmation email sent!"}
}