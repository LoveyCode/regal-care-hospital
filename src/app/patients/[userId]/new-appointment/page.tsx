
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";


export default async function NewAppointment({ params: {userId}}: SearchParamProps){
    const patient = await getPatient(userId);

      if (!patient) {
    return <div className="text-center mt-20 text-red-500">Patient not found</div>;
  }

 
    return (
      <div className="flex h-screen max-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-200">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
        <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm 
           patientId={patient?.$id}
           userId={userId}
           type="create"
          />

         
            <p className="copyright mt-10 py-12">
            © 2025 MedIntel
            </p>
      
            
            </div>
    
      </section>
      </div>
    )
}