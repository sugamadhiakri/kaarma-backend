import { extendType, intArg, objectType, stringArg } from "nexus";
import jwt from "jsonwebtoken";
export const Organization = objectType({
    name: "Organization",
    definition(t) {
        t.int("id");
        t.string("name");
        t.string("username");
        t.string("password");
        t.string("address");
        t.string("description");
        t.string("email");
        t.string("phone");
    }
});

export const OrganizationQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("getAllOrganizations", {
            type: "Organization",
            async resolve(_root, _args, context) {
                return await context.db.organization.findMany();
            },
        });
    }
});

export const OrganizationMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.string("loginOrganization", {
            args: {
                username: stringArg(),
                password: stringArg(),
            },

            async resolve(_root, args, context) {
                const org = await context.db.organization.findFirst({
                    where: {
                        username: args.username
                    }
                });

                const secret = process.env.JWT_SECRET;
                if (!secret) {
                    throw Error("Secret Not available");

                }

                if (org == null || org.username !== args.username && org?.password !== args.password) {
                    throw Error("Username or Password incorrect");
                }

                const token = jwt.sign(org, secret);

                return token;
            }
        });

        t.field("createOrganization", {
            type: "Organization",
            args: {
                name: stringArg(),
                username: stringArg(),
                password: stringArg(),
                address: stringArg(),
                description: stringArg(),
                email: stringArg(),
                phone: stringArg()
            },

            async resolve(_root, args, context) {

                const organization = {
                    name: args.name,
                    username: args.username,
                    password: args.password,
                    address: args.address,
                    description: args.description,
                    email: args.email,
                    phone: args.phone,
                };

                const org = await context.db.organization.create({
                    data: organization,
                });

                return org;
            }
        });

        t.field("deleteOrganization", {
            type: "Organization",
            args: {
                id: intArg()
            },
            async resolve(_root, args, context) {
                const org = await context.db.organization.delete({
                    where: {
                        id: args.id
                    }
                });

                return org;
            }
        });
    }
});