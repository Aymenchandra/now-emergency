"use server"

import { signOut } from "@/auth"

export const logout = async () => {
    console.log('logout')
    await signOut({redirectTo : "/auth/login" });
}