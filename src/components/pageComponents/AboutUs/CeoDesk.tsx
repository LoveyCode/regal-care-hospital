"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Boxes } from "@/components/ui/background-boxes";
import Image from "next/image";

const CeoDesk = () => {
  return (
     <div>
        <section className=" w-full">
              <div className="paragraph-text max-w-none ">
                <p className="pages-p">
            Dear Friends,
            </p>
        <p className="pages-p">
              Welcome to the official website of Regal Care Hospital.</p>
        
        <p className="pages-p">
        Founded in 1994, Regal Care Hospital was born out of a vision 
        to redefine healthcare delivery in Nigeria by offering compassionate, expert care across 
        a wide spectrum of medical needs. </p>
        
              <p className="pages-p">Today, we stand as a trusted provider of comprehensive 
        medical services known for our patient-centered approach, clinical excellence, and deep 
        commitment to ethical, evidence-based practices.</p>
                
                <Image
                  src="/assets/images/CeoPics.png"
                  alt="CEO Regal Care"
                  width={1000}
                  height={1000}
                  className="float-left w-96 h-auto my-4 mr-6 rounded-full shadow-md"
                />
        
                <p className="pages-p">
                  At Regal Care, we recognize that each patient is unique. 
                  That’s why we have built an environment where care is tailored, dignified,
                   and respectful  no matter who you are or where you’re from. From routine 
                   checkups to complex surgeries, our team works diligently to ensure every
                    experience is positive, safe, and supportive.</p>
        
                   <p className="pages-p">Our hospital is structured around key departments designed to meet the healthcare 
                   needs of individuals and families alike: </p>
        
                    <p className="pages-p">General Outpatient Consultation – for accessible, 
                    everyday medical care and long-term wellness.</p>
        
        <li className="pages-p">Surgical Services – equipped with modern surgical suites for general and 
                     specialized procedures.</li>
        
        <li className="pages-p">Maternity & Childbirth Services – supporting mothers through every stage of pregnancy and 
        delivery with safety and care.</li>
        
        <li className="pages-p">Orthopedic & Trauma Surgery Services – treating bone, joint, and injury-related 
        conditions with precision and expertise.</li>
        
        <li className="pages-p">Diagnostic Imaging Services – offering accurate diagnosis with cutting-edge imaging technology.</li>
        
        <li className="pages-p">Pharmacy – providing timely access to essential medications and pharmaceutical guidance.</li>
        
        <p className="pages-p">Our multidisciplinary team comprises skilled physicians, nurses, radiologists, pharmacists, 
        and administrative professionals all united by a shared passion for helping people heal 
        and thrive. We are driven by results, but more importantly, by the relationships we build 
        with our patients and their families.</p>
        
        <p className="pages-p">In our journey so far, we have continued to invest in technology, training, and service 
        expansion to stay ahead in an ever evolving healthcare landscape. We also understand the 
        value of your trust and we work every day to earn it.</p>
        
         <p className="pages-p">As you explore our website, we hope you find it informative and helpful. Whether you are a
         new visitor or a returning patient, we are honored to be part of your healthcare journey.</p>
        
        <p className="pages-p">Thank you for choosing Regal Care Hospital — where excellence meets empathy, and healing 
        begins with heart.</p>
        
        <p className="pages-p">Warm regards <br />  </p>
       <p className="font-bold text-zinc-900 text-xl">Dr. Jade Timileyin <br />
    Chief Executive Officer <br /> 
    Regal Care Hospital </p> 
       
      
                
              </div>
            </section>,
    </div>

  )
}

export default CeoDesk