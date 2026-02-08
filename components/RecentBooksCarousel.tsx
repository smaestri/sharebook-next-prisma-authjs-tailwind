import prisma from "@/lib/prisma";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import ImageWithLoading from "./ImageWithLoading";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function RecentBooksCarousel() {
  const userBooks = await prisma.userBook.findMany({
    where: {
      deleted: false,
    },
    include: {
      book: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  if (userBooks.length === 0) {
    return <div className="text-gray-500">Aucun livre disponible</div>;
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {userBooks.map((userBook) => (
          <CarouselItem key={userBook.id} className="basis-1/3">
              <div className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow h-full flex flex-col items-center">
                  <div className="h-40">
                    <ImageWithLoading
                      title={userBook.book.title}
                      src={userBook?.book?.image || ""}
                    />
                  </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-sm truncate mb-2">
                    {userBook.book.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-auto">
                    Par <span className="font-medium">{userBook.user.pseudo || userBook.user.name}</span>
                  </p>
                </div>
                <div>
                    <Link href={`/list-books/${userBook.book.id}`} className="cursor-pointer">
                      <Button variant="outline">Voir</Button>
                    </Link>
                </div>
              </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
