import { EmergencyData } from "@/components/layout/features/emergencies/admin-emergencies-list"
import { db } from "@/lib/db"

export const getEmergencyById = async(id: string) => {
    try {
        const emergency = await db.emergency.findUnique({where : {id}})
        return emergency
    } catch {
        return null
    }
}

export const getAllEmergencies = async(): Promise<EmergencyData[]>  => {
    try {
        const emergency = await db.emergency.findMany({ include: { user: true } })
        return emergency
    } catch {
        return []
    }
}