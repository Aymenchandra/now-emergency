import {DefaultSession} from "next-auth"

export enum userRoles {
    ADMIN = 'ADMIN',
    USER = 'USER'
 }

export type extendedUser = DefaultSession["user"] & {
    role : userRoles
}

declare module "next-auth"{
    interface Session {
        user:extendedUser
    }
}
