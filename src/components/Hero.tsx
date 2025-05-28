"use client";
import React from 'react'
import { motion } from "motion/react";
import { ImagesSlider } from './ui/ImagesSlider';
import { heroImages } from '../../data';

export default function Hero() {
  return (
   <section className="w-full overflow-hidden remove-scrollbar">
      <div className="relative w-full h-full flex lg:px-0 items-center px-0 overflow-hidden">
        {/* Description (Left) */}


 <ImagesSlider
  className="h-[30rem] lg:h-[37.5rem] xl:h-[50rem] 2xl:h-[43rem] mt-0 " 
    images={heroImages}
    imageProps={{
      width: 1000,
      height: 1000,

    }}
  >


   
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
 
      </motion.div>
    </ImagesSlider>
         </div>
         </section>
  );
}

  