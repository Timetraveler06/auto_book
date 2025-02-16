import { adminSideBarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SideBar = () => {
  return (
    <div className='admin-sidebar '>
        <div>
            <div className='logo'>
                <Image src="/icons/admin/logo.svg" alt='logo' height={37} width={37} />
                <h1>Auto Book</h1>
            </div>

            <div className='mt-10 flex flex-row gap-5'>
                { adminSideBarLinks.map((link)=>{
                    const isSelected = false;
                    return (
                        <Link href={link.route} key={link.route}>
                           <div className={cn('link',isSelected && 'bg-primary-admin shadow-sm')} >
                                <div className='relative size-5 '>
                                    <Image src={link.img} alt='icon' fill className={`${isSelected} ? 'brightness-0 invert ' : '' object-contain` } />
                                </div>
                            </div> 
                        </Link>
                    )
                })

                }
            </div>
        </div>
    </div>
  )
}

export default SideBar