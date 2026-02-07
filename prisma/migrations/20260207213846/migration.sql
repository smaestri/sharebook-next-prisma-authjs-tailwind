-- CreateTable
CREATE TABLE "pending_friend" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "pending_friend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pending_friend_userId_idx" ON "pending_friend"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "pending_friend_userId_email_key" ON "pending_friend"("userId", "email");

-- AddForeignKey
ALTER TABLE "pending_friend" ADD CONSTRAINT "pending_friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
