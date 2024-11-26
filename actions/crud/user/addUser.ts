"use server"

import { AddUserSchema } from "@/schemas"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"


export const addUser = async (payload : z.infer<typeof AddUserSchema> ) => {
    const validatedFields = AddUserSchema.safeParse(payload);

    if(!validatedFields.success){
        return { error : "Invalid fields!"};
    }

    const { email, password } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if(existingUser){
        return {error : "Email already in use! "}
    }

    const hashedPassword = await bcrypt.hash(password,10)

    await db.user.create({
        data: {
            ...validatedFields.data,
            password : hashedPassword
        }
    })

    return {success : "User Added Successfully!"}
}