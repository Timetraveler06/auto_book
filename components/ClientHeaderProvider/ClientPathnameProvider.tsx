"use client";
import { usePathname } from "next/navigation";

import { Session } from "next-auth";
import Header from "../ui/Header";

const ClientPathnameProvider = ({ session }: { session: Session }) => {
  const pathname = usePathname(); // Get current pathname

  return <Header session={session} pathname={pathname} />;
};

export default ClientPathnameProvider;
