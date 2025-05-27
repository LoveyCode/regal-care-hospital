import React from 'react'
import { FaFacebook, FaInstagram, FaRegClock } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";



const TopNav = () => {
  return (
    <div className='w-full flex flex-col'>
        <section className='top-nav-container bg-blue-300'>
            <div className='flex gap-2 justify-center items-center'>
            < FiPhone className='top-nav-icons'/> 
            <p className='flex flex-1 text-white text-md'>07099991234</p>
            </div>
            <div className='flex gap-2 justify-center items-center'> 
           <FiMail  className='top-nav-icons'/>
          <FaFacebook className="top-nav-icons" />
          <FaInstagram className="top-nav-icons" />

            </div>
           
        </section>

          <section className='top-nav-container bg-yellow-600'>
                <div className='flex gap-2 justify-center items-center'>
            <FaRegClock className='top-nav-icons'/>
            <p className=" flex flex-1 text-white text-md">We are open 24/7, always here to serve you</p>
            </div>
        </section>

        {/* <div className="relative w-full bg-yellow-600 h-40">
 
  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[20px] border-l-transparent border-r-transparent border-b-yellow-300"></div>

 
  <div className="text-center pt-10 font-bold text-xl">Hello World</div>

  <div className="relative w-full bg-yellow-300 h-40">

  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 
              border-l-[40px] border-r-[40px] border-t-[40px] 
              border-l-transparent border-r-transparent border-t-white">
  </div>
</div> */}

{/* </div> */}


        
    </div>
  )
}

export default TopNav