import jwt from "jsonwebtoken";
import * as passwordGenerator from "secure-random-password";

export class JwtService {

    private static _instance: JwtService;
    private jwtSecret: string;

    private constructor() {
        this.jwtSecret = process.env.JWT_SECRET || "";
    }

    public static get instance(): JwtService {
        if (JwtService._instance == null)
            JwtService._instance = new JwtService();

        return JwtService._instance;
    }

    public verifyOrganization(token: string) {
        let decodedUser: any;

        jwt.verify(token, this.jwtSecret, (err: any, decoded) => {
            if (err)
                throw new Error(err.name + "\n" + err.message);

            decodedUser = decoded;
        });

        return decodedUser;
    }

    public generateRandomPassword() {
        return passwordGenerator.randomPassword({ length: 12 });
    }

    public generateUsernameFromEmail(email: string) {
        const usernamePrefix = email.split("@");
        const username = usernamePrefix[0] + passwordGenerator.randomPassword({ length: 3, characters: passwordGenerator.digits });

        return username;
    }
}