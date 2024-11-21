"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { multideleteUserSchema } from "@/schemas/data-table-user-schema"


export const deleteMultiUser = async (payload: z.infer<typeof multideleteUserSchema>) => {

    const validatedFields = multideleteUserSchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    if (payload.idList.length === 0) {
        return { error: "No IDs provided to delete" };
    }

    try {
        const result = await db.user.deleteMany({
            where: {
                id: {
                    in: payload.idList,
                },
            },
        });

        if (result.count === 0) {
            return { error: "No users found with the provided IDs" };
        }

        return { success: `${result.count} user(s) deleted successfully` };
    } catch (error) {
        return { error: `Failed to delete users:` };
    }

}