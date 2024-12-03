import { Location, userRole } from "@prisma/client";
import { DefaultSession } from "next-auth"


export type extendedUser = DefaultSession["user"] & {
    role: userRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
    phone: string;
    location : Location
}

declare module "next-auth" {
    interface Session {
        user: extendedUser
    }
}
