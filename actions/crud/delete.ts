"use server"
import * as z from "zod"
import { deleteSchema } from "@/schemas/index"
import { deleteEmergency } from "./emergency/deleteEmergency"
import { layoutEntity } from "@/lib/layout-entity"
import { deleteUser } from "./user/deleteUser"


export const deleteEntity = async (payload: z.infer<typeof deleteSchema>, entity : layoutEntity) => {

    const validatedFields = deleteSchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    switch (entity) {
        case layoutEntity.EMERGENCIES:
            await deleteEmergency(validatedFields.data.id);
            break;
        case layoutEntity.USERS:
            await deleteUser(validatedFields.data.id);
            break;
        default:
            return { error: "Please Check layout entity name!" }
    }

    return { success: "Deleted Successfully!" }
    
}