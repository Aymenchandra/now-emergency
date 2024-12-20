"use server"
import { EmergencyData } from "@/components/layout/features/emergencies/admin-emergencies-list"
import { CurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"

export const getEmergencyById = async (id: string) => {
    try {
        const emergency = await db.emergency.findUnique({ where: { id } });
        return emergency;
    } catch (error) {
        console.error("Error fetching emergency:", error);
        return null;
    }
}


export const getAllEmergencies = async (): Promise<EmergencyData[]> => {
    try {
        const emergency = await db.emergency.findMany({ include: { user: true } })
        return emergency
    } catch {
        return []
    }
}

export const getAllAssistancesByEmployee = async (): Promise<EmergencyData[]> => {
    const user = await CurrentUser();
    // get emergencies list in my area which is location.governorate
    try {
        const emergency = await db.emergency.findMany({ where: { governorate: user?.location.governorate }, include: { user: true } })
        return emergency
    } catch {
        return []
    }
}