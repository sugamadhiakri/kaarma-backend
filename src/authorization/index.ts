import { allow, deny, or, shield } from "graphql-shield";
import { isAdmin, isAuthenticated, isOrganization } from "./rules";

export const permissions = shield({
    Query: {
        "*": deny,
        getAllSubmittedOrganizations: isAdmin,
        getAllPendingSubmittedOrganizations: isAdmin,
        getSubmittedOrganizationById: isAdmin,
        getAllOrganizations: isAdmin,
        getProgrammeById: allow,
        getAllProgrammes: allow,
        me: isAuthenticated
    },
    Mutation: {
        "*": deny,
        loginAdmin: allow,
        loginOrganization: allow,
        submmitOrganization: allow,
        approveOrganization: isAdmin,
        createOrganization: isAdmin,
        deleteOrganization: isAdmin,
        createProgramme: allow
    }
});