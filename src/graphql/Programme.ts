import { Volunteer, VolunteersOnProgramme } from "@prisma/client";
import { objectType } from "nexus";

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
                const org = root.organizationId ? await ctx.db.organization.findUnique({
                    where: {
                        id: root.organizationId
                    }
                }) : null;

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