import { userRole } from "@prisma/client";
import { DefaultSession } from "next-auth"


export type extendedUser = DefaultSession["user"] & {
    role: userRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
}

declare module "next-auth" {
    interface Session {
        user: extendedUser
    }
}
