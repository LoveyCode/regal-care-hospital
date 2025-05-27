"use client";

import React from 'react'
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";
import { testimonials } from '../../data';
import SectionHeading from './sectionHeading';

const Testimonials = () => {
  return (
    <section className='pt-40 '>

               <SectionHeading title= {<h1 className='header text-center'> Kind Words From <span className='text-blue-300'> Satisfied Customers</span></h1>} />
        <div className="flex flex-col items-center max-lg:mt-10">
        <div
          // remove bg-white dark:bg-black dark:bg-grid-white/[0.05], h-[40rem] to 30rem , md:h-[30rem] are for the responsive design
          className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
        </div>

    </section>
  )
}

export default Testimonials