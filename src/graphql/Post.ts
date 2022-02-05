import {
    extendType,
    intArg,
    list,
    nonNull,
    objectType,
    stringArg,
} from "nexus";

export const Post = objectType({
    name: "Post",
    definition(t) {
        t.int("id");
        t.string("title");
        t.string("body");
        t.boolean("published");
    },
});

export const PostQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("drafts", {
            type: "Post",
            resolve(_root, _args, context) {
                return context.db.post.findMany({
                    where: {
                        published: false,
                    },
                });
            },
        });

        t.nonNull.list.field("posts", {
            type: "Post",
            resolve(_root, _args, context) {
                return context.db.post.findMany({
                    where: {
                        published: true,
                    },
                });
            },
        });
    },
});

export const PostMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createDraft", {
            type: "Post",
            args: {
                title: nonNull(stringArg()),
                body: nonNull(stringArg()),
            },
            async resolve(_root, args, context) {
                const draft = {
                    title: args.title,
                    body: args.body,
                    published: false,
                };
                const draftWithId = await context.db.post.create({
                    data: draft,
                });
                return draftWithId;
            },
        });

        t.field("publish", {
            type: "Post",
            args: {
                draftId: nonNull(intArg()),
            },
            resolve(_root, args, context) {
                return context.db.post.update({
                    where: {
                        id: args.draftId,
                    },
                    data: {
                        published: true,
                    },
                });
            },
        });
    },
});
