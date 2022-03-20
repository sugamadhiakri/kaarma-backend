/*
  Warnings:

  - Added the required column `address` to the `OrganizationSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrganizationSubmission" ADD COLUMN     "address" TEXT NOT NULL;
