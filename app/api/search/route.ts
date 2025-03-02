// app/api/search/route.ts
import { searchBooks } from '@/lib/actions/book';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';

  // Call your searchBooks function with the query
  const result = await searchBooks(query);

  // Return JSON (set proper status codes as needed)
  return NextResponse.json(result);
}
