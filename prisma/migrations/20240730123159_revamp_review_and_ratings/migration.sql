/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Review` table. All the data in the column will be lost.
  - Added the required column `locationId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_ownerId_fkey";

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "locationId" TEXT NOT NULL,
ALTER COLUMN "reviewId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "ownerId",
DROP COLUMN "status",
ADD COLUMN     "authorId" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;

-- DropEnum
DROP TYPE "ReviewStatus";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "ReviewLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
