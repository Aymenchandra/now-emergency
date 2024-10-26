"use server"

import { LoginSchema } from "@/schemas"
import * as z from "zod"


export const login = async (payload : z.infer<typeof LoginSchema> ) => {
    const validatedFields = LoginSchema.safeParse(payload);

    if(!validatedFields){
        return { error : "Invalid fields!"};
    }

    return {success : "Email sent!"}
}