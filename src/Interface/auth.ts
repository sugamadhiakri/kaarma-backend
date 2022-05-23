export interface AuthenticatedUser {
    userId?: string;
    username: string;
    password: string;
    role: "VOLUNTEER" | "ORGANIZATION" | "ADMIN";
}

