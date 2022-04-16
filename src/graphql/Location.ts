import { objectType } from "nexus";

export const Location = objectType({
    name: "Location",
    definition(t) {
        t.int("id");
        t.float("latitude");
        t.float("longitude");
    }
});