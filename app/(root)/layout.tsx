import { auth } from '@/auth';
import ClientPathnameProvider from '@/components/ClientHeaderProvider/ClientPathnameProvider';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const layout = async( {children}: {children : ReactNode}) => {


   const session = await auth();
   
    
    if(!session) redirect("/sign-in");

  return (
    <main className="root-container min-h-screen flex flex-col">
      <div className="flex-1 mx-auto max-w-7xl w-full">
        <ClientPathnameProvider session={session} />
        <div className="mt-10 pb-20">{children}</div>
      </div>
  </main>
  
  )
}

export default layout