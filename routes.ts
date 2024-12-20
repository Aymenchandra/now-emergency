// Public routes accessiblity these routes do not require authentication
export const publicRoutes = [
    "/",
    "/auth/new-verification"
]

// Auth routes accessiblity these routes will redirect in users to default routes /profile
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
export const DEFAULT_LOGIN_REDIRECT = "/profile"

// user routes accessiblity 
export const userRoutes = [
    "/profile",
    "/emergencies",
    "/assistances",
    "/emergency",
    "/workstation",
]

export function isRouteAllowed(pathname: string) {
    // Check if the route is in the static routes list
    if (userRoutes.includes(pathname)) {
        return true;
    }

    // Check if it's a dynamic /emergency/{id} route by looking for /emergency/ as the prefix
    if (pathname.startsWith('/emergency/')) {
        return true;
    }

    return false;
}