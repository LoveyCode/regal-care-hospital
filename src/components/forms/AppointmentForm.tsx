"use client"
 import {useEffect, useState} from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form,} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import {  getAppointmentSchema } from "@/lib/validation"
import { usePathname, useRouter } from "next/navigation"
import { FormFieldType } from "./PatientForm"
import { Doctors } from "../../../constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { createAppointment, updateAppointment, isDoctorAvailable } from "@/lib/actions/appointment.actions"
import { Appointment } from "../../../types/appwrite.type"


export const AppointmentForm = ({
    userId,
    patientId,
    type = "create",
    appointment, 
    setOpen
  }: {
    userId: string;
    patientId: string;
    type: "create" | "schedule" | "cancel";
    appointment: Appointment;
    setOpen: (open: boolean) => void;
}) => {
   const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const AppointmentFormValidation = getAppointmentSchema(type);
 const [isOnPage, setIsOnPage] =useState (false)
       
  
  
          const pathname = usePathname();
        useEffect(() => {
    if ( pathname === '/success') {
      setIsOnPage(true);
    } else {
      setIsOnPage(false);
    }
  }, [pathname]);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : '',
      schedule: appointment ? new Date (appointment?.schedule) : new Date(Date.now()),
      reason: appointment ? appointment.reason : '',
      note: appointment?.note || '',
      cancellationReason: appointment?.cancellationReason || ''
    },
  });
 
  // 2. Define a submit handler.
 const onSubmit= async (values: z.infer<typeof AppointmentFormValidation>)=> {
    setIsLoading(true)
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }
  try {
if (type === 'create' && patientId) {
   const appointmentData = {
        userId,
        patient: patientId,
        primaryPhysician: values.primaryPhysician,
        schedule: new Date (values.schedule),
        reason: values.reason!,
        note: values.note,
        status: status as Status,
    }

     setIsLoading(true);
    setErrorMessage(null); // Clear previous error

    const selectedDoctor = values.primaryPhysician;
    const selectedDateTime = values.schedule;

    // Check doctor availability
    const doctorIsFree = await isDoctorAvailable(selectedDoctor, selectedDateTime);

    if (!doctorIsFree) {
      setErrorMessage(`Dr. ${selectedDoctor} is not available at the selected time.`);
      setIsLoading(false);
      return;
    }
  
    const appointment= await createAppointment(appointmentData);
 
    if (appointment) {
        form.reset();
        router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
    }

}else 
  if (appointment?.$id) {
  const appointmentToUpdate = {
    userId,
    appointmentId: appointment?.$id,
    appointment: {
      primaryPhysician: values?.primaryPhysician,
      schedule: new Date(values?.schedule),
      status: status as Status,
      cancellationReason: values?.cancellationReason,
    },
    type
  }
  
 await updateAppointment(appointmentToUpdate);
    //setOpen only if setOpen exist
   if (setOpen) setOpen(false);
    form.reset();
}

    } catch (error) {
        console.log(error);
    }
  if ( pathname === '/success') {
  setIsLoading(false);
}
  }

let buttonLabel;

switch (type){
    case 'cancel':
        buttonLabel = 'Cancel Appointment';
        break;
        case 'create':
            buttonLabel = 'Create Appointment';
            break;
            case 'schedule':
                buttonLabel = 'Schedule Appointment'
                break;
                default:
                break;

}
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 ">
    {   type === 'create' && <section className="mb-12 space-y-4 ">
            <h1 className="header dark:text-zinc-200 text-dark-300">New Appointment</h1>
            <p className="text-dark-300 dark:text-zinc-200">Request a new appointment in 10 seconds</p>
        </section>}

        {type !== "cancel" && (
            <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Primary Doctor"
              placeholder="Select a doctor">

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

  <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment Date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />

            <div className="flex flex-col gap 6 xl:flex-row">
<CustomFormField 
fieldType={FormFieldType.TEXTAREA}
control={form.control}
name="reason"
label="Reason for appointment"
placeholder="Enter reason for appointment"
/>

<CustomFormField 
fieldType={FormFieldType.TEXTAREA}
control={form.control}
name="note"
label="Note"
placeholder="Enter note"
/>
            </div>

            </>
        )}

{type === "cancel" && (
    <CustomFormField 
fieldType={FormFieldType.TEXTAREA}
control={form.control}
name="cancellationReason"
label="Reason for appointment"
placeholder="Enter reason for appointment"
/>

)}
 
    {errorMessage && (
  <p className="text-red-500 text-sm font-medium">
    {errorMessage}
  </p>
)}

<SubmitButton
  isOnPage={isOnPage}
  isLoading={isLoading}
  className={`${
    type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
  } w-full`}
>
  {buttonLabel}
</SubmitButton>

      </form>
    </Form>
  )
}

export default AppointmentForm;