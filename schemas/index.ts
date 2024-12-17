import { emergencyStatus, emergencyType, userRole } from "@prisma/client"
import isValidPhoneNumber from 'libphonenumber-js';

import * as z from "zod"
import { isMatchedCountry } from "@/lib/countries-match";

const phoneErrorMessage = 'Phone number does not match the selected country'

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
    phone: z.string().min(1, {
        message: "Phone is required"
    })
        .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
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

        return isMatchedCountry(country, phone)
    }, {
        message: phoneErrorMessage,
        path: ['location'], // Error will be associated to location
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
            message: "Country is required",
        }),
        governorate: z.string().optional()
    })
})
    .refine((data) => {
        const { phone, location } = data;
        const { country } = location;

        return isMatchedCountry(country, phone)
    }, {
        message: phoneErrorMessage,
        path: ['location'], // Error will be associated to location
    });
export const editUserSchema = z.object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8), {
        message: "Minimum 8 characters required"
    }),
    newPassword: z.optional(z.string().min(8), {
        message: "Minimum 8 characters required"
    }),
    phone: z.string().min(1, {
        message: "Phone is required"
    })
        .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    location: z.object({
        country: z.string().min(1, {
            message: "Country is required",
        }),
        governorate: z.string().optional()
    }),
    role: z.enum([userRole.ADMIN, userRole.USER, userRole.EMPLOYEE]),
    emailVerified: z.union([z.date(), z.null(), z.undefined()]),
    isTwoFactorEnabled: z.optional(z.boolean())
})
    .refine((data) => {
        const { phone, location } = data;
        const { country } = location;

        return isMatchedCountry(country, phone)
    }, {
        message: phoneErrorMessage,
        path: ['location'], // Error will be associated to location
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
    phone: z.string().min(1, {
        message: "Phone is required"
    })
        .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    location: z.object({
        country: z.string().min(1, {
            message: "Country is required",
        }),
        governorate: z.string().optional()
    }),
    role: z.enum([userRole.ADMIN, userRole.USER, userRole.EMPLOYEE])
})
    .refine((data) => {
        const { phone, location } = data;
        const { country } = location;

        return isMatchedCountry(country, phone)
    }, {
        message: phoneErrorMessage,
        path: ['location'], // Error will be associated to location
    });

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

export const WorkStationSchema = z.object({
    phone: z.string().min(1, {
        message: "Phone is required"
    }).refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    country: z.string().min(1, {
        message: "Country is required"
    }),
    governorate: z.string().min(1, {
        message: "Governorate is required"
    }),
    position: z.number().array(),
})
    .refine((data) => {
        const { phone, country } = data;

        return isMatchedCountry(country, phone)
    }, {
        message: phoneErrorMessage,
        path: ['phone'], // Error will be associated to phone
    });