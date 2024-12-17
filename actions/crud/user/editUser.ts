"use server"
import bcrypt from "bcryptjs"
import * as z from "zod"
import { db } from "@/lib/db"
import { getUserByEmail, getUserById } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import { editUserSchema } from "@/schemas"


export const editUser = async (payload: z.infer<typeof editUserSchema>, idUser: string) => {

    const validatedFields = editUserSchema.safeParse(payload);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const dbUser = await getUserById(idUser);

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    // is OAuth User
    if (payload.password === null) {
        payload.email = undefined;
        payload.newPassword = undefined;
        payload.isTwoFactorEnabled = undefined;
    }


    var emailsent = ''
    if (payload.email !== dbUser.email) {
        const existingUser = await getUserByEmail(payload.email as string);

        if (existingUser && existingUser.id !== dbUser.id) {
            return { error: "Email already in use!" }
        }

        const verificationToken = await generateVerificationToken(payload.email as string)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        emailsent = ' Verification email sent!'
    }

    if (payload.newPassword && dbUser.password) {

        const hashedPassword = await bcrypt.hash(payload.newPassword, 10)

        payload.password = hashedPassword;
        payload.newPassword = undefined;
    }


    const searchQuery = `${validatedFields.data.location.country} ${validatedFields.data.location.governorate}`
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json&addressdetails=1&accept-language=en`);
    const data = await response.json();
    if (!data) {
        return { error: "Location doesn't available" }
    }
    const { lat, lon } = data[0];

    // create if location doesn't exist in user database
    if (!dbUser.location) {
        await db.user.update({
            where: { id: idUser },
            data: {
                ...payload,
                location: {
                    create: {
                        country: validatedFields.data.location.country,
                        governorate: validatedFields.data.location.governorate as string,
                        position: [parseFloat(lat), parseFloat(lon)]
                    }
                }
            }
        })
    } else {
        await db.user.update({
            where: { id: idUser },
            data: {
                ...payload,
                location: {
                    update: {
                        country: validatedFields.data.location.country,
                        governorate: validatedFields.data.location.governorate as string,
                        position: [parseFloat(lat), parseFloat(lon)]
                    }
                }
            }
        })
    }

    return { success: "Profile Updated!" + emailsent }
}