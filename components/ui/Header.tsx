"use client";  // Client Rendering COmponent
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Image  from "next/image";
const Header = () => {

    const pathName = usePathname()
  return (
    <header className='my-10 flex justify-between gap-5'>
        <Link href='/'>
            <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
         </Link>

        <ul className='flex flex-row itemns-center gap-8'>
            <li>
                <Link href="/library" className={cn( 'text-base cursor-pointer capitalize' ,
                    pathName=='/library' ? 'text-light-200' : 'text-light-100' )} >
                    Library
                </Link>
            </li>
            <li>
                <Link href="/my-profile" > </Link>
            </li>
        </ul>
    </header>
  )
}

export default Header