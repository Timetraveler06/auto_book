
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import SimilarBooks from "@/components/SimilarBooks";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params; // Access the id from params
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
      <BookOverview pdfUrl={""} decryptionKey={""} {...bookDetails} userId={session?.user?.id as string} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

        {/* Second Column: Similar Books */}
        <div className="flex flex-col gap-7">
          <h3 className="text-[#d6e0ff] text-2xl font-semibold">More similar books</h3>
          <SimilarBooks currentBookId={bookDetails.id} />
        </div>
      </div>
    </>
  );
};

export default Page;
