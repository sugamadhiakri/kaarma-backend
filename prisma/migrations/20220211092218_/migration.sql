-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Volunteer" (
    "id" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "bloodAvaibality" BOOLEAN NOT NULL DEFAULT false,
    "lastBloodDonated" TIMESTAMP(3) NOT NULL,
    "experience" INTEGER NOT NULL,
    "locationId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Programme" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "posted" TIMESTAMP(3) NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "execution" TIMESTAMP(3) NOT NULL,
    "locationId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgrammeVolunteer" (
    "id" SERIAL NOT NULL,
    "programmeId" INTEGER NOT NULL,
    "volunteerId" INTEGER NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization.email_unique" ON "Organization"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organization.phone_unique" ON "Organization"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer.username_unique" ON "Volunteer"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer.email_unique" ON "Volunteer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer.phone_unique" ON "Volunteer"("phone");

-- AddForeignKey
ALTER TABLE "Volunteer" ADD FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programme" ADD FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeVolunteer" ADD FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeVolunteer" ADD FOREIGN KEY ("volunteerId") REFERENCES "Volunteer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
