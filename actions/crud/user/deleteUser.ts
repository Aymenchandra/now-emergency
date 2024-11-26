"use server"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"


export const deleteUser = async (id: string) => {

    const user = await getUserById(id);

    if (!user) {
        return { error: "User Not Found" }
    }
    
    await db.user.delete({
        where: { id: id },
    })
    
    return { success: "User Deleted Successfully!" }
}