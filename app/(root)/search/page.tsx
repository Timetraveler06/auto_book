"use client"; // Ensure it's a client-side component

import { useState, useEffect } from "react";
import BookList from "@/components/BookList";
import { countTotalBooks, fetchBooks } from "@/lib/actions/book";

const SearchPage = () => {
  // State for current page, total pages, and fetched books
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Initialize totalPages
  const [books, setBooks] = useState([]); // State to hold books
  const [loading, setLoading] = useState(true); // State for loading status

  // Function to fetch books and update pagination details
  const fetchData = async () => {
    try {
      // Fetch books for the current page
      const booksList = await fetchBooks(page, 12); // Fetch 12 books per page

      // Count the total number of books for pagination
      const totalCount = await countTotalBooks();

      // Calculate total pages
      setTotalPages(Math.ceil(totalCount / 12)); // Update totalPages

      // Update books state
      setBooks(booksList);
    } catch (error) {
      console.error("Error fetching data for search page:", error);
      setBooks([]); // Set to empty array on error
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  // Fetch data when page changes
  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    fetchData();
  }, [page]);

  return (
    <>
      <section>
        <div className="text-white">
          <h1 className="text-sm flex justify-center p-6">
            DISCOVER YOUR NEXT GREAT READ:
          </h1>
          <div>
            <h1 className="text-4xl font-bold text-center">
              Explore and Search for <br />
              <span className="text-[#ffe1bd]">Any Book</span> In Our Library
            </h1>
          </div>

        </div>

        {/* Show loading indicator while fetching */}
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <BookList
            title="Search Results"
            books={books} // Pass the fetched books to the BookList component
            containerClassName="mt-28"
          />
        )}

        {/* Pagination logic */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-white">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded-md"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default SearchPage;
