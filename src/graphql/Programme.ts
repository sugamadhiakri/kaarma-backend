import { Volunteer, VolunteersOnProgramme } from "@prisma/client";
import { extendType, intArg, objectType, stringArg, floatArg, arg } from "nexus";

export const Programme = objectType({
    name: "Programme",
    definition(t) {
        t.int("id");
        t.string("title");
        t.string("description");
        t.int("volunteersRequired");
        t.int("experience");
        t.date("posted");
        t.date("expiry");
        t.date("execution");
        t.int("locationId");
        t.int("organizationId");
        t.field("organization", {
            type: "Organization",
            async resolve(root, _args, ctx) {
                const org = await ctx.db.organization.findUnique({
                    where: {
                        id: root.organizationId
                    }
                });

                if (!org) {
                    throw new Error("Organization doesn't exist");
                }

                return org;
            }
        });
        t.nullable.field("location", {
            type: "Location",
            async resolve(root, _args, ctx) {
                const location = await ctx.db.location.findUnique({
                    where: {
                        id: root.locationId
                    }
                });

                return location;
            }
        });
        t.list.field("applicants", {
            type: "Volunteer",

            async resolve(root, _args, ctx) {
                const applicantsId: VolunteersOnProgramme[] = await ctx.db.volunteersOnProgramme.findMany({
                    where: {
                        programmeId: root.id,
                    }
                });

                const ids: number[] = applicantsId.map(a => a.id);

                const applicants: Volunteer[] = await ctx.db.volunteer.findMany({
                    where: {
                        id: {
                            in: ids
                        }
                    }
                });

                return applicants;
            }
        });
    }
});

export const ProgrammeQuery = extendType({
    type: "Query",
    definition(t) {
        t.field("getProgrammeById", {
            type: "Programme",
            args: {
                id: intArg()
            },
            async resolve(_root, args, ctx) {


                const programme = await ctx.db.programme.findUnique({
                    where: {
                        id: args.id
                    }
                });

                if (!programme) {
                    throw new Error("Programme doesn't exist.");
                }

                return programme;
            }
        });

        t.list.field("getAllProgrammes", {
            type: "Programme",
            async resolve(_root, _args, ctx) {

                const programmes = await ctx.db.programme.findMany();

                return programmes;
            }
        });
    },
});

export const ProgrammeMutations = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createProgramme", {
            type: "Programme",
            args: {
                title: stringArg(),
                description: stringArg(),
                volunteersRequired: intArg(),
                experience: intArg(),
                expiry: stringArg(),
                execution: stringArg(),
                latitude: floatArg(),
                longitude: floatArg()
            },

            async resolve(_root, args, ctx) {
                const postedDay = new Date().toISOString();
                const expiryDay = new Date(args.expiry).toISOString();
                const executionDay = new Date(args.execution).toISOString();

                if (!ctx.auth.userId) throw new Error("Unauthorized");

                const location = await ctx.db.location.create({
                    data: {
                        latitude: args.latitude,
                        longitude: args.longitude
                    }
                });

                const programmeWithId = await ctx.db.programme.create({
                    data: {
                        title: args.title,
                        description: args.description,
                        volunteersRequired: args.volunteersRequired,
                        experience: args.experience,
                        posted: postedDay,
                        expiry: expiryDay,
                        execution: executionDay,
                        locationId: location.id,
                        organizationId: ctx.auth.userId
                    }
                });

                return programmeWithId;

            }

        });
    }
});