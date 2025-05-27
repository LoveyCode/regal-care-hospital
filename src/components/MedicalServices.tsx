"use client"
import React from 'react'
import { servicesImages } from '../../data'
import { motion } from "framer-motion";
import SectionHeading from './sectionHeading';
import Image from 'next/image';

const MedicalServices = () => {
  return (
<section className=' justify-center items-center mt-20 '>
    <div className='flex justify-center items-center pb-20'>
   <SectionHeading title= {<h1 className='header text-center'> Specialized Medical Services  <span className='text-blue-300'> We Offer </span></h1>} />
    </div>

<div className="flex flex-wrap rounded-full justify-center items-center gap-5 ">
  
  {servicesImages.map((service, index) => (
      <div className='flex flex-col'>
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-full aspect-square w-[300px] sm:w-[300px] md:w-[400px]"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <Image
                src={service.src}
                alt={service.serviceName}
                height={200}
                width={200}
                className="w-full h-full object-cover rounded-full"
              />
              <motion.div
                variants={{
                  rest: { opacity: 0, y: 30 },
                  hover: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-blue-300 bg-opacity-75 rounded-full flex items-center justify-center pointer-events-none"
              >
                <p className="text-center text-md text-white px-2">
                  {service.description}
                </p>
              </motion.div>
            </motion.div>
<div className='mt-10'>
    <h2 className=' Home-sub-heading lg:text-3xl'>{service.serviceName}</h2>
    <p className='py-5 text-sm cursor-pointer hover:text-blue-300'>Learn more</p>
</div>
 </div>
            
          ))}

</div>
</section>
  )
}

export default MedicalServices


