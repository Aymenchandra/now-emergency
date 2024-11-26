import { db } from "@/lib/db"

export const getEmergencyById = async(id: string) => {
    try {
        const emergency = await db.emergency.findUnique({where : {id}})
        return emergency
    } catch {
        return null
    }
}