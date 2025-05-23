
import Link from "next/link";
import Image from "next/image";

import { Session } from "next-auth";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { getInitials } from "@/lib/utils";
import { handleSignOut } from "@/lib/actions/auth";

const Header = ({
  session,
  pathname,
}: {
  session: Session;
  pathname: string;
}) => {
  return (
    <header className="my-10 flex justify-between items-center px-5 py-3 shadow-md">
      {/* Logo */}
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      {/* Navigation */}
      <ul className="flex items-center gap-8 text-light-200">
        <li>
          <Link
            href="/"
            className={`text-lg font-medium transition-all ${
              pathname === "/" ? "text-light-200" : "text-gray-300"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/search"
            className={`text-lg font-medium transition-all ${
              pathname === "/search" ? "text-light-200" : "text-gray-300"
            }`}
          >
            Search
          </Link>
        </li>
        <div className="flex items-center gap-x-1">
          <Avatar className="bg-[#acddee] w-10 h-10 flex items-center justify-center border-2 border-white rounded-full">
            <AvatarFallback className="text-black font-bold">
              {getInitials(session?.user?.name || "IN")}
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold text-[#d6e0ff]">{session?.user?.name}</p>
        </div>


        <li>
        <form action={handleSignOut}>
          <button type="submit" className="hover:text-red-500 transition-all">
            <Image src="/icons/logout.svg" alt="Logout" width={24} height={24} />
          </button>
        </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
