import { addResolveFunctionsToSchema } from "apollo-server";
import { AuthenticatedUser } from "src/Interface/auth";
import { JwtService } from "./JwtService";
import { MailingService } from "./mailingService";

export class AuthService {
    private static _instance: AuthService;
    private jwtService: JwtService;

    private constructor() {
        this.jwtService = JwtService.instance;
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
        if (token == undefined || token == "null") return null;

        // tries to verify the token in the backend, if it failes checks if it is from the googleAuth
        let decodedUser: any;


        // Try and verify 


        try {
            decodedUser = this.jwtService.verifyOrganization(token);
        } catch (err) {
            decodedUser = this.jwtService.verifyGoogleUser(token);
        }

        if (!decodedUser) throw new Error("Invalid Token");

        const authenticatedUser: AuthenticatedUser = {
            userId: decodedUser.id,
            username: decodedUser.username,
            password: decodedUser.password,
            role: decodedUser.role
        };

        return authenticatedUser;

    }
}