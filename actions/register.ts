"use server"

import { RegisterSchema } from "@/schemas"
import * as z from "zod"


export const register = async (payload : z.infer<typeof RegisterSchema> ) => {
    const validatedFields = RegisterSchema.safeParse(payload);

    console.log(payload)
    if(!validatedFields){
        return { error : "Invalid fields!"};
    }

    return {success : "Email sent!"}
}