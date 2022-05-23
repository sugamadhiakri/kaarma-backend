import { ApolloError } from "apollo-server";

type ErrorCode =
    | "401_UNAUTHORIZED"
    | "404_NOT_FOUND"
    | "ILLEGAL_OPERATION";

export class APIError extends ApolloError {
    public readonly error: any;

    constructor(errorCode: ErrorCode, message: string, error?: any) {
        super(message, errorCode, error);
        this.error = error;
        Object.defineProperty(this, "name", { value: "APIError" });
    }
}
