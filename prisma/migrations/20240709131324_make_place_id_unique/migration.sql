/*
  Warnings:

  - A unique constraint covering the columns `[placeId]` on the table `ReviewLocation` will be added. If there are existing duplicate values, this will fail.
  - Made the column `placeId` on table `ReviewLocation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ReviewLocation" ALTER COLUMN "placeId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReviewLocation_placeId_key" ON "ReviewLocation"("placeId");
