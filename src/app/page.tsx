'use client'

import React from 'react'
import Home from './Home/page'
import PassKeyModal from '@/components/PassKeyModal';

const Page = ({ searchParams }: SearchParamProps) => {
   const isAdmin = searchParams?.admin === "true";


  return (
    <div className="font-roboto relative min-h-screen overflow-x-hidden bg-zinc-100 dark:bg-zinc-900 text-dark-300 dark:text-zinc-200 transition-colors duration-300 remove-scrollbar">
      
         {isAdmin && <PassKeyModal />}
<Home />
  
    </div>
  )
}

export default Page
