import Image from 'next/image'
import React from 'react'
import { socialMediaIcons } from '../../data'


const Statements = () => {
  return (

      <section className='w-full h-full '>  
    <div className='flex flex-col lg:grid lg:grid-cols-[200px_800px] xl:grid-cols-[400px_600px] 2xl:grid-cols-[600px_400px] lg:gap-[20rem] xl:gap-[5rem]'>
     
        <div className=' relative w-[400px] h-[800px] md:pl-32 lg:pl-0 md:w-[500px]  md:h-[1000px]'>
<Image 
            src="/assets/images/statementImg.png" 
            alt="Statement Image"
            width={1000}
            height={1000}

          
/>
<div className='absolute hidden lg:flex xl:hidden top-[25rem] left-0 lg:w-[32.5rem] lg:h-[20rem]  bg-yellow-600 justify-center items-center'>
    <div className='justify-center items-center'>
<h1 className='Home-sub-heading py-5 text-white px-5'>Our Vision</h1>
<p className='text-2xl md:text-3xl lg:text-3xl 2xl:text-2xl pb-0 font-medium text-zinc-200 px-5'>
 To be a trusted leader in healthcare, 
    recognized for our excellence in patient care, 
    innovation, and community wellness—where every 
    life is valued and every patient experience is regal.
</p>
</div>
</div>

<div className='absolute 2xl:top-[47rem] top-[37rem] md:top-[34.8rem] lg:top-[47rem] left-0 w-[45rem] md:w-[50rem] lg:w-[32.5rem] lg:h-[23rem] xl:w-[30rem] h-[13rem] md:h-[15rem] 2xl:w-[42.5rem] 2xl:h-[13rem] bg-blue-300 justify-center items-center'>
    <div className='justify-center items-center'>
<h1 className='Home-sub-heading py-5 text-white px-5'>Our branches</h1>
<p className='text-2xl md:text-3xl lg:text-2xl 2xl:text-2xl pb-0 font-medium text-zinc-200 px-5'>
57 Olivia Embra Close, Lagos, Nigeria <br/>
13 Shelly Road, Port Harcourt, Nigeria <br/>
</p>
</div>
<div className="flex flex-wrap lg:items-center items-start mx-12 lg:mx-0 lg:justify-center gap-4 lg:gap-8 xl:gap-4 2xl:gap-8 md:gap-16 mt-5"> 
        {socialMediaIcons.map((icon) =>(
   <React.Fragment  key={icon.id}>
   <div className='flex md:max-w-60 max-w-32 gap-2 '>
   <a href={icon.link} target="_blank" rel="noopener noreferrer">
  <Image
    src={icon.src}
    alt={icon.alt}
    width={40}
    className="w-10 h-auto"
  />
</a>      
   </div>
</React.Fragment>
        ))}
     
       </div>

</div>
</div>

<div className="flex flex-col w-full lg:grid lg:grid-rows-[600px_500px] md:-mt-52 lg:mt-0 lg:gap-0">
<div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-[20rem] md:gap-[0rem]">
<div className='statementCard  lg:w-[500px] lg:h-[600px] w-full md:h-[400px] xl:h-[700px] xl:w-[400px] 2xl:w-[350px] bg-blue-600'>
    <h1 className='Home-sub-heading text-zinc-200 pb-5'>Our Mission</h1>

<p className='statement-text'>
    To provide exceptional, accessible, and compassionate
     healthcare services that prioritize the dignity, 
     comfort, and well-being of every patient. 
     At RegalCare Hospital, we are committed to delivering 
     advanced medical care through a team of skilled professionals, 
     modern technology, and a culture of continuous improvement.</p>
</div> 

<div className='statementCard  lg:w-[500px] w-full md:h-[400px] xl:h-[700px] xl:w-[400px] 2xl:w-[350px] xl:-ml-10 2xl:-ml-20 bg-dark-600 rounded-tr-lg'>
<h1 className='Home-sub-heading text-zinc-200 pb-5'>Our Vision</h1>

<p className='statement-text'>
    To be a trusted leader in healthcare, 
    recognized for our excellence in patient care, 
    innovation, and community wellness—where every 
    life is valued and every patient experience is regal.</p>
  
</div>
</div>

<div className=" col-span-2 2xl:w-[680px] 2xl:h-[410px] lg:-mt-[5rem] xl:mt-[6rem] 2xl:-mt-[3rem] md:h-[400px] xl:h-[425px] xl:w-[815px]  lg:w-[500px] lg:h-[600px] w-full h-[650px] bg-blue-200 gap-4 rounded-br-lg">
<h1 className='Home-sub-heading py-5 px-10'>Who We Are</h1>

<p className='pages-text'>
RegalCare Hospital is a modern healthcare institution 
built on a legacy of compassion, integrity, 
and medical excellence. Since our founding, 
we have remained committed to redefining healthcare
 standards in our community by providing exceptional 
 medical services backed by cutting-edge technology 
 and a dedicated team of professionals.</p>
</div>
</div>

    </div>
    </section>
   
  )
}

export default Statements