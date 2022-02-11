import { extendType, intArg, nullable, objectType, stringArg } from "nexus";

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
            resolve(_root, _args, context) {
                return context.db.organization.findMany();
            },
        });
    }
})

export const OrganizationMutation = extendType({
    type: "Mutation",
    definition(t) {
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

            resolve(_root, args, context) {

                const organization = {
                    name: args.name,
                    username: args.username,
                    password: args.password,
                    address: args.address,
                    description: args.description,
                    email: args.email,
                    phone: args.phone,
                }

                const org = context.db.organization.create({
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
            resolve(_root, args, context) {
                const org = context.db.organization.delete({
                    where: {
                        id: args.id
                    }
                });

                return org;
            }
        })
    }
})