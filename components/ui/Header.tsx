"use client";
import { cn, getInitials } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  const pathName = usePathname();

  return (
    <header className="my-10 flex justify-between items-center">
      {/* Logo */}
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      {/* Navbar */}
      <ul className="flex items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathName === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>

        {/* Profile Avatar */}
        <li>
          <Link href="/my-profile">
            <Avatar className="bg-amber-100 w-10 h-10 flex items-center justify-center">
              <AvatarFallback className="bg-amber-100 font-bold">
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
