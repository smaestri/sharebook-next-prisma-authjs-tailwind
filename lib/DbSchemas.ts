import { Prisma } from "@/app/generated/prisma";

const userBookWithBookAndUser = Prisma.validator<Prisma.UserBookDefaultArgs>()({
  include: { book: true, user: true },
})

export type UserBookWithBookAndUser = Prisma.UserBookGetPayload<typeof userBookWithBookAndUser>

  const userBooksWithBorrow = Prisma.validator<Prisma.UserBookDefaultArgs>()({
      include: { Borrow: true },
  })
  export type UserBooksWithBorrow = Prisma.UserBookGetPayload<typeof userBooksWithBorrow>