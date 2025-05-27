import Image from 'next/image';
import React from 'react';
import SectionHeading from './sectionHeading';

const WelcomeMessage = () => {
  return (
    <section className=" flex px-6 mt-40">
      <div className="flex flex-col xl:flex-row justify-center gap-14 w-full">
        {/* Image */}
        <div className="w-full xl:w-1/2 flex flex-col gap-10">
          <Image
            src= "/assets/images/Prenatal-care.jpg"
            alt="Orthopedics Trauma"
            width={800}
            height={800}
            className="rounded-3xl w-full object-cover"
          />

<Image
            src="/assets/images/OrthopedicsTrauma.jpg"
            alt="Orthopedics Trauma"
            width={800}
            height={800}
            className="rounded-3xl w-full object-cover "
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-6 w-full xl:w-1/2 text-lg">
          <SectionHeading title= {<h1 className='header text-center'> Welcome to  <span className='text-blue-300'> Regal Care</span></h1>} />
          
          <p className='paragraph-text'>
            Regal Care Hospital is a purpose-built, 60-bed facility dedicated to delivering
            high-quality, patient-centered healthcare. Since opening our doors in 2005, we have
            earned a solid reputation for professionalism, compassion, and innovation in clinical
            practice.
          </p>

          <p className='paragraph-text'>
            We offer a full spectrum of medical services—from general medicine and specialist
            consultations to advanced diagnostics, surgical procedures, and emergency care. Our
            commitment to personalized treatment and patient dignity has positioned us as a trusted
            destination for families, corporate organizations, and referral partners.
          </p>

          <p className='paragraph-text'>
            Our hospital is equipped with modern infrastructure and cutting-edge medical technology,
            enabling our teams to deliver accurate diagnoses and effective interventions. At the
            core of our service is a multidisciplinary team of healthcare professionals including
            experienced consultants, resident doctors, and skilled nurses, all working together to
            provide seamless care across various specialties.
          </p>

          <p className='paragraph-text'>
            At Regal Care, we believe that healing goes beyond medicine. That’s why we’ve created a
            supportive and respectful environment where patients feel heard, valued, and safe. We
            continue to grow—not just in size, but in our ability to respond to the changing health
            needs of our community.
          </p>
          <p className="text-2xl font-bold self-center text-center">
           Dr. Adeyemi Jimoh<br /> <span className='text-xl'> Medical Director</span>
           </p>
          </div>
          </div> 
  
  
    </section>
   

  );
};

export default WelcomeMessage;
