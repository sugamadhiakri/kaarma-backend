import { PrismaClient } from "@prisma/client";
import { db } from "../db";
import { AuthenticatedUser } from "./auth";

export interface Context {
    db: PrismaClient;
    auth: AuthenticatedUser;
}
