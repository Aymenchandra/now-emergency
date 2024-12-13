"use server"
import { WorkStationSchema } from "@/schemas"
import * as z from "zod"
import { db } from "@/lib/db"
import { CurrentUser } from "@/lib/auth"


export const workstation = async (payload: z.infer<typeof WorkStationSchema>) => {

    const validatedFields = WorkStationSchema.safeParse(payload);

    if(!validatedFields.success){
        return { error : "Invalid fields!"};
    }

    
    const dbUser = await CurrentUser();

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    await db.user.update({
        where: { id: dbUser.id },
        data: {
            location: {
              update: {
                country: validatedFields.data.country,
                governorate: validatedFields.data.country,
                position: validatedFields.data.position,
              }
            }
          }
    })

    return { success: "WorkStation Updated!" }
}