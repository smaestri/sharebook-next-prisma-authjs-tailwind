/*
  Warnings:

  - You are about to drop the column `status` on the `UserBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Borrow" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "UserBook" DROP COLUMN "status";
