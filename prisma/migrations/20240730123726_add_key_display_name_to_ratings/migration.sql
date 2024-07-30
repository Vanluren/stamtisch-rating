/*
  Warnings:

  - Added the required column `displayName` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "key" TEXT NOT NULL;
