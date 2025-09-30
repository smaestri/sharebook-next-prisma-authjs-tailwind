/*
  Warnings:

  - You are about to drop the column `status` on the `UserBook` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Borrow_userBookId_borrowerId_key";

-- AlterTable
ALTER TABLE "UserBook" DROP COLUMN "status";
