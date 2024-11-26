"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { multideleteSchema } from "@/schemas/index"


export const deleteMultiUser = async (payload: z.infer<typeof multideleteSchema>) => {

    const validatedFields = multideleteSchema.safeParse(payload);

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
                    in: validatedFields.data.idList,
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