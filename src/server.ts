import "reflect-metadata";
import { ApolloServer, AuthenticationError } from "apollo-server";
import { schema } from "./schema";
import { AuthService } from "./services/authService";
import { db } from "./db";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./authorization";
import { AuthenticatedUser } from "./Interface/auth";

const server = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    context: async ({ req }) => {
        try {
            const token = req?.headers?.authorization;

            const auth: any = await AuthService.instance.getAutheticatedUser(token);
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
