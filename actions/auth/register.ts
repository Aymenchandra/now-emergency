"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import { RegisterSchema } from "@/schemas"


export const register = async (payload : z.infer<typeof RegisterSchema> ) => {

    const validatedFields = RegisterSchema.safeParse(payload);

    if(!validatedFields.success){
        return { error : "Invalid fields!"};
    }

    const { email, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password,10)

    const existingUser = await getUserByEmail(email)

    if(existingUser){
        return {error : "Email already in use! "}
    }

    const searchQuery = `${validatedFields.data.location.country} ${validatedFields.data.location.governorate}`
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json&addressdetails=1&accept-language=en`);
    const data = await response.json();
    if (!data) {
      return {error : "Location doesn't available"}
    }
    const { lat, lon } = data[0];
    await db.user.create({
        data: {
            ...validatedFields.data,
            password: hashedPassword,
            location: {
              create: {
                country: validatedFields.data.location.country,
                governorate: validatedFields.data.location.governorate as string,
                position : [parseFloat(lat),parseFloat(lon)]
              }
            }
          }
        });

    const verificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(verificationToken.email,verificationToken.token)
    return {success : "Confirmation email sent!"}
}