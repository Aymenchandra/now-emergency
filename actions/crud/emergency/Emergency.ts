"use server"

import { EmergencySchema } from "@/schemas"
import * as z from "zod"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import { getEmergencyById } from "@/data/emergency"


export const emergency = async (payload: z.infer<typeof EmergencySchema>, idEmergency ?: string) => {
    const validatedFields = EmergencySchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const existingUser = await getUserById(validatedFields.data.userId)

    if (!existingUser) {
        return { error: "User Not found ! try again " }
    }

    const existingEmergency = await getEmergencyById(idEmergency as string)

    if(!existingEmergency){
        await db.emergency.create({
            data: {
                ...validatedFields.data
            }
        })
    }

    if(existingEmergency){
        await db.emergency.update({
            where: { id: idEmergency },
            data: {
                ...validatedFields.data
            }
        })
    }
   

    return { success: "Emergency Added Successfully!" }
}