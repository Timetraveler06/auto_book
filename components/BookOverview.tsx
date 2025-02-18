import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

interface Book {
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
}

const BookOverview: React.FC<Book> = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
}) => {
  return (
    <section className="book-overview flex flex-col lg:flex-row items-center gap-10">
      {/* Left Side - Book Details */}
      <div className="flex flex-col flex-1 gap-5">
        <h1>{title}</h1>

        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="Star Rating" width={22} height={22} />
            <p>{rating}</p>
          </div>

          <div className="book-copies">
            <p>
              Total Books: <span>{totalCopies}</span>
            </p>
            <p>
              Available Books: <span>{availableCopies}</span>
            </p>
          </div>

          <p className="book-description">{description}</p>

          <Button className="book-overview_btn flex items-center gap-2">
            <Image src="/icons/book.svg" alt="Borrow Book" width={20} height={20} />
            <p className="font-bebas-neue text-xl text-dark-100">Borrow</p>
          </Button>
        </div>
      </div>

      {/* Right Side - Book Cover */}
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover variant="wide" className="z-10" coverColor={coverColor} coverImage={coverUrl} />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover variant="wide" className="z-0 blur-sm" coverColor={coverColor} coverImage={coverUrl} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
