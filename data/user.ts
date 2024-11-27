import { db } from "@/lib/db"
import { Emergency } from "@prisma/client"


export const getUserByEmail = async(email: string) => {
    try {
        const user = await db.user.findUnique({where : {email}})
        return user
    } catch {
        return null
    }
}

export const getUserById = async(id: string) => {
    try {
        const user = await db.user.findUnique({where : {id}})
        return user
    } catch {
        return null
    }
}
export const getEmergencyByUserId = async (userId: string): Promise<Emergency[]> => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                Emergency: true,
            },
        });

        // If the user is found, return their emergencies, otherwise return an empty array
        return user?.Emergency ?? []; 
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of an error
    }
};