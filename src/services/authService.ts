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
        if (process.env.NODE_ENV == "development") {
            return {
                userId: 999,
                email: "test@test.com",
                phone: "9845222",
                authprovider: "test-auth"
            }
        }
    }
}