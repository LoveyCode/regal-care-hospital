import React from 'react'
import { hospitals } from '../../data'
import SectionHeading from './sectionHeading';


const Partnerships = () => {
  return (
    <section className='flex flex-col justify-center items-center w-full mb-20 mt-20 xl:mt-20'>
     <SectionHeading title= {<h1 className='header text-center'> Trusted Hospital  <span className='text-blue-300'> Partners</span></h1>} />
       <div className="flex flex-wrap relative bg-blue-300 w-full py-2 items-center justify-center gap-4 md:gap-16 mt-10"> 
          <div
    className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 
      border-l-[40px] border-r-[40px] border-t-[40px] 
      border-l-transparent border-r-transparent border-t-white"
  />
        {hospitals.map((hospital) =>(
   <React.Fragment  key={hospital.id}>
   <div className='flex bg-white w-[10rem] h-auto p-5 rounded-lg md:max-w-60 max-w-32 gap-2'>
   <img
                  src={hospital.img}
                  alt={hospital.name}
                  className='w-28 h-auto'
                />
            
   </div>
</React.Fragment>
        ))}
     
       </div>
      
       </section>
  )
}

export default Partnerships