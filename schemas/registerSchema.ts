import countriesCode from '@/data/location/countriesCode.json'
import isValidPhoneNumber  from 'libphonenumber-js';
import parsePhoneNumber from 'libphonenumber-js';

import * as z from "zod"
const countryNameToCode = countriesCode;

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(8, {
        message: "Minimum 8 characters required"
    }),
    phone: z.string().min(1, {
        message: "Phone is required"
    }).refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    location: z.object({
        country: z.string().min(1, {
            message: "Country is required",  // Error message for empty country
        }),
        governorate: z.string().optional()
    })
})
.refine((data) => {
    const { phone, location } = data;
    const { country } = location;

    const countryCode = countryNameToCode[country as keyof typeof countryNameToCode];

    const parsedPhoneNumber = parsePhoneNumber(phone);

    // Check if the country code matches
    if (parsedPhoneNumber && parsedPhoneNumber.country !== countryCode) {
        return false;
    }

    return true;
}, {
    message: "Phone number does not match the selected country",
    path: ['location'], // Error will be associated with the entire location object
});