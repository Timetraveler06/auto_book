"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import BookCover from "@/components/BookCover";

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState<string | undefined>(undefined);
  const [author, setAuthor] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await searchBooks({ searchTerm, genre, author, page });
      if (response.success) {
        setBooks(response.data);
        setTotalPages(response.totalPages);
      } else {
        console.error(response.error);
      }
    };
    fetchBooks();
  }, [searchTerm, genre, author, page]);

  return (
    <div className="space-y-8">
      {/* First Row: Search Title and Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Search Books</h1>
        <Button variant="outline">
          <span className="material-icons">search</span>
        </Button>
      </div>

      {/* Second Row: Search Results */}
      <div>
        <p className="text-xl font-semibold">{books.length} results found</p>
        <div className="flex justify-between items-center">
          {/* Sorting Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="title" onValueChange={() => {}}>
                <DropdownMenuRadioItem value="title">Title</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="author">Author</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="genre">Genre</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              &lt;
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              &gt;
            </Button>
          </div>
        </div>

        {/* Book Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <BookCover coverColor={book.coverColor} coverImage={book.coverUrl} className="sm:w-44 sm:h-56" />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-500">{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
