"use server"
import { db } from "@/lib/db"
import { getEmergencyById } from "@/data/emergency"


export const deleteEmergency = async (id: string) => {

    const emergency = await getEmergencyById(id);

    if (!emergency) {
        return { error: "Emergency Not Found" }
    }
    
    await db.emergency.delete({
        where: { id: id },
    })
    
    return { success: "Emergency Deleted Successfully!" }
}