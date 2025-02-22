"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq, and, ne, or , ilike  } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    //Check if it exists 
    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    // iNSERT IT INTO NEW TABLE 
    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};

export const getSimilarBooks = async (bookId: string) => {
  try {
    // Fetch the genre of the current book using bookId
    const currentBook = await db
      .select({ genre: books.genre })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (currentBook.length === 0) {
      return {
        success: false,
        error: "Book not found",
      };
    }

    // Fetch similar books excluding the current book
    const similarBooks = await db
      .select({
        id: books.id,
        title: books.title,
        genre: books.genre,
        coverUrl: books.coverUrl, // assuming coverUrl is a field in your schema
        coverColor: books.coverColor, // assuming coverColor is a field in your schema
      })
      .from(books)
      .where(
        // Same genre but exclude the current book
        and(eq(books.genre, currentBook[0].genre), ne(books.id, bookId))
      )
      .limit(5);

    return {
      success: true,
      data: similarBooks,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while fetching similar books",
    };
  }
};

export const searchBooks = async (query: string) => {
  try {
    if (!query) {
      return {
        success: false,
        error: "Search query cannot be empty",
      };
    }

    // Fetch all books that match the query in title or author
    const booksFound = await db
      .select({
        id: books.id,
        title: books.title,
        author: books.author, // assuming author exists in the schema
        genre: books.genre,
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
      })
      .from(books)
      .where(
        or(
          ilike(books.title, `%${query}%`),  // Case-insensitive search for title
          ilike(books.author, `%${query}%`) // Case-insensitive search for author
        )
      );

    if (booksFound.length === 0) {
      return {
        success: false,
        error: "No books found matching the query",
      };
    }

    return {
      success: true,
      data: booksFound,
    };
  } catch (error) {
    console.error("Error searching books:", error); // Provide more context to the error
    return {
      success: false,
      error: "An error occurred while searching for books",
    };
  }
};
