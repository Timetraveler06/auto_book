"use client";
import { Search } from 'lucide-react';
import React, { useState } from 'react'

const page = () => {

    const [query, setQuery] = useState("");
  
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Searching for:", query);
    };
  return (
    <>
      <div className="min-h-screen  text-white ">
        <h1 className='text-sm flex  justify-center p-6'>DISCOVER YOUR NEXT GREAT READ:</h1>
        <div>
          <h1 className="text-4xl font-bold text-center">
            Explore and Search for <br></br><span className="text-[#ffe1bd] ">Any Book </span>
              In our Library
          </h1>
        </div>
        <form onSubmit={handleSearch} className="search w-full max-w-md relative"
         >
            <Search className="absolute left-4 text-light-100" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="search-input pl-10 bg-transparent focus:outline-none"
            />
        </form>
      </div>
    </>
  )
}

export default page