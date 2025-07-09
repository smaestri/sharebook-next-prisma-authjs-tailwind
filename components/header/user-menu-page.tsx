import React, { Suspense } from 'react';
import UserMenu from './user-menu';
import BookCreateLoading from '../book-create-loading';

export default async function UserMenuPage() {
  return (
    <Suspense fallback={<BookCreateLoading />}>
      <UserMenu />
    </Suspense>

  )
}
