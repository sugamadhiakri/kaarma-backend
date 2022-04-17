export interface AuthenticatedUser {
    userId?: number;
    username: string;
    password: string;
    role: "VOLUNTEER" | "ORGANIZATION" | "ADMIN";
}

