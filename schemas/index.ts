import { emergencyStatus, emergencyType, userRole } from "@prisma/client"
import countriesCode from '@/data/location/countriesCode.json'
import isValidPhoneNumber from 'libphonenumber-js';
import parsePhoneNumber from 'libphonenumber-js';

import * as z from "zod"

const countryNameToCode = countriesCode;


export const deleteSchema = z.object({
    id: z.string()
});

export const deleteManySchema = z.object({
    idList: z.string().array()
});

export const ProfileSchema = z.object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8), {
        message: "Minimum 8 characters required"
    }),
    newPassword: z.optional(z.string().min(8), {
        message: "Minimum 8 characters required"
    }),
    role: z.enum([userRole.ADMIN, userRole.USER, userRole.EMPLOYEE]),
    phone: z.string().min(1, {
        message: "Phone is required"
    }).refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    location: z.object({
        country: z.string().min(1, {
            message: "Country is required",
        }),
        governorate: z.string().optional()
    }),
    emailVerified: z.union([z.date(), z.null(), z.undefined()]),
    isTwoFactorEnabled: z.optional(z.boolean())
})
    .refine((data) => {
        if (!data.newPassword && data.password) {
            return false;
        }
        return true
    }, {
        message: "New Password is required!",
        path: ["newPassword"]
    })
    .refine((data) => {
        if (data.newPassword && !data.password) {
            return false;
        }
        return true
    }, {
        message: "Password is required!",
        path: ["Password"]
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

export const NewPasswordSchema = z.object({
    password: z.string().min(8, {
        message: "Minimum 8 characters required"
    }),
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    })
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    code: z.optional(z.string())
})

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

export const AddUserSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(8, {
        message: "Minimum 8 characters required"
    }),
    role: z.enum([userRole.ADMIN, userRole.USER, userRole.EMPLOYEE])
})

// map schema
export const MapSearchSchema = z.object({
    search: z.string().min(1, {
        message: "Search is required"
    }),
})

export const EmergencySchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    description: z.string().min(1, {
        message: "Description is required"
    }),
    country: z.string().min(1, {
        message: "Country is required"
    }),
    governorate: z.string().min(1, {
        message: "Governorate is required"
    }),
    position: z.number().array(),
    status: z.enum([emergencyStatus.HELP, emergencyStatus.PENDING, emergencyStatus.DONE]),
    type: z.enum([emergencyType.FIRE, emergencyType.VIOLENCE, emergencyType.OTHER]),
    userId: z.string()
})