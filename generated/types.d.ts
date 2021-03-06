/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../src/Interface/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  UserRole: "ADMIN" | "ORGANIZATION" | "VOLUNTEER"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Admin: { // root type
    password: string; // String!
    username: string; // String!
  }
  Location: { // root type
    id: string; // String!
    latitude: number; // Float!
    longitude: number; // Float!
  }
  Mutation: {};
  Organization: { // root type
    address: string; // String!
    description: string; // String!
    email: string; // String!
    id: string; // String!
    name: string; // String!
    password: string; // String!
    phone: string; // String!
    username: string; // String!
  }
  OrganizationSubmission: { // root type
    accepted: boolean; // Boolean!
    address: string; // String!
    description: string; // String!
    email: string; // String!
    id: string; // String!
    name: string; // String!
    phone: string; // String!
  }
  Programme: { // root type
    description: string; // String!
    execution: NexusGenScalars['DateTime']; // DateTime!
    experience: number; // Int!
    expiry: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    locationId: string; // String!
    organizationId: string; // String!
    posted: NexusGenScalars['DateTime']; // DateTime!
    title: string; // String!
    volunteersRequired: number; // Int!
  }
  Query: {};
  User: { // root type
    id?: string | null; // String
    role: NexusGenEnums['UserRole']; // UserRole!
    username: string; // String!
  }
  Volunteer: { // root type
    bloodAvaibality: boolean; // Boolean!
    dob: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    experience: number; // Int!
    fname: string; // String!
    id: string; // String!
    lastBloodDonated?: NexusGenScalars['DateTime'] | null; // DateTime
    lname: string; // String!
    locationId?: string | null; // String
    phone: string; // String!
    username: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Admin: { // field return type
    password: string; // String!
    username: string; // String!
  }
  Location: { // field return type
    id: string; // String!
    latitude: number; // Float!
    longitude: number; // Float!
  }
  Mutation: { // field return type
    approveOrganization: NexusGenRootTypes['OrganizationSubmission']; // OrganizationSubmission!
    createOrganization: NexusGenRootTypes['Organization']; // Organization!
    createProgramme: NexusGenRootTypes['Programme']; // Programme!
    deleteOrganization: NexusGenRootTypes['Organization']; // Organization!
    loginAdmin: string; // String!
    loginOrganization: string; // String!
    submmitOrganization: NexusGenRootTypes['OrganizationSubmission']; // OrganizationSubmission!
  }
  Organization: { // field return type
    address: string; // String!
    description: string; // String!
    email: string; // String!
    id: string; // String!
    name: string; // String!
    password: string; // String!
    phone: string; // String!
    username: string; // String!
  }
  OrganizationSubmission: { // field return type
    accepted: boolean; // Boolean!
    address: string; // String!
    description: string; // String!
    email: string; // String!
    id: string; // String!
    name: string; // String!
    phone: string; // String!
  }
  Programme: { // field return type
    applicants: NexusGenRootTypes['Volunteer'][]; // [Volunteer!]!
    description: string; // String!
    execution: NexusGenScalars['DateTime']; // DateTime!
    experience: number; // Int!
    expiry: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    location: NexusGenRootTypes['Location'] | null; // Location
    locationId: string; // String!
    organization: NexusGenRootTypes['Organization']; // Organization!
    organizationId: string; // String!
    posted: NexusGenScalars['DateTime']; // DateTime!
    title: string; // String!
    volunteersRequired: number; // Int!
  }
  Query: { // field return type
    getAllOrganizations: NexusGenRootTypes['Organization'][]; // [Organization!]!
    getAllPendingSubmittedOrganizations: NexusGenRootTypes['OrganizationSubmission'][]; // [OrganizationSubmission!]!
    getAllProgrammes: NexusGenRootTypes['Programme'][]; // [Programme!]!
    getAllSubmittedOrganizations: NexusGenRootTypes['OrganizationSubmission'][]; // [OrganizationSubmission!]!
    getProgrammeById: NexusGenRootTypes['Programme']; // Programme!
    getSubmittedOrganizationById: NexusGenRootTypes['OrganizationSubmission'] | null; // OrganizationSubmission
    getVolunteerById: NexusGenRootTypes['Volunteer']; // Volunteer!
    me: NexusGenRootTypes['User']; // User!
  }
  User: { // field return type
    id: string | null; // String
    role: NexusGenEnums['UserRole']; // UserRole!
    username: string; // String!
  }
  Volunteer: { // field return type
    bloodAvaibality: boolean; // Boolean!
    dob: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    experience: number; // Int!
    fname: string; // String!
    id: string; // String!
    lastBloodDonated: NexusGenScalars['DateTime'] | null; // DateTime
    lname: string; // String!
    location: NexusGenRootTypes['Location'] | null; // Location
    locationId: string | null; // String
    phone: string; // String!
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Admin: { // field return type name
    password: 'String'
    username: 'String'
  }
  Location: { // field return type name
    id: 'String'
    latitude: 'Float'
    longitude: 'Float'
  }
  Mutation: { // field return type name
    approveOrganization: 'OrganizationSubmission'
    createOrganization: 'Organization'
    createProgramme: 'Programme'
    deleteOrganization: 'Organization'
    loginAdmin: 'String'
    loginOrganization: 'String'
    submmitOrganization: 'OrganizationSubmission'
  }
  Organization: { // field return type name
    address: 'String'
    description: 'String'
    email: 'String'
    id: 'String'
    name: 'String'
    password: 'String'
    phone: 'String'
    username: 'String'
  }
  OrganizationSubmission: { // field return type name
    accepted: 'Boolean'
    address: 'String'
    description: 'String'
    email: 'String'
    id: 'String'
    name: 'String'
    phone: 'String'
  }
  Programme: { // field return type name
    applicants: 'Volunteer'
    description: 'String'
    execution: 'DateTime'
    experience: 'Int'
    expiry: 'DateTime'
    id: 'String'
    location: 'Location'
    locationId: 'String'
    organization: 'Organization'
    organizationId: 'String'
    posted: 'DateTime'
    title: 'String'
    volunteersRequired: 'Int'
  }
  Query: { // field return type name
    getAllOrganizations: 'Organization'
    getAllPendingSubmittedOrganizations: 'OrganizationSubmission'
    getAllProgrammes: 'Programme'
    getAllSubmittedOrganizations: 'OrganizationSubmission'
    getProgrammeById: 'Programme'
    getSubmittedOrganizationById: 'OrganizationSubmission'
    getVolunteerById: 'Volunteer'
    me: 'User'
  }
  User: { // field return type name
    id: 'String'
    role: 'UserRole'
    username: 'String'
  }
  Volunteer: { // field return type name
    bloodAvaibality: 'Boolean'
    dob: 'DateTime'
    email: 'String'
    experience: 'Int'
    fname: 'String'
    id: 'String'
    lastBloodDonated: 'DateTime'
    lname: 'String'
    location: 'Location'
    locationId: 'String'
    phone: 'String'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    approveOrganization: { // args
      id: string; // String!
    }
    createOrganization: { // args
      address: string; // String!
      description: string; // String!
      email: string; // String!
      name: string; // String!
      password: string; // String!
      phone: string; // String!
      username: string; // String!
    }
    createProgramme: { // args
      description: string; // String!
      execution: string; // String!
      experience: number; // Int!
      expiry: string; // String!
      latitude: number; // Float!
      longitude: number; // Float!
      title: string; // String!
      volunteersRequired: number; // Int!
    }
    deleteOrganization: { // args
      id: string; // String!
    }
    loginAdmin: { // args
      password: string; // String!
      username: string; // String!
    }
    loginOrganization: { // args
      password: string; // String!
      username: string; // String!
    }
    submmitOrganization: { // args
      address: string; // String!
      description: string; // String!
      email: string; // String!
      name: string; // String!
      phone: string; // String!
    }
  }
  Query: {
    getProgrammeById: { // args
      id: string; // String!
    }
    getSubmittedOrganizationById: { // args
      id: string; // String!
    }
    getVolunteerById: { // args
      id: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}