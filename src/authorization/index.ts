import { allow, deny, or, shield } from "graphql-shield";
import { isAdmin, isOrganization } from "./rules";

export const permissions = shield({
    Query: {
        "*": deny,
        getAllSubmittedOrganizations: isAdmin,
        getAllPendingSubmittedOrganizations: isAdmin,
        getSubmittedOrganizationById: isAdmin,
        getAllOrganizations: isAdmin,

    },
    Mutation: {
        "*": deny,
        loginAdmin: allow,
        loginOrganization: allow,
        submmitOrganization: allow,
        approveOrganization: isAdmin,
        createOrganization: isAdmin,
        deleteOrganization: isAdmin
    }
})