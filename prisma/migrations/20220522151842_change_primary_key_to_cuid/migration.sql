/*
  Warnings:

  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OrganizationSubmission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Programme` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Volunteer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VolunteersOnProgramme` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Programme" DROP CONSTRAINT "Programme_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Programme" DROP CONSTRAINT "Programme_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Volunteer" DROP CONSTRAINT "Volunteer_locationId_fkey";

-- DropForeignKey
ALTER TABLE "VolunteersOnProgramme" DROP CONSTRAINT "VolunteersOnProgramme_programmeId_fkey";

-- DropForeignKey
ALTER TABLE "VolunteersOnProgramme" DROP CONSTRAINT "VolunteersOnProgramme_volunteerId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Location_id_seq";

-- AlterTable
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Organization_id_seq";

-- AlterTable
ALTER TABLE "OrganizationSubmission" DROP CONSTRAINT "OrganizationSubmission_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "OrganizationSubmission_id_seq";

-- AlterTable
ALTER TABLE "Programme" DROP CONSTRAINT "Programme_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "organizationId" SET DATA TYPE TEXT,
ALTER COLUMN "locationId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Programme_id_seq";

-- AlterTable
ALTER TABLE "Volunteer" DROP CONSTRAINT "Volunteer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "locationId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Volunteer_id_seq";

-- AlterTable
ALTER TABLE "VolunteersOnProgramme" DROP CONSTRAINT "VolunteersOnProgramme_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "programmeId" SET DATA TYPE TEXT,
ALTER COLUMN "volunteerId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "VolunteersOnProgramme_id_seq";

-- AddForeignKey
ALTER TABLE "Volunteer" ADD FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programme" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programme" ADD FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteersOnProgramme" ADD FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteersOnProgramme" ADD FOREIGN KEY ("volunteerId") REFERENCES "Volunteer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
