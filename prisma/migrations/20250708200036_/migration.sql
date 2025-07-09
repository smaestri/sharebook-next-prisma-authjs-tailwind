-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Borrow" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "validatedDate" TIMESTAMP(3) NOT NULL,
    "closedDate" TIMESTAMP(3) NOT NULL,
    "rdvDate" TIMESTAMP(3) NOT NULL,
    "rdvPlace" TEXT NOT NULL,
    "userBookId" INTEGER NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "bookId" INTEGER,

    CONSTRAINT "Borrow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,
    "borrowId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBook" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "bookId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Borrow_userBookId_borrowerId_key" ON "Borrow"("userBookId", "borrowerId");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_userBookId_fkey" FOREIGN KEY ("userBookId") REFERENCES "UserBook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_borrowId_fkey" FOREIGN KEY ("borrowId") REFERENCES "Borrow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBook" ADD CONSTRAINT "UserBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBook" ADD CONSTRAINT "UserBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
