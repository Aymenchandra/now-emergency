import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, isRouteAllowed, publicRoutes,  } from "@/routes";
import { CurrentUser } from "./lib/auth";
import { userRole } from "@prisma/client";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const user = await CurrentUser();
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix) // next-auth url prefix 
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const userRoutes = isRouteAllowed(nextUrl.pathname)

  if (isApiAuthRoute) {
    return undefined;
  }

  // cannot access to auth pages after login
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return undefined;
  }

  // redirect to profile if AuthGuard not include userRoutes
  if (!userRoutes && user?.role === userRole.USER) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }

  return undefined
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}