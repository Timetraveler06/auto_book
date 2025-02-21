import React, { useState } from "react";
import { useRouter } from "next/router";
import { Input, Button, Dropdown } from "shadcn"; // Assuming shadcn is integrated

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(undefined);
  const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleSearch = () => {
    router.push({
      pathname: "/search", // Ensure this matches the route for the search page
      query: {
        searchTerm,
        genre: selectedGenre,
        author: selectedAuthor,
      },
    });
  };

  return (
    <div className="flex justify-between items-center p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title, author, or genre"
        className="input-class"
      />
      <Button onClick={handleSearch}>
        <span>Search</span>
      </Button>
      <Dropdown
        items={["All", "Fiction", "Non-Fiction", "Mystery", "Sci-Fi"]} // Example genres
        onSelect={(value) => setSelectedGenre(value)}
        value={selectedGenre}
      />
    </div>
  );
};

export default SearchBar;
