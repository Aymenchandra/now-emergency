"use server"
import { db } from "@/lib/db"

export const deleteManyUser = async (idList : string[]) => {

    try {
        const result = await db.user.deleteMany({
            where: {
                id: {
                    in: idList,
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