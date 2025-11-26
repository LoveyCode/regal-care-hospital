"use client";
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { ImagesSlider } from "./ui/ImagesSlider";
import { heroImages } from "../../data";
import Image from 'next/image';

const heroHeadings = [
  "Welcome to Regal Care Hospital",
  "Excellence in Healthcare",
  "Trusted Medical Experts",
  "Your Health, Our Priority",
  "Compassionate Patient Care",

];


export default function Hero() {

        const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);


  const handleBookAppointment = () => {
     setIsLoading(true)
    router.push('/patients'); 
  };

  const pathname = usePathname();

useEffect(() => {
  if (pathname === '/patients') {
    setIsLoading(false);
  }
}, [pathname]);


const isOnPatientsPage = pathname === '/patients';


  return (
    <section className="w-full overflow-hidden relative">
      <div className="relative w-full h-[30rem] lg:h-[37.5rem] xl:h-[50rem] 2xl:h-[43rem]">
        {/* Images */}
        <ImagesSlider
          className="h-[30rem] lg:h-[37.5rem] xl:h-[50rem] 2xl:h-[43rem]"
          images={heroImages}
          imageProps={{
            width: 1000,
            height: 1000,
          }}
          overlay
 overlayStyle={{
  background: "rgba(0, 0, 0, 0.1)", // black/30
}}
        >
          {(currentIndex: number) => (
            <div className="z-50 text-center flex flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentIndex} // ✅ re-animates per slide
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl lg:text-6xl font-bold text-white drop-shadow-lg"
                >
                  {heroHeadings[currentIndex]}
                </motion.h1>
              </AnimatePresence>

              {/* Static Buttons */}
              <div className="mt-6 flex gap-4">


<button
  className="btn bg-yellow-600 before:bg-blue-300 mx-10 hidden lg:block"
  disabled={isOnPatientsPage}
  onClick={() => {
    if (!isOnPatientsPage) handleBookAppointment();
  }}
>
  {isLoading && !isOnPatientsPage ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={20}
            height={20}
            className="animate-spin"
          />

          <p className='z-40'>Loading...</p>
        </div>

      ) : (
         <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/appointments.svg"
            alt="loader"
            width={20}
            height={20}
            className='invert brightness-0  '
          
          />
         <p className='z-40'> Book Appointment</p>
        </div>
      )}  
</button>

  <button
  className="  btn bg-yellow-600 before:bg-blue-300">
  <span className="relative z-10">Send Email</span>
</button>
              </div>
            </div>
          )}
        </ImagesSlider>
      </div>
    </section>
  );
}
  
