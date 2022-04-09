/*
  Warnings:

  - You are about to drop the `ProgrammeVolunteer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `volunteersRequired` to the `Programme` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProgrammeVolunteer" DROP CONSTRAINT "ProgrammeVolunteer_programmeId_fkey";

-- DropForeignKey
ALTER TABLE "ProgrammeVolunteer" DROP CONSTRAINT "ProgrammeVolunteer_volunteerId_fkey";

-- AlterTable
ALTER TABLE "Programme" ADD COLUMN     "volunteersRequired" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ProgrammeVolunteer";

-- CreateTable
CREATE TABLE "VolunteersOnProgramme" (
    "id" SERIAL NOT NULL,
    "programmeId" INTEGER NOT NULL,
    "volunteerId" INTEGER NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VolunteersOnProgramme" ADD FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteersOnProgramme" ADD FOREIGN KEY ("volunteerId") REFERENCES "Volunteer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
