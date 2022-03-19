import "reflect-metadata";
import { ApolloServer, AuthenticationError } from "apollo-server";
import { schema } from "./schema";
import { AuthService } from "./services/authService";
import { db } from "./db";

const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
        try {
            const token = req.headers.authorization;
            const auth = await AuthService.instance.getAutheticatedUser(token);
            return {
                db,
                auth,
            };
        } catch (error: any) {
            throw new AuthenticationError(error.message);
        }
    }
});

export default server;
