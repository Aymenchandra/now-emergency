"use server"
import * as z from "zod"
import { db } from "@/lib/db"
import { getEmergencyById } from "@/data/emergency"
import { deleteSchema } from "@/schemas/index"


export const deleteEmergency = async (payload: z.infer<typeof deleteSchema>) => {

    const validatedFields = deleteSchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const emergency = await getEmergencyById(validatedFields.data.id);

    if (!emergency) {
        return { error: "Emergency Not Found" }
    }
    
    await db.emergency.delete({
        where: { id: validatedFields.data.id },
    })
    
    return { success: "Emergency Deleted Successfully!" }
}