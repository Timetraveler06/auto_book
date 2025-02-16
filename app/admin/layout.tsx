import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
   <main className='flex min-h-screen w-full flex-row'>
        <p>Sidebar</p>
        <div className='admin-container'>
            <p>Header</p>
            {children}
        </div>
   </main>
  )
}

export default layout