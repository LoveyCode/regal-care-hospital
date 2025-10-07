import Image from 'next/image'
import React from 'react'

const Founder = () => {
  return (
    <div>
       <section className="py-12 px-4 bg-gray-100 text-center">
          
      
            <div className="relative group w-[20rem] md:w-[50rem] mx-auto">
              {/* Circular Image */}
              <div className="w-[20rem] md:w-[30rem] lg:w-[50rem] h-auto rounded-full overflow-hidden shadow-md mx-auto">
                <Image
                  src="/assets/images/The-Founder.jpeg" // replace with actual image path
                  alt="Founder"
                  width={1000}
                  height={1000}
                  className="object-cover w-[20rem] md:w-[30rem] lg:w-[50rem] h-auto"
                />
              </div>
      
              {/* Hover overlay for md and up */}
              <div className="hidden lg:flex flex-col justify-center items-center absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full text-center px-4">
                <h3 className="text-4xl font-semibold">Dr. Jagogo Okonkwo</h3>
                <p className="text-2xl mt-1">Founder & Visionary Leader</p>
                <p className="text-lg mt-2">Passionate about compassionate care and technology driven health solutions.</p>
              </div>
            </div>
      
            {/* Static text under image for small screens */}
            <div className="mt-4 lg:hidden">
              <h3 className="text-xl md:text-2xl font-semibold">Dr. Jagogo Okonkwo</h3>
              <p className="text-lg md:text-xl">Founder & Visionary Leader</p>
              <p className="text-sm md:text-lg mt-2">Passionate about compassionate care and technology driven health solutions.</p>
            </div>
          </section>,
    </div>
  )
}

export default Founder