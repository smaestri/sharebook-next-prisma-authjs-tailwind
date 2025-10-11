import React, { Suspense } from 'react';
import UserMenu from './user-menu';
import BookCreateLoading from '../book-create-loading';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { BORROW_STATUS } from '@/lib/constants';

export default async function UserMenuPage() {
  const session = await auth()
  if (!session?.user) {
    return <UserMenu borrowsCount={0} lendsCount={0} />
  }
  const userId = session.user.id


  // count number of borrows
  const borrowsCount = await prisma.borrow.count({
    where: {
      borrowerId: userId,
      status: {
        in: [BORROW_STATUS.PENDING, BORROW_STATUS.VALIDATED]
      }
    },
  })

    const lendsCount = await prisma.borrow.count({
    where: {
      userBook: {
        userId: userId
      },
      status: {
        in: [BORROW_STATUS.PENDING, BORROW_STATUS.VALIDATED]
      }
    },
  })

  return (
    <Suspense fallback={<BookCreateLoading />}>
      <UserMenu borrowsCount={borrowsCount} lendsCount={lendsCount} />
    </Suspense>

  )
}
