/*
  Warnings:

  - Added the required column `pseudo` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "pseudo" TEXT NOT NULL;
