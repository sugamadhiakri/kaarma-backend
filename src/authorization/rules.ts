import { and, rule } from "graphql-shield";
import { IRuleResult } from "graphql-shield/dist/types";
import { Context } from "../Interface/context";

const isAuthorized = (condition: boolean) => {
    if (condition) {
        return true;
    } else {
        return new Error("Not Authorized");
    }
};

export const isAuthenticated = rule()(
    async (_, __, ctx: Context): Promise<IRuleResult> => {
        const userId = ctx.auth.userId;
        return isAuthorized(!!userId);
    }
);

export const isVolunteer = and(
    isAuthenticated,
    rule()(async (_, __, ctx: Context): Promise<IRuleResult> => {
        return isAuthorized(ctx.auth.role.includes("VOLUNTEER"));
    })
);

export const isOrganization = and(
    isAuthenticated,
    rule()(async (_, __, ctx: Context): Promise<IRuleResult> => {
        return isAuthorized(ctx.auth.role.includes("ORGANIZATION"));
    })
);

export const isAdmin = and(
    isAuthenticated,
    rule()(async (_, __, ctx: Context): Promise<IRuleResult> => {
        return isAuthorized(ctx.auth.role.includes("ADMIN"));
    })
);