export interface AuthenticatedUser {
    userId: number;
    email?: string;
    phoneNumber?: string;
    authProvider: string;
}
