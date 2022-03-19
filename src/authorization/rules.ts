import { rule } from "graphql-shield";
import { IRuleResult } from "graphql-shield/dist/types";
import { Context } from "../Interface/context";


export const isAuthenticated = rule()(
    async (_, __, ctx: Context): Promise<IRuleResult> => {
        const userId = ctx.auth.userId;
        return !!userId;
    }
);

export const isVolunteer = rule()(
    async (_, __, ctx: Context): Promise<IRuleResult> => {
        const userId = ctx.auth.userId;

        const user = await ctx.db.volunteer.findUnique({
            where: {
                id: userId
            }
        });

        return !!user;
    }
);

export const isOrganization = rule()(
    async (_, __, ctx: Context): Promise<IRuleResult> => {
        const userId = ctx.auth.userId;

        const user = await ctx.db.organization.findUnique({
            where: {
                id: userId
            }
        });

        return !!user;
    }
);

export const isAdmin = rule()(
    async (args, _, __): Promise<IRuleResult> => {
        return args.username == process.env.ADMIN_USERNAME && args.password == process.env.ADMIN_PASSWORD;
    }
);