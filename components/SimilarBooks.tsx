"use client";

import { getSimilarBooks } from "@/lib/actions/book";
import { useState, useEffect } from "react";
import BookCover from "@/components/BookCover"; // Import the BookCover component

const SimilarBooks = ({ currentBookId }: { currentBookId: string }) => {
  const [similarBooks, setSimilarBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchSimilarBooks = async () => {
      const response = await getSimilarBooks(currentBookId);

      // Ensure response.data is defined and is an array
      if (response.success && Array.isArray(response.data)) {
        setSimilarBooks(response.data); // Update state with similar books
      } else {
        console.error(response.error); // Handle error if no similar books found
        setSimilarBooks([]); // Optionally set an empty array if no books found
      }
    };

    fetchSimilarBooks();
  }, [currentBookId]);

  return (
    <div>
      <h2>Similar Books</h2>
      <div className="similar-books flex flex-wrap gap-4"> {/* Flexbox for row layout */}
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
          <p>No similar books found</p>
        )}
      </div>
    </div>
  );
};

export default SimilarBooks;
