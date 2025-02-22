
import { useState, useEffect } from "react";
import BookList from "@/components/BookList";
import { ChevronDown, Search } from "lucide-react";
import { searchBooks } from "@/lib/actions/book";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const SearchList = ({ query }: { query: string }) => {
  const [filter, setFilter] = useState("Department"); // Default filter
  const [books, setBooks] = useState<Book[]>([]); // Book state to hold search results
  const [loading, setLoading] = useState(false); // Loading state for async operations
  const [error, setError] = useState<string | null>(null); // Error state to handle API errors

  // Fetch books based on search query when query changes
  useEffect(() => {
    const fetchBooks = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      const result = await searchBooks(query);

      if (result.success) {
        setBooks(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchBooks();
  }, [query]);

  return (
    <div className="mt-10 px-5">
      {/* Search Results */}
      <div className="flex justify-between items-center">
        <p className="text-2xl text-gray-200 font-bold">
          Search Results for "{query}"
        </p>

        {/* Filter dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center gap-2 bg-gray-700 text-white p-2 rounded-md hover:bg-[#2b2f3b]">
            Filter by: {filter} <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#2b2f3b] text-light-200 p-2 rounded-md">
            <DropdownMenuItem className="p-2 hover:bg-[#4a5568] hover:text-white" onClick={() => setFilter("Department")}>
              Department
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2 hover:bg-[#4a5568] hover:text-white" onClick={() => setFilter("Genre")}>
              Genre
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2 hover:bg-[#4a5568] hover:text-white" onClick={() => setFilter("Title")}>
              Title
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Loading or error message */}
      {loading ? (
        <p className="text-center text-gray-300">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <BookList title="Books Found" books={books} containerClassName="mt-6" />
      )}
    </div>
  );
};

export default SearchList;
