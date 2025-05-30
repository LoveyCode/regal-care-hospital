import React from 'react'
import Hero from '@/components/Hero'
import FadeInWhenVisible from '@/components/FadeInWhenVisible'
import Afterhero from '@/components/Afterhero'
import { FaLocationDot } from 'react-icons/fa6'
import Statements from '@/components/Statements'
import MedicalServices from '@/components/MedicalServices'
import Partnerships from '@/components/Partnerships'
import WelcomeMessage from '@/components/WelcomeMessage'
import TrustUs from '@/components/TrustUs'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'

const Home = () => {
    
  return (
    <div>
        <Hero />
       <FadeInWhenVisible delay={0.2}>
      <Afterhero
         title={<h1 className="text-white text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">No 12 Adeniyi Close, Victoria Island Lagos</h1>}
         icon={<FaLocationDot className='text-white w-[3rem] h-[3rem]' />} 
/>
</FadeInWhenVisible>

 <FadeInWhenVisible delay={0.2}>
      <Statements />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2}>
      <Afterhero 
       title={<h1 className="text-zinc-600 text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl">Have any questions? Call us now! 07099991234, 09044723458</h1>}
         icon={<FaLocationDot className='text-zinc-600 w-[2.5rem] h-[2.5rem] md:w-[3rem] md:h-[3rem]' />}
       
        />
        </FadeInWhenVisible>

        <FadeInWhenVisible> 
      <MedicalServices />
       </FadeInWhenVisible>

      <FadeInWhenVisible> 
      <Partnerships />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
      <WelcomeMessage />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
      <TrustUs />
      </FadeInWhenVisible>

       <FadeInWhenVisible>
      <Testimonials />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
      <Newsletter />
      </FadeInWhenVisible>
    </div>
  )
}

export default Home