// Public routes accessiblity these routes do not require authentication
export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/layout/server",
    "/server",
    "/client"
]

// Auth routes accessiblity these routes will redirect in users to default routes /dashboard
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/reset",
    "/auth/new-password",
    "/auth/error"
]

// The prefix for API authentication, routes that start with this prefix are used for API
export const apiAuthPrefix = "/api/auth"

// The default redirect after login
export const DEFAULT_LOGIN_REDIRECT = "/settings"