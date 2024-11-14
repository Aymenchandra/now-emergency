import { userRole } from "@prisma/client"
import * as z from "zod"

export const ProfileSchema = z.object({
    name : z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8),{
        message: "Minimum 8 characters required"
    }),
    newPassword: z.optional(z.string().min(8),{
        message: "Minimum 8 characters required"
    }),
    role: z.enum([userRole.ADMIN,userRole.USER]),
    emailVerified : z.union([z.date(), z.null(), z.undefined()]),
    isTwoFactorEnabled : z.optional(z.boolean())
})
.refine((data) =>{
    if(!data.newPassword && data.password){
        return false;
    }
    return true
},{
    message: "New Password is required!",
    path:["newPassword"]
})
.refine((data) =>{
    if(data.newPassword && !data.password){
        return false;
    }
    return true
},{
    message: "Password is required!",
    path:["Password"]
})

export const NewPasswordSchema = z.object({
    password: z.string().min(8,{
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
    password: z.string().min(1,{
        message: "Password is required"
    }),
    code: z.optional(z.string())
})

export const RegisterSchema = z.object({
    name: z.string().min(1,{
        message: "Name is required" 
    }),
    email: z.string().email({
        message: "Email is required" 
    }),
    password: z.string().min(8,{
        message: "Minimum 8 characters required"
    }),
})

export const AddUserSchema = z.object({
    name: z.string().min(1,{
        message: "Name is required" 
    }),
    email: z.string().email({
        message: "Email is required" 
    }),
    password: z.string().min(8,{
        message: "Minimum 8 characters required"
    }),
    role: z.enum([userRole.ADMIN,userRole.USER])
})

export const EditUserSchema = z.object({
    name : z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8),{
        message: "Minimum 8 characters required"
    }),
    newPassword: z.optional(z.string().min(8),{
        message: "Minimum 8 characters required"
    }),
    role: z.enum([userRole.ADMIN,userRole.USER]),
    isTwoFactorEnabled : z.optional(z.boolean())
})
.refine((data) =>{
    if(!data.newPassword && data.password){
        return false;
    }
    return true
},{
    message: "New Password is required!",
    path:["newPassword"]
})
.refine((data) =>{
    if(data.newPassword && !data.password){
        return false;
    }
    return true
},{
    message: "Password is required!",
    path:["Password"]
})