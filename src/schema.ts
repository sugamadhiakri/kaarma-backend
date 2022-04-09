import { DateTimeResolver } from "graphql-scalars";
import { asNexusMethod, makeSchema } from "nexus";
import { join } from "path";
import * as types from "./graphql";

const dateTimeResolver = asNexusMethod(DateTimeResolver, "date");

export const schema = makeSchema({
    types: [types, dateTimeResolver],
    outputs: {
        typegen: join(__dirname, "..", "generated", "types.d.ts"),
        schema: join(__dirname, "..", "generated", "schema.graphql"),
    },
    contextType: {
        module: join(__dirname, "./Interface/context.ts"),
        export: "Context",
    },
    nonNullDefaults: {
        output: true,
        input: true,
    },
});
