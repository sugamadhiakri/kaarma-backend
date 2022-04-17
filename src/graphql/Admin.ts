import { extendType, objectType, stringArg } from "nexus";
import jwt from "jsonwebtoken";

export const Admin = objectType({
    name: "Admin",
    definition(t) {
        t.string("username");
        t.string("password");
    }
});

export const AdminMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.string("loginAdmin", {
            args: {
                username: stringArg(),
                password: stringArg(),
            },

            async resolve(_root, args, _context) {

                const adminUser = process.env.ADMIN_USERNAME;
                const adminPass = process.env.ADMIN_PASSWORD;

                if (args.username !== adminUser || args.password !== adminPass) {
                    throw new Error("Username or Password Incorrect");
                }

                const secret = process.env.JWT_SECRET || '';

                const admin = {
                    username: args.username, password: args.password, role: "ADMIN"
                };

                const token = jwt.sign(admin, secret);

                return token;
            }
        });
    }
});

