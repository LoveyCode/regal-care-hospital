import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import React from 'react'



const Register = async ({params: {userId}} : SearchParamProps) => {
  //watch next.js video on dynamic routes to get more understanding on it. 
    const user = await getUser(userId)

  if (!user) {
    return <div className="text-center mt-20 text-red-500">User not found</div>;
  }

  return (
    <div className="block h-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-200">
    {/* <section className="remove-scrollbar container "> */}
    <section className=" container ">
      <div className="sub-container max-w-[860px]  py-10">
   
        <RegisterForm user = {user}/>


          <p className="copyright py-12">
          © 2025 MedIntel
          </p>
      </div>
    </section>
    </div>
  )
}

export default Register