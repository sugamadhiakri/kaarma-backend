import { prisma } from "@prisma/client";
import { extendType, objectType, intArg, stringArg, booleanArg } from "nexus";

export const OrganizationSubmission = objectType({
    name: "OrganizationSubmission",
    definition(t) {
        t.int("id");
        t.string("name");
        t.string("description");
        t.string("address");
        t.string("email");
        t.string("phone");
        t.boolean("accepted");
    }
});

export const OrganizationSubmissionQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllSubmittedOrganizations", {
            type: "OrganizationSubmission",
            async resolve(_root, _args, context) {
                return await context.db.organizationSubmission.findMany();
            }
        });

        t.list.field("getAllPendingSubmittedOrganizations", {
            type: "OrganizationSubmission",
            async resolve(_root, _args, context) {
                return await context.db.organizationSubmission.findMany({
                    where: {
                        accepted: false
                    }
                });
            }
        });

        t.nullable.field("getSubmittedOrganizationById", {
            type: OrganizationSubmission,
            args: {
                id: intArg()
            },
            async resolve(_root, args, context) {
                return await context.db.organizationSubmission.findUnique({
                    where: {
                        id: args.id
                    }
                });
            }
        });
    }

});

export const OrganizationSubmissionMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("submmitOrganization", {
            type: "OrganizationSubmission",
            args: {
                name: stringArg(),
                description: stringArg(),
                address: stringArg(),
                email: stringArg(),
                phone: stringArg(),
            },
            async resolve(_root, args, context) {
                // check if the email and phone already exists

                const organizationSubmission = {
                    name: args.name,
                    description: args.description,
                    address: args.address,
                    email: args.address,
                    phone: args.phone
                };

                const org = await context.db.organizationSubmission.create({
                    data: organizationSubmission,
                });

                return org;
            }
        });

        t.field("approveOrganization", {
            type: "OrganizationSubmission",
            args: {
                id: intArg(),
            },
            async resolve(_root, args, context) {
                // First get the organization details
                const organizationDetail = await context.db.organizationSubmission.findUnique({
                    where: {
                        id: args.id
                    }
                });

                if (organizationDetail === null) {
                    throw new Error("Organization Submission doesn't exist");
                }

                if (organizationDetail.accepted) {
                    throw new Error("Organization Already Approved");
                }

                // Create the organization according to the details.

                const org = {
                    name: organizationDetail.name,
                    description: organizationDetail.description,
                    address: organizationDetail.address,
                    email: organizationDetail.email,
                    phone: organizationDetail.phone,
                    username: "dempusername",
                    password: "demoPassword"
                };

                const orgWithId = await context.db.organization.create({
                    data: org
                });

                // Update the accepted organization
                const approvedOrg = await context.db.organizationSubmission.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        accepted: true
                    }
                });

                return approvedOrg;
            }
        });
    }
});