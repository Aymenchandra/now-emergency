"use server"
import * as z from "zod"

import { db } from "@/lib/db"
import { getEmergencyById } from "@/data/emergency"
import { updateEmergencyStatusSchema } from "@/schemas";
import { CurrentUser } from "@/lib/auth";
import { emergencyStatus } from "@prisma/client";


export const doneEmergency = async (payload: z.infer<typeof updateEmergencyStatusSchema>) => {

    const validatedFields = updateEmergencyStatusSchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const emergency = await getEmergencyById(validatedFields.data.id);

    if (!emergency) {
        return { error: "Emergency Not Found" }
    }

    const employee = await CurrentUser()
    //already taken by other employee
    if (emergency.employeeId !== employee?.id) {
        return { error: `Only assigned employee can complete this emergency` }
    }

    // take employee id from token
    await db.emergency.update({
        where: { id: validatedFields.data.id },
        data: {
            status: emergencyStatus.DONE,
        },
    })

    return { success: "Emergency Assigned Successfully!" }
}