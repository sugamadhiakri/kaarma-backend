import { enumType, extendType, objectType } from "nexus";
import { isAdmin, isOrganization, isVolunteer } from "../authorization/rules";


export const UserRolesEnum = enumType({
    name: "UserRole",
    members: [
        "VOLUNTEER",
        "ORGANIZATION",
        "ADMIN"
    ]
});


export const User = objectType({
    name: "User",
    definition(t) {
        t.nullable.int("id");
        t.string("username");
        t.field("role", {
            type: UserRolesEnum
        });
    }
});

export const UserQuery = extendType({
    type: "Query",
    definition(t) {
        t.field("me", {
            type: "User",
            resolve(_root, _args, ctx) {

                const me = {
                    id: ctx.auth.userId ? ctx.auth.userId : null,
                    username: ctx.auth.username,
                    role: ctx.auth.role
                };

                if (!me) {
                    throw new Error("Cannot Get Current user");
                }

                return me;
            }
        });
    }
});