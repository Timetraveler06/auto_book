"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { borrowBook } from "@/lib/actions/book";


interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBook = ({
  userId,
  bookId,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);
  const [isBorrowed, setIsBorrowed] = useState(false); // Track if the book is borrowed

  useEffect(() => {
    // Check if the user has already borrowed the book
    const checkIfBorrowed = async () => {
      const response = await fetch(`/api/check-borrowed?userId=${userId}&bookId=${bookId}`);
      const result = await response.json();
      setIsBorrowed(result.isBorrowed);
    };

    checkIfBorrowed();
  }, [userId, bookId]);

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return; // Return early if not eligible
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        setIsBorrowed(true); // Mark as borrowed
        toast({
          title: "Success",
          description: "Book borrowed successfully",
        });

        router.push("/");
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while borrowing the book",
        variant: "destructive",
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrowBook}
      disabled={borrowing || isBorrowed} // Disable if borrowing or already borrowed
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing
          ? "Borrowing ..."
          : isBorrowed
          ? "Borrowed"
          : "Borrow Book"}
      </p>
    </Button>
  );
};

export default BorrowBook;
