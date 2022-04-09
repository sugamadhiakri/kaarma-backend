import { objectType } from "nexus";

export const Volunteer = objectType({
    name: "Volunteer",
    definition(t) {
        t.int("id");
        t.string("fname");
        t.string("lname");
        t.string("username");
        t.string("email");
        t.date("dob");
        t.string("phone");
        t.boolean("bloodAvaibality");
        t.nullable.date("lastBloodDonated");
        t.int("experience");
        t.nullable.int("locationId");
        t.nullable.field("location", {
            type: "Location",
            async resolve(root, _args, ctx) {
                const location = root.locationId ? await ctx.db.location.findUnique({
                    where: {
                        id: root.locationId
                    }
                }) : null;

                return location;
            }
        });
    }
});