"use server"
import * as z from "zod"
import { deleteManySchema } from "@/schemas/index"
import { layoutEntity } from "@/lib/layout-entity"
import { deleteManyUser } from "./user/deleteMultiUser"
import { deleteManyEmergency } from "./emergency/deleteManyEmergency"


export const deleteManyEntity = async (payload: z.infer<typeof deleteManySchema>, entity : layoutEntity) => {

    const validatedFields = deleteManySchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    if (payload.idList.length === 0) {
        return { error: "No IDs provided to delete" };
    }

    switch (entity) {
        case layoutEntity.EMERGENCIES:
            await deleteManyEmergency(validatedFields.data.idList);
            break;
        case layoutEntity.USERS:
            await deleteManyUser(validatedFields.data.idList);
            break;
        default:
            return { error: "Please Check layout entity name!" }
    }

    return { success: "Deleted Successfully!" }
    
}