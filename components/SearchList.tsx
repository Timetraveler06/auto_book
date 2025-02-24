import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc, ilike } from "drizzle-orm";
import BookList from "@/components/BookList";

const SearchList = async ({ query }: { query: string }) => {
  let latestBooks;

  if (query) {
    // Fetch books matching the search query
    latestBooks = await db
      .select()
      .from(books)
      .where(ilike(books.title, `%${query}%`)) // Case-insensitive search
      .orderBy(desc(books.createdAt));
  } else {
    // Fetch all latest books (default view)
    latestBooks = await db
      .select()
      .from(books)
      .limit(10)
      .orderBy(desc(books.createdAt));
  }

  return (
    <div className="mt-10 px-5">
      <div className="flex justify-between items-center">
        <p className="text-2xl text-gray-200 font-bold">
          {query ? `Search Results for "${query}"` : "Latest Books"}
        </p>
      </div>
      <BookList title="Latest Books" books={latestBooks} containerClassName="mt-28" />
    </div>
  );
};

export default SearchList;
