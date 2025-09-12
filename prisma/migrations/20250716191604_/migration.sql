/*
  Warnings:

  - You are about to drop the column `bookId` on the `Borrow` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Borrow" DROP CONSTRAINT "Borrow_bookId_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Borrow" DROP COLUMN "bookId",
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Messages" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserBook" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
