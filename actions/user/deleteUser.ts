"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import { deleteUserSchema } from "@/schemas/data-table-user-schema"


export const deleteUser = async (payload: z.infer<typeof deleteUserSchema>) => {

    const validatedFields = deleteUserSchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const user = await getUserById(payload.id);

    if (!user) {
        return { error: "User Not Found" }
    }
    
    await db.user.delete({
        where: { id: payload.id },
    })
    
    return { success: "User Deleted Successfully!" }
}