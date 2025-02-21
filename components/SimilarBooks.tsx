"use client";

import { getSimilarBooks } from "@/lib/actions/book";
import { useState, useEffect } from "react";
import BookCover from "@/components/BookCover"; // Import the BookCover component

const SimilarBooks = ({ currentBookId }: { currentBookId: string }) => {
  const [similarBooks, setSimilarBooks] = useState<any[]>([]);

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
  

  return (
    <div>
      
      <div className="similar-books flex flex-wrap gap-8"> {/* Flexbox for row layout */}
        {similarBooks.length > 0 ? (
          similarBooks.map((book: any) => (
            <div key={book.id} className="book-card">
              <BookCover 
                coverColor={book.coverColor} // Pass cover color
                coverImage={book.coverUrl}  // Pass cover image URL
              />
            </div>
          ))
        ) : (
          <p className="text-[#d6e0ff] font-bold text-2xl md:text-2xl ">No similar books found</p>
        )}
      </div>
    </div>
  );
};

export default SimilarBooks;
