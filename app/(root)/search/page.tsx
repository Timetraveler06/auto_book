"use client";

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import BookList from '@/components/BookList';

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // This useEffect will run once when the component is mounted (i.e., when the page loads)
  useEffect(() => {
    // Call the search API with the current query (empty query will show all books)
    const fetchBooks = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (data.success) {
          setBooks(data.data);
        } else {
          setError(data.error || "No books found");
          setBooks([]);
        }
      } catch (err) {
        console.error("Search error:", err);
        setError("An error occurred while searching.");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks(); // Fetch books when the page loads
  }, []); // Empty dependency array to run only on initial mount

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data.success) {
        setBooks(data.data);
      } else {
        setError(data.error || "No books found");
        setBooks([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("An error occurred while searching.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="text-white">
        <h1 className="text-sm flex justify-center p-6">DISCOVER YOUR NEXT GREAT READ:</h1>
        <div>
          <h1 className="text-4xl font-bold text-center">
            Explore and Search for <br />
            <span className="text-[#ffe1bd]">Any Book</span> In our Library
          </h1>
        </div>
        <form
          onSubmit={handleSearch}
          className="search relative flex justify-center items-center w-full max-w-md mx-auto"
        >
          <Search className="absolute left-4 text-light-200" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="search-input pl-10 bg-transparent focus:outline-none w-full py-2"
          />
        </form>
      </div>

      <div className="mt-10 px-5">
        {loading && <p className="text-gray-300">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && books.length > 0 && (
          <BookList
            title={query ? `Search Results for "${query}"` : "All Books"}
            books={books}
            containerClassName="mt-28"
          />
        )}
      </div>
    </section>
  );
};

export default SearchPage;
