"use client";

import { getSimilarBooks } from "@/lib/actions/book";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import BookCover from "@/components/BookCover"; // Import the BookCover component

const SimilarBooks = ({ currentBookId }: { currentBookId: string }) => {
  const [similarBooks, setSimilarBooks] = useState<any[]>([]);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const fetchSimilarBooks = async () => {
      const response = await getSimilarBooks(currentBookId);
  
      // Directly set the books, ensuring it's always an array
      setSimilarBooks(response.success ? response.data ?? [] : []);
  
      // Log an error if fetching fails
      if (!response.success) {
        console.error(response.error);
      }
    };
  
    fetchSimilarBooks();
  }, [currentBookId]);

  // Redirect function for when a book cover is clicked
  const handleBookClick = (bookId: string) => {
    router.push(`/books/${bookId}`); // Assuming the dynamic route for book description is /book/[id]
  };

  return (
    <div>
      <div className="similar-books flex flex-wrap gap-8 justify-center">
        {similarBooks.length > 0 ? (
          similarBooks.map((book: any) => (
            <div key={book.id} className="book-card" onClick={() => handleBookClick(book.id)}>
              <BookCover 
                coverColor={book.coverColor} 
                coverImage={book.coverUrl}  
                className=" sm:w-44 sm:h-56 cursor-pointer"
              />
            </div>
          ))
        ) : (
          <p className="text-[#d6e0ff] font-bold text-2xl md:text-2xl">No similar books found</p>
        )}
      </div>
    </div>
  );
};

export default SimilarBooks;
