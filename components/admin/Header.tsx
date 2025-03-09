import { Search } from 'lucide-react'
import { Session } from 'next-auth'
import React from 'react'

const Header = ({ session }: { session: Session }) => {
  return (
    <header className='admin-header flex justify-between items-center'>

      <div>
        <h2 className='text-dark-400 text-semibold text-2xl'>{session?.user?.name}</h2>
        <p className='text-slate-500 text-base'>
          Monitor all of your users and books.
        </p>
      </div>

      
      <div className="relative w-full max-w-lg">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search users, books by title, author, or genre"
          className="pl-10 pr-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full py-2"
        />
      </div>

    </header>
  )
}

export default Header
