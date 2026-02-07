import { auth } from "@/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import BookPage from "@/components/book-page";
import { BORROW_STATUS } from "@/lib/constants";
import { getBookInfoFromLib } from "@/lib/utils-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaginationHandler from "./PaginationHandler";
import Link from "next/link";
import { SearchType } from "./page";
import AddFriendButton from "./AddFriendButton";
import FriendLine from "@/components/friend-line";
export type BookWithCategoryAndUser = any
export const COUNT_ITEMS_PER_PAGE = 20

export default async function ListBooks( props: any) {
  const { categoryId, userId, search, pageParam, searchType, countTitle} = props;

  const session = await auth.api.getSession({
    headers: await headers()
  })
  let page = Number(pageParam);
  if (!Number.isFinite(page) || page < 1) page = 1;
  const skip = (page - 1) * COUNT_ITEMS_PER_PAGE;
  if (!session?.user) return (
    <div>Please connect</div>
  )
  const email = session.user.email

  let books: BookWithCategoryAndUser[] = []
  let users: any[] = []
  let totalTitle = 0, totalAuthor = 0, totalUsers = 0;
  let userName =""
  let categoryLabel = ""
  let alreadyFriend = false;
  if (categoryId) {
    const category = await prisma.category.findFirst({
      where: {
        id: parseInt(categoryId)
      }
    })
    categoryLabel = category?.name || ""
    books = await prisma.book.findMany({
      include: {
        UserBook: {
          include: { user: true },
          where: { deleted: false, userId: { not: session.user.id } }
        },
      },
      where: {
        categoryId: parseInt(categoryId),
      },
      skip: skip,
      take: COUNT_ITEMS_PER_PAGE,
    });

    totalTitle = await prisma.book.count({
      where: {
        categoryId: parseInt(categoryId),
      },
    });
  } else if (userId) {
    const user = await prisma.user.findFirst({
      where: {
        id: String(userId)
      }
    })
    userName = user?.name || user?.pseudo || "Utilisateur"

    books = await prisma.book.findMany({
      include: {
        UserBook: {
          include: { user: true },
          where: { deleted: false }
        },
      },
      where: {
        UserBook: {
          some: {
            userId: String(userId),
            deleted: false,
          },
        }
      },
      skip: skip,
      take: COUNT_ITEMS_PER_PAGE,
    });

    totalTitle = await prisma.book.count({
      where: {
        UserBook: {
          some: {
            userId: String(userId),
            deleted: false,
          }
        }
      },
    });

    alreadyFriend = await prisma.friend.findFirst({
      where: {
        userId: session.user.id,
        friendId: String(userId)
      }
    }) ? true : false;

  } else if (search) {

    totalUsers = await prisma.user.count({
      where: {
        id: { not: session.user.id },
        OR: [{
          pseudo: {
            contains: search,
            mode: 'insensitive'
          }
        }, {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        }],

      },
      skip: skip,
      take: COUNT_ITEMS_PER_PAGE,
    });

    totalAuthor = await prisma.book.count({
      where: {
        author: {
          contains: search,
          mode: 'insensitive'
        }
      }
    });

    if (!searchType || searchType === 'title') {
      console.log('ok')
      const res = await getBookInfoFromLib(search, page, COUNT_ITEMS_PER_PAGE, searchType || "title");
      books = res.booksFound
      totalTitle = res.numFound
      console.log('books found by title ', books, "total: ", totalTitle)
    } else if (searchType === 'author') {

      totalTitle = countTitle || 0;

      books = await prisma.book.findMany({
        include: {
          UserBook: {
            include: { user: true },
            where: { deleted: false, userId: { not: session.user.id } }
          },
        },
        where: {
          author: {
            contains: search,
            mode: 'insensitive'
          }
        },
        skip: skip,
        take: COUNT_ITEMS_PER_PAGE,
      });


      console.log('books found by author ', books, "total: ", totalAuthor)

    } else if (searchType === 'users') {
      totalTitle = countTitle || 0;

      users = await prisma.user.findMany({
        where: {
          id: { not: session.user.id },
          OR: [{
            pseudo: {
              contains: search,
              mode: 'insensitive'
            }
          }, {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          }]
        },
        include: {
          UserBook: {
            include: {
              book: true
            },
            where: {
              deleted: false,
              userId: { not: session.user.id }
            }
          }
        },
        skip: skip,
        take: COUNT_ITEMS_PER_PAGE,
      });

      console.log('books found by user', users, "total: ", totalUsers)
    }
  }

  const myBooks = await prisma.userBook.findMany({
    include: {
      user: true,
      book: true,
    },
    where: {
      user: {
        email: email,
      },
      deleted: false,
    }
  })

  const myPurchases: any = await prisma.borrow.findMany({
    include: {
      userBook: { include: { user: true, book: { include: { category: true } } } },
    },
    where: {
      borrowerId: session?.user?.id,
      status:
        { in: [BORROW_STATUS.PENDING, BORROW_STATUS.VALIDATED] },
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const categories = await prisma.category.findMany();

  const renderListBooks = (searchType: string) => {

    if (books?.length == 0) {
      return <div>Aucun {searchType} trouvé</div>
    }

    return (<>
      <div className="flex flex-wrap gap-10 mb-10">
        {books?.map((book: any) => (
          <BookPage key={book.title} book={book} myBooks={myBooks} myPurchases={myPurchases} categories={categories} email={email} displayLinkToDetail={true} />
        ))}
      </div>
      {totalTitle > COUNT_ITEMS_PER_PAGE && <PaginationHandler page={page} total={totalTitle} categoryId={categoryId} userId={userId} search={search} />}
    </>
    )
  }

  const getTitle = (searchType: SearchType) => {

    if(categoryLabel) {
      return "Livres de la catégorie " + categoryLabel
    }
    if(userName) {
      return "Livres de " + userName
    }
console.log('searchType in getTitle', searchType)
    switch(searchType) {
      case SearchType.TITLE:
        return "Liste des livres avec le titre '" + search + "'"
      case SearchType.AUTHOR:
        return "Liste des livres avec l'auteur '" + search + "'"
      case SearchType.USER:
        return "Liste des utilisateurs avec le nom '" + search + "'"
      default:
        return "Liste des livres avec le titre '" + search + "'"
    }
  }

  const renderListUsers = (searchType: string) => {

    if (users?.length == 0) {
      return <div>Aucun {searchType} trouvé</div>
    }

    return (<>
      <div className="flex flex-wrap gap-4 mb-10">
        {users?.map((user: any) => (
          <FriendLine user={user}/>
        ))}
      </div>
      {totalUsers > COUNT_ITEMS_PER_PAGE &&  <PaginationHandler page={page} total={totalUsers} categoryId={categoryId} userId={userId} search={search} />}
    </>
    )
  }
  console.log('searchType in ListBooks', searchType)
  if (search) {
    return (
      <>
      <h1 className="text-3xl font-bold mb-6">{getTitle(searchType as SearchType)}</h1>
      
      <Tabs defaultValue={searchType || "title"} >
        <TabsList>
          <TabsTrigger value="title">
            <Link href={`/list-books?search=${search}&searchType=title`} >Titres ({totalTitle})</Link>
          </TabsTrigger>
          <TabsTrigger value="author"><Link href={`/list-books?search=${search}&searchType=author&countTitle=${totalTitle}`}>Auteurs ({totalAuthor})</Link></TabsTrigger>
          <TabsTrigger value="users"><Link href={`/list-books?search=${search}&searchType=users&countTitle=${totalTitle}`}>Utilisateurs ({totalUsers})</Link></TabsTrigger>
        </TabsList>
        <TabsContent value="title">
          {renderListBooks("livre")}
        </TabsContent>
        <TabsContent value="author">
          {renderListBooks("auteur")}
        </TabsContent>
        <TabsContent value="users">
          {renderListUsers("utilisateur")}
        </TabsContent>
      </Tabs>
      </>
    )
  }
  
  return (<>
    <div className="flex items-center mb-6 gap-2">
      <h1 className="text-3xl font-bold">{getTitle(searchType as SearchType)}</h1>
      {userId && !alreadyFriend && <AddFriendButton userId={userId} />}
      {userId && alreadyFriend && <div className="flex flex-row gap-2">
        <span>Vous êtes amis ! (<Link href="/my-friends" className="underline">Voir tous</Link>)</span>
      </div>}
    </div>
    {renderListBooks("livre")}
  </> )
}

