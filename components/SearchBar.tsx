"use client";

import { searchBooks } from "@/lib/actions/book";
import { useState } from "react";


export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await searchBooks(query);
      if (response.success) {
        setResults(response.data);
      } else {
        setError(response.error || "No books found.");
      }
    } catch (err) {
      setError("An error occurred while searching.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Search Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books by title or author..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Search Results */}
      <div className="mt-4">
        {results.length > 0 ? (
          <ul className="space-y-3">
            {results.map((book: any) => (
              <li key={book.id} className="p-3 border rounded-md bg-gray-100">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-700">By {book.author}</p>
                <p className="text-sm italic">Genre: {book.genre}</p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="text-gray-500 mt-2">No books found.</p>
        )}
      </div>
    </div>
  );
}
