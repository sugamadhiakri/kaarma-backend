import jwt from "jsonwebtoken";
import { applyNexusWrapping } from "nexus/dist/core";
import { AuthenticatedUser } from "src/Interface/auth";

export class AuthService {
    private static _instance: AuthService;

    private constructor() {

    }

    public static get instance(): AuthService {
        if (AuthService._instance == null) {
            AuthService._instance = new AuthService();
        }
        return AuthService._instance;
    }

    public async getAutheticatedUser(token: string | undefined) {
        // if (process.env.NODE_ENV == "development") {
        //     return {
        //         userId: 999,
        //         email: "test@test.com",
        //         phone: "9845222",
        //         authprovider: "test-auth"
        //     }
        // }

        const secret = process.env.JWT_SECRET || '';
        if (token == undefined) return null;

        let decodedUser: any;

        jwt.verify(token, secret, function (err: any, decoded) {
            if (err) {
                throw new Error(err.name + "\n" + err.message);
            }

            decodedUser = decoded;

        });

        const authenticatedUser: AuthenticatedUser = {
            userId: decodedUser?.userId,
            username: decodedUser?.username,
            password: decodedUser?.password

        }
        return authenticatedUser;

    }
}