import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import * as passwordGenerator from "secure-random-password";
import { db } from "../db";

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

    public async verifyGoogleUser(token: string) {
        let decodedUser: any;
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();

            if (!payload) throw new Error("Invalid Google Auth token");

            const user = await db.volunteer.findFirst({
                where: {
                    email: payload?.email
                }
            });

            if (!user) throw new Error("The volunteer is not setup yet");

            decodedUser = {
                id: user.id,
                username: user.username,
                role: "VOLUNTEER"
            };

        }
        verify().catch(
            console.error
        );
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