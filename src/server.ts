import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { context } from "./Interface/context";

const server = new ApolloServer({
    schema,
    context,
});

export default server;
