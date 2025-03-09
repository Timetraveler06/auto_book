// app/api/search/route.ts
import { searchBooks, fetchAllBooks } from '@/lib/actions/book'; // Import both functions
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || ''; // Get the search query, or empty string if none provided

  // If the query is empty, fetch all books
  if (!query) {
    const result = await fetchAllBooks(); // Call the function to fetch all books
    return NextResponse.json(result); // Return all books
  }

  // Otherwise, perform a search based on the query
  const result = await searchBooks(query); // Call the search function with the query

  // Return the search result as JSON (set proper status codes as needed)
  return NextResponse.json(result);
}
