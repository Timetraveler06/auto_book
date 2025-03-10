'use client'; // This line ensures that the component is treated as a client-side component

import { useState, useEffect } from "react";
import BookList from "@/components/BookList";
import { searchBooks, fetchBooks, countTotalBooks } from "@/lib/actions/book"; // Import the necessary functions

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [books, setBooks] = useState([]); // State to hold the books
  const [page, setPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages

  // Function to fetch data based on the search query and pagination
  const fetchData = async () => {
    try {
      let booksData;

      // If search query is present, fetch books matching the query
      if (searchQuery) {
        const searchResults = await searchBooks(searchQuery);
        if (searchResults.success) {
          booksData = searchResults.data;
          setTotalPages(1); // Only 1 page of results since it's a search
        } else {
          setBooks([]);
          setTotalPages(1);
          return;
        }
      } else {
        // If no search query, fetch books with pagination
        booksData = await fetchBooks(page, 12); // Fetch books for the current page
        const totalBooks = await countTotalBooks();
        setTotalPages(Math.ceil(totalBooks / 12)); // Calculate total pages
      }

      setBooks(booksData); // Update books state with the fetched data
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]); // Clear books in case of error
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, page]); // Refetch data when searchQuery or page changes

  return (
    <>
      <section>
        <div className="text-white text-center">
          <h1 className="text-sm flex justify-center p-6">DISCOVER YOUR NEXT GREAT READ:</h1>
          <div>
            <h1 className="text-4xl font-bold">
              Explore and Search for <br />
              <span className="text-[#ffe1bd]">Any Book</span> In Our Library
            </h1>
          </div>

          {/* Search Input and Button */}
          <div className="mt-6 flex justify-center">
            <input
              type="text"
              placeholder="Search by title, author, or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-md text-black"
            />
            <button
              onClick={() => setPage(1)} // Reset to first page when search is triggered
              className="ml-2 px-4 py-2 bg-gray-700 text-white rounded-md"
            >
              Search
            </button>
          </div>
        </div>

        {/* Display Books */}
        <BookList
          title="Search Results"
          books={books} // Display the fetched books
          containerClassName="mt-28"
        />

        {/* Pagination */}
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
