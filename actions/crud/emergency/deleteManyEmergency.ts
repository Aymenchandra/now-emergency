"use server"
import { db } from "@/lib/db"


export const deleteManyEmergency = async (idList : string[]) => {

    try {
        const result = await db.emergency.deleteMany({
            where: {
                id: {
                    in: idList,
                },
            },
        });

        if (result.count === 0) {
            return { error: "No emergency found with the provided IDs" };
        }

        return { success: `${result.count} emergency(s) deleted successfully` };
    } catch (error) {
        return { error: `Failed to delete emergency:` };
    }

}