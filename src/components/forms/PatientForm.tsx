"use client"
 import {useEffect, useState} from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form,} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { UserFormValidation } from "@/lib/validation"
import { usePathname, useRouter } from "next/navigation"
import { handleCreateUser  } from "@/lib/actions/patient.actions"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datepicker',
    SELECT = 'select',
    SKELETON = 'skeleton'

  } 

const PatientForm = () => {
   const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
      const [isOnPage, setIsOnPage] =useState (false)


        const pathname = usePathname();
      useEffect(() => {
  if (pathname === '/register' || pathname === '/new-appointment') {
    setIsOnPage(true);
  } else {
    setIsOnPage(false);
  }
}, [pathname]);
      

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
 
  // 2. Define a submit handler.
 const onSubmit= async ({name, email, phone}: z.infer<typeof UserFormValidation>)=> {
    setIsLoading(true) 
    try {
 const user = { name, email, phone };
    const { user: createdUser, isRegistered } = await handleCreateUser(user);

    if (createdUser) {
      router.push(
        isRegistered
          ? `/patients/${createdUser.$id}/new-appointment`
          : `/patients/${createdUser.$id}/register`
      );
    }
  } 
  catch (error) {
    console.log(error);
  }
  if (pathname === '/register' || pathname === '/new-appointment') {
  setIsLoading(false);
}
 }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 ">
        <section className="mb-12 space-y-4 ">
            <h1 className="header text-dark-300 dark:text-zinc-200">Hello!</h1>
            <p className="text-dark-300 dark:text-zinc-200 ">Always at your service, schedule your first appointment here.</p>
        </section>

        <CustomFormField 
     
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label= "Full Name"
        placeholder ="Lala Bode"
        iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

         <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="youremail@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

           <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />
     
     <SubmitButton className="bg-blue-300 w-full text-white" isOnPage={isOnPage} isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm