import PatientForm from "@/components/forms/PatientForm";
// import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";
import { cookies } from 'next/headers';
import  jwt, { JwtPayload } from 'jsonwebtoken';
import { redirect } from 'next/navigation';



const JWT_SECRET = process.env.JWT_SECRET as string 



export default function Patient() {
 
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value;

  if (token) {
    try {
            const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;


         if (decoded?.userId) {
        if (decoded.isRegistered) {
          redirect(`/patients/${decoded.userId}/new-appointment`);
        } else {
          redirect(`/patients/${decoded.userId}/register`);
        }
      }
    } catch (err) {
      console.log("Invalid token", err);
      // Optionally redirect to login or error page
    }
  }



    return (
      <div className=" bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-200 flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
      
          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
            © 2025 MedIntel
            </p>
            <Link href="/?admin=true" className="text-blue-300">Admin</Link>
            
            </div>
        </div>
      </section>
   
      <Image
        src="/assets/images/onboarding-img.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="object-cover side-img max-w-[50%]"
          //  className="side-img max-w-[50%]"
      />
      </div>
    )
}