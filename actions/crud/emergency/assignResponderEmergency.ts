"use server"
import * as z from "zod"

import { db } from "@/lib/db"
import { getEmergencyById } from "@/data/emergency"
import { updateEmergencyStatusSchema } from "@/schemas";
import { CurrentUser } from "@/lib/auth";
import { emergencyStatus } from "@prisma/client";


export const assignResponderEmergency = async (payload: z.infer<typeof updateEmergencyStatusSchema>) => {

    const validatedFields = updateEmergencyStatusSchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const emergency = await getEmergencyById(validatedFields.data.id);

    if (!emergency) {
        return { error: "Emergency Not Found" }
    }

    //already taken by other employee
    if (emergency.employeeId) {
        return { error: `This emergency has already been taken` }
    }

    // take employee id from token
    const employee = await CurrentUser()
    await db.emergency.update({
        where: { id: validatedFields.data.id },
        data: {
            status: emergencyStatus.PENDING,
            employeeId: employee?.id, // Assign the employee to handle the emergency
        },
    })

    return { success: "Emergency Assigned Successfully!" }
}