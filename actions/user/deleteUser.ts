"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import { deleteSchema } from "@/schemas/index"


export const deleteUser = async (payload: z.infer<typeof deleteSchema>) => {

    const validatedFields = deleteSchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const user = await getUserById(validatedFields.data.id);

    if (!user) {
        return { error: "User Not Found" }
    }
    
    await db.user.delete({
        where: { id: validatedFields.data.id },
    })
    
    return { success: "User Deleted Successfully!" }
}