import jwt, { JsonWebTokenError } from "jsonwebtoken";

export class JwtService {

    private static _instance: JwtService;
    private jwtSecret: string;

    private constructor() {
        this.jwtSecret = process.env.JWT_SECRET || "";
    }

    public static get instance(): JwtService {
        if (JwtService._instance === null)
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
}