import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserById } from "@/data/user"
import { userRoles } from "@/lib/auth-role"

  
export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        // always redirect to /auth/login if something goes wrong during authentication!
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events:{
        // sent when an account in a given provider is linked to a user in our user database : Google Or Github etc...
        async linkAccount({user}){
            await db.user.update({
                where : { id : user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks:{
        // async signIn({user}){
        //     const existingUser = await getUserById(user.id as string);
        //     if(!existingUser || !existingUser.emailVerified){
        //         return false
        //     }
        //     return true
        // },
        async session({token,session}){
            console.log(
                token
            )
            if(token.sub && session.user){
                session.user.id = token.sub
            }
            
            if(token.role && session.user){
                session.user.role = token.role as userRoles
            }
            return session
        },
        async jwt({token}){
            if(!token.sub) return token

            const existingUser = await getUserById(token.sub)

            if(!existingUser) return token

            token.role = existingUser.role
            
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})