"use client";
import { useState } from "react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

const SearchForm = ({ query }: { query: string }) => {
  const [filter, setFilter] = useState("Department"); // Default filter
  const [resultsCount, setResultsCount] = useState(0); // Dummy result count
  
  // Dummy data for search results and filter options (replace with real data logic)
  const searchResults = ["Book 1", "Book 2", "Book 3", "Book 4"]; // This would be the actual data
  const filteredResults = searchResults.filter((book) =>
    filter === "Department" || book.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex justify-between items-center mt-10 px-5">
      {/* Search Results */}
      <p className="text-lg font-semibold text-light-200">
        {filteredResults.length} Results for "{query}"
      </p>

      {/* Filter by dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center gap-2 bg-gray-700 text-white p-2 rounded-md">
          Filter by: {filter} <ChevronDown size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setFilter("Department")}>Department</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilter("Genre")}>Genre</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilter("Title")}>Title</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchForm;
