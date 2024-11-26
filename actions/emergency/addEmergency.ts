"use server"

import { AddEmergencySchema } from "@/schemas"
import * as z from "zod"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"


export const AddEmergency = async (payload: z.infer<typeof AddEmergencySchema>) => {
    const validatedFields = AddEmergencySchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const existingUser = await getUserById(validatedFields.data.userId)

    if (!existingUser) {
        return { error: "User Not found ! try again " }
    }

    await db.emergency.create({
        data: {
            ...validatedFields.data
        }
    })

    return { success: "Emergency Added Successfully!" }
}