"use client"
 import {useEffect, useState} from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { PatientFormValidation } from "@/lib/validation"
import { usePathname, useRouter } from "next/navigation"
import { createUser, registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "../../../constants"
import Image from "next/image"
import { SelectItem } from "../ui/select"
import FileUploader from "../FileUploader"


const RegisterForm = ({user}:{user: User}) => {
   const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [isOnPage, setIsOnPage] =useState (false)

          
    
    
            const pathname = usePathname();
          useEffect(() => {
      if (pathname === '/new-appointment') {
        setIsOnPage(true);
      } else {
        setIsOnPage(false);
      }
    }, [pathname]);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues, 
      name: "",
      email: "",
      phone: "",
    },
  });
 
  // 2. Define a submit handler.
 const onSubmit= async (values: z.infer<typeof PatientFormValidation>)=> {
    setIsLoading(true)

    let formData;
    if(values.identificationDocument && values.identificationDocument.length > 0) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
    })
formData = new FormData();
formData.append('blobFile', blobFile)
formData.append('fileName', values.identificationDocument[0].name)

    }

    try {
  const patientData = {
    ...values,
    userId: user.$id,
    birthDate: new Date(values.birthDate),
    identificationDocument: formData
  }

  const patient = await registerPatient(patientData);

  if (patient) router.push(`/patients/${user.$id}/new-appointment`);
          
    } catch (error) {
        console.log(error);
    }

  if (pathname === '/new-appointment') {
  setIsLoading(false);
}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-12 flex-1 ">
        <section className="mb-12 space-y-4">
            <h1 className="header text-dark-300 dark:text-zinc-200">Welcome</h1>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
        <h2 className=" font-bold"> Personal Information</h2>
        </div>
        </section>

        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="Lala Bode"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="youremail@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="(234) 123 456 6745"
            />
          </div>
 
          {/* BirthDate & Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth"
       
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {/* GenderOptions is from constant */}
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem 
                        value={option}
                         id={option} />
                        <Label htmlFor={option}
                         className="text-dark-700 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
            </div>


            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="24 jide Okotu Street"
      
          />

              <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder="Software Engineer"
            
            />

    <div className="flex flex-col gap-6 xl:flex-row">

               <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            
            />

              <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="(555) 123-4567"
            />
          </div>

                <section className="space-y-6">
          <div className="mb-9 space-y-1">
        <h2 className=" font-bold"> Medical Information</h2>
        </div>
        </section>

        <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Primary Physician"
              placeholder="Select a physician" >

{Doctors.map((doctor)=> (

  <SelectItem key= {doctor.name} 
  value= {doctor.name}>
    <div className="flex cursor-ponter items-center gap-5">
      <Image src={doctor.image}
      width={32}
      height= {32}
      alt={doctor.name}
      className="rounded-full border border-dark-500"/>
     <p>{doctor.name}</p>
    </div>

  </SelectItem>
))}
  </CustomFormField>
  <div className="flex flex-col gap-6 xl:flex-row">
  <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance provider"
            placeholder="Your Insurance Company"
      
          />
              <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ABC123456789"
            />
  </div>

  <div className="flex flex-col gap-6 xl:flex-row">
  <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies (if any)"
            placeholder="Pumpkin, Cheese, Avocado and Peanut butter"
      
          />
              <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current medication (if any)"
              placeholder="Ibuprofen 200mg, Amozil 200mg Paracetamol 500mg"
            />
  </div>

  <div className="flex flex-col gap-6 xl:flex-row">
  <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Family medical history"
            placeholder="Mother was diebetic, Father have Arthritics"
      
          />
              <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Hypertension, Diabetes Mellitus (Type 2)
Asthma, Previous Stroke (2020), History of Tuberculosis (Treated in 2018)"
            />
  </div>

  <section className="space-y-6">
          <div className="mb-9 space-y-1">
        <h2 className="font-bold "> Identification and Verification</h2>
        </div>
   

        <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="identificationType"
              label="Identification Type"
              placeholder="Select a Identification Type" >

{IdentificationTypes.map((type)=> (

  <SelectItem key={type} value={type}>
{type}
  </SelectItem>
    ))}
  </CustomFormField>
  
  <div className="flex flex-col gap-6 xl:flex-row">
  <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="identificationNumber"
              label="Identification number"
              placeholder="123456789"
            />
  </div>
       

  <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="identificationDocument"
              label="Scanned copy of identification document"
              renderSkeleton={(field) => (
                <FormControl>
              <FileUploader  files={field.value}
               onChange={field.onChange}/>
                </FormControl>
              )}
            />
     </section>


     <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          />
        </section>
              

     
     <SubmitButton className="bg-blue-300 w-full text-white" isOnPage={isOnPage} isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm