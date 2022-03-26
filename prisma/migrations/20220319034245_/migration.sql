-- CreateTable
CREATE TABLE "OrganizationSubmission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationSubmission.email_unique" ON "OrganizationSubmission"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationSubmission.phone_unique" ON "OrganizationSubmission"("phone");
