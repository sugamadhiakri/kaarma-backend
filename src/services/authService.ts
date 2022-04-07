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

        if (token == undefined) return null;

        let decodedUser: any = this.jwtService.verifyOrganization(token);

        const authenticatedUser: AuthenticatedUser = {
            userId: decodedUser?.userId,
            username: decodedUser?.username,
            password: decodedUser?.password

        };
        return authenticatedUser;

    }
}