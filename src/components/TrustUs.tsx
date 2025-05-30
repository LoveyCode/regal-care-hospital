import Image from 'next/image'
import React from 'react'
import SectionHeading from './sectionHeading';

const TrustUs = () => {
  return (
    <section className='flex gap-10 w-full px-6 mt-40 '>
      
          <div className=' flex flex-col w-[80%]' >
           <SectionHeading title= {<h1 className='header text-center'> Where Trust <span className='text-blue-300'> Meets Care</span></h1>} />
            <div className="flex gap-5 ">
            <div className='w-full flex flex-col'>
                <div className='rounded-full justify-center items-center bg-blue-300 flex w-[40px] h-[40px]  lg:w-[50px] lg:h-[50px] mb-10'>
                    <Image 
                    src= "/assets/icons/easy-access.png" 
                    alt='Easy Access To Care'
                    height={70}
                    width={70}
                    className='invert brightness-0 h-[40px] w-[40px] lg:w-[50px] lg:h-[50px]'
                    />
                </div>
                <h1 className='Home-sub-heading pb-2'>Easy Access To Care</h1>
          <p className='paragraph-text'>
          At Regal Care, your healthcare journey is 
          seamlessly coordinated by a dedicated team of 
          professionals working together to deliver the precise
           care you need—when you need it.
          </p>
          </div>

          <div className='w-full flex flex-col'>
          <div className='rounded-full justify-center items-center bg-blue-300 flex w-[40px] h-[40px]  lg:w-[50px] lg:h-[50px] mb-10'>
                    <Image 
                    src= "/assets/icons/results-oriented.png" 
                    alt='Result Oriented'
                    height={45}
                    width={45}
                    className='invert brightness-0 h-[25px] w-[25px]  lg:w-[50px] lg:h-[50px]'
                    />
                </div>
                <h1 className='Home-sub-heading pb-2'>Result Oriented</h1>
          <p className='paragraph-text'>
            We offer a full spectrum of medical services from general medicine and specialist
            consultations to advanced diagnostics, surgical procedures, and emergency care. 
            </p>
            </div>
          </div>
            <div className="flex gap-5 pt-10">
            <div className='w-full flex flex-col'>
            <div className='rounded-full justify-center items-center bg-blue-300 flex w-[40px] h-[40px]  lg:w-[50px] lg:h-[50px] mb-10'>
                    <Image 
                    src= "/assets/icons/medical-expertise.png" 
                    alt='Medical Expertise'
                    height={45}
                    width={45}
                    className='invert brightness-0 h-[40px] w-[40px]  lg:w-[50px] lg:h-[50px]'
                    />
                </div>
                <h1 className='Home-sub-heading pb-2'>Unrivaled Clinical Expertise</h1>
          <p className='paragraph-text'>
            Our hospital is equipped with modern infrastructure and cutting-edge medical technology,
            enabling our teams to deliver accurate diagnoses and effective interventions. 
          </p>
          </div>

          <div className='w-full flex flex-col'>
          <div className='rounded-full justify-center items-center bg-blue-300 flex w-[40px] h-[40px]  lg:w-[50px] lg:h-[50px] mb-10'>
                    <Image 
                    src= "/assets/icons/we-listen.png" 
                    alt='Medical Expertise'
                    height={70}
                    width={70}
                    className='invert brightness-0 w-[30px] h-[30px]  lg:w-[50px] lg:h-[50px]' 
                    />
                </div>
                <h1 className='Home-sub-heading pb-2'>You Speck, We Listen</h1>
          <p className='paragraph-text'>
            At Regal Care, we believe that healing goes beyond medicine. That&apos;s why we&apos;ve created a
            supportive and respectful environment where patients feel heard, valued, and safe. 
          </p>
          </div>
          </div>
            </div>

            <Image
            src= "/assets/images/TrustUs.jpg"
            alt="Trust Us"
            width={1000}
            height={1000}
            className="rounded-3xl hidden lg:flex w-full object-cover "
          />
           
    </section>
  )
}

export default TrustUs