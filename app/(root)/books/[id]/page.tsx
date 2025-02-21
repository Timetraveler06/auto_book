import React from "react";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import SimilarBooks from "@/components/SimilarBooks";


const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  // Fetch data based on id
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!bookDetails) redirect("/404");

  return (
  <>
    <div className="flex flex-col md:flex-row gap-8">
      {/* Similar Books should be second on small devices */}
      <div className="order-2 md:order-1">
        <BookOverview {...bookDetails} userId={session?.user?.id as string} />
      </div>

      <div className="order-1 md:order-2">
        <h1 className="text-[#d6e0ff] font-bold text-2xl md:text-3xl lg:text-4xl">
          More Similar Books
        </h1>
        <SimilarBooks currentBookId={bookDetails.id} />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {/* First Column: Video and Summary */}
      <div className="flex flex-col gap-7">
        <section>
          <h3>Video</h3>
          <BookVideo videoUrl={bookDetails.videoUrl} />
        </section>

        <section>
          <h3>Summary</h3>
          <div className="space-y-5 text-xl text-light-100">
            {bookDetails.summary.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </section>
      </div>
    </div>
  </>
);

};

export default Page;
