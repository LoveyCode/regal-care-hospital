"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { FiSun } from "react-icons/fi";
import { MdOutlineDarkMode } from "react-icons/md";
import Image from 'next/image';
import { navItems } from '../../data/navItems';

interface NavbarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void;
}

  const Navbar =({theme, onToggleTheme}: NavbarProps) => {
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
<section className="w-full py-4 sticky top-0 z-50 backdrop-blur-md shadow-md bg-zinc-100 dark:bg-zinc-900 text-dark-300 dark:text-zinc-200 transition-all duration-300 ease-in-out">

<div className=" flex justify-between items-center px-2 xl:px-2">

  <button className='block lg:hidden' aria-label="Toggle Menu"
  onClick={toggleMenu}>
        {isOpen ? <X className='mx-6' size={28} /> : <Menu className='mx-6' size={28} />}
      </button>

    {/* Logo */}
    <Image
      src="/assets/icons/logo-full.svg"
      alt="Regal Care Logo"
      width={200}
      height={200}
      className="h-10 md:h-14"
    />

    {/* Desktop Nav */}
    <nav className="hidden mx-10 lg:flex items-center gap-5 xl:gap-8 text-base">

      {navItems.map((item, i) => (
        <div key={i} className="relative group">
          {item.href ? (
            <a href={item.href} className="navitem">{item.label}</a>
          ) : (
            <a className="navitem">{item.label}</a>
          )}


    {item.children && (
            <AnimatePresence>
              <motion.ul
                className="ul-list absolute top-full left-0 rounded-md shadow-md overflow-hidden"
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {item.children.map((child, j) => (
                  <li key={j} className="inner-nav-item">
                    <a href={child.href}>{child.label}</a>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          )}
            </div>
      ))}
     
    </nav>

    {/* Desktop Button */}
<div className="hidden  lg:flex items-center gap-4">
  <button onClick={onToggleTheme} className="text-sm  px-3 py-1">
   {theme === 'light' ? < MdOutlineDarkMode className="w-5 h-5" /> : < FiSun className="text-dark-300 dark:text-white w-5 h-5" />}
  </button>

<motion.button
  className="btn bg-yellow-600 before:bg-blue-300 mx-10 w-full hidden lg:block"
  animate={{ scale: [0.8, 1.25, 0.8] }}
  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
   whileHover={isOnPatientsPage ? {} : { scale: 1 }}
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

  
</motion.button>


    </div>

   {/* Mobile Theme Toggle and button */}
    <div className='flex lg:hidden'>
 <button onClick={onToggleTheme} className="text-sm px-6 py-1">
     {theme === 'light' ? < MdOutlineDarkMode className="w-5 h-5" /> : < FiSun className="w-5 h-5" />}
  </button>


    {/* Mobile Menu Toggle */}

      
    </div>
  </div>



  {/* Mobile Nav + Button */}
  <AnimatePresence>
  {isOpen && (
  <motion.div 
      className="lg:hidden mt-4 space-y-4"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <nav className="flex flex-col gap-4 text-lg items-start">
       <a href="/" className="navitem">Home</a>

        <button onClick={() => setAboutOpen(!aboutOpen)} className="navitem">About Us</button>
        <AnimatePresence>
          {aboutOpen && (
            <motion.ul
              className="ml-4 text-lg space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
     <li className="inner-nav-item"><a href="/about-us/about-us">About Us</a></li>
  <li className="inner-nav-item"><a href="/about-us/from-the-ceos-desk">From the CEOs Desk</a></li>
  <li className="inner-nav-item"><a href="/about-us/founder">The Founder</a></li>
  <li className="inner-nav-item"><a href="/about-us/advisory-team">Advisory Team</a></li>
  <li className="inner-nav-item"><a href="/about-us/media-gallery">Media Gallery</a></li>
            </motion.ul>
          )}
        </AnimatePresence>

        <button onClick={() => setServicesOpen(!servicesOpen)} className="navitem">Services</button>
        <AnimatePresence>
          {servicesOpen && (
            <motion.ul
              className="ml-4 text-lg space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
               <li className="inner-nav-item"><a href="#General-Outpatient-Consultation" >General Outpatient Consultation</a></li>
          <li className="inner-nav-item"><a href="#Surgical-Services" >Surgical Services</a></li>
          <li className="inner-nav-item"><a href="#Maternity-Childbirth-Services" >Maternity & Childbirth Services</a></li>
          <li className="inner-nav-item"><a href="#Orthopedic-Trauma-Surgery-Services" >Orthopedic & Trauma Surgery Services</a></li>
          <li className="inner-nav-item"><a href="#Diagnostic-Imaging-Services" >Diagnostic Imaging Services</a></li>
          <li className="inner-nav-item"><a href="#Pharmacy" >Pharmacy</a></li>

            </motion.ul>
          )}
        </AnimatePresence>

        <button onClick={() => setDepartmentsOpen(!departmentsOpen)} className="navitem">Departments</button>
        <AnimatePresence>
          {departmentsOpen && (
            <motion.ul
              className="ml-4 text-lg space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
                  <li className="inner-nav-item"><a href="#General-Outpatient-Department" >General Outpatient Department</a></li>
          <li className="inner-nav-item"><a href="#Surgical-Department" >Surgical Department</a></li>
          <li className="inner-nav-item"><a href="#Maternity-Obstetrics-Department" >Maternity & Obstetrics Department</a></li>
          <li className="inner-nav-item"><a href="#Pediatrics-Department" >Pediatrics Department</a></li>
        <li className="inner-nav-item"><a href="#Orthopedic-Trauma-Surgery-Department" >Orthopedic & Trauma Surgery Department</a></li>
       <li className="inner-nav-item"><a href="#Radiology-Diagnostic-Imaging-Department" >Radiology & Diagnostic Imaging Department</a></li>
        <li className="inner-nav-item"><a href="#Pharmacy-Department" >Pharmacy Department</a></li>
            </motion.ul>
          )}
        </AnimatePresence>

        <a href="#contact" className="navitem">Contact</a>
 
      </nav>


 
    </motion.div>
  )}
</AnimatePresence>

{!isOpen && (
  <div className="pt-5">
    <motion.button
      className="btn-sm w-48 block mx-auto lg:hidden"
      animate={{ scale: [0.8, 1.25, 0.8] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      whileHover={isOnPatientsPage ? {} : { scale: 1 }}
      disabled={isOnPatientsPage}
      onClick={() => {
        if (!isOnPatientsPage) handleBookAppointment();
      }}
    >
      {isLoading && !isOnPatientsPage ? (
        <div className="flex items-center text-sm gap-2">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={14}
            height={14}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        <div className="flex items-center text-sm gap-2">
          <Image
            src="/assets/icons/appointments.svg"
            alt="appointment icon"
            width={14}
            height={14}
            className="invert brightness-0"
          />
          Book Appointment
        </div>
      )}
    </motion.button>
  </div>
)}

</section>

  );
};

export default Navbar;


