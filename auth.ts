import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserById } from "@/data/user"
import { userRoles } from "@/lib/next-auth"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getAccoutByUserId } from "@/data/account"


export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        // always redirect to /auth/login if something goes wrong during authentication!
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        // sent when an account in a given provider is linked to a user in our user database : Google Or Github etc...
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            
            //allow OAuth without email verification
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id as string)

            if (!existingUser?.emailVerified) return false;

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                if (!twoFactorConfirmation) return false

                // Delete two factor confirmation for next sign in
                await db.twoFactorConfirmation.delete({ where: { id: twoFactorConfirmation.id } })
            }
            return true
        },
        async session({ token, session }) {
            
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as userRoles
            }
            
            if (token.isTwoFactorEnabled && session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
            }
            
            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email as string;
                session.user.isOAuth = token.isOAuth as boolean;
            }

            
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token

            const existingAccount = await getAccoutByUserId(existingUser.id)
            token.isOAuth = !!existingAccount  // turn it into boolean
            token.name = existingUser.name
            token.email = existingUser.email
            token.role = existingUser.role
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
            token.picture = existingUser.image
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})