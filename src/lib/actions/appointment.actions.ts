/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { ID, Models, Query, Permission, Role} from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases, messaging } from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment, AppointmentStats } from "../../../types/appwrite.type";



export const isDoctorAvailable = async (doctorName: string, schedule: Date) => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [
        Query.equal("primaryPhysician", doctorName),
        Query.equal("schedule", schedule.toISOString()),
        Query.notEqual("status", "cancelled"), // optional: exclude cancelled ones
      ]
    );

    return result.total === 0; // If 0, doctor is available
  } catch (error) {
    console.error("Error checking doctor availability:", error);
    return false;
  }
};


export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment,
      [
        Permission.read(Role.any()), // or Role.user("ADMIN_USER_ID") for stricter access
        // Add update/delete as needed
      ]
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAppointment = async (appointmentId: string) => {
try {
    const appointment = await databases.getDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        appointmentId,
    )

return parseStringify (appointment);
}  catch (error) {
    console.log(error);
    
}
}
export const getRecentAppointmentList = async (): Promise<AppointmentStats | undefined> => {
    try {
      const appointments = await databases.listDocuments(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        [Query.orderDesc("$createdAt")]
      );


       const mappedAppointments: Appointment[] = appointments.documents.map((doc: Models.Document) => ({
      $id: doc.$id,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      $collectionId: doc.$collectionId,
      $databaseId: doc.$databaseId,
      $permissions: doc.$permissions,

      // custom fields
      patient: doc.patient,
      schedule: new Date(doc.schedule), // convert string to Date
      status: doc.status,
      primaryPhysician: doc.primaryPhysician,
      reason: doc.reason,
      note: doc.note,
      userId: doc.userId,
      cancellationReason: doc.cancellationReason,
    }));

      const initialCounts = {
        scheduledCount: 0,
        pendingCount: 0,
        cancelledCount: 0,
      };

      const counts = ( mappedAppointments).reduce((acc, appointment)=>{
if(appointment.status === 'scheduled') {
    acc.scheduledCount += 1;
} else if (appointment.status === 'pending') {
    acc.pendingCount += 1;
}else if (appointment.status === 'cancelled') {
    acc.cancelledCount += 1;
}

return acc;
}, initialCounts);

   const data: AppointmentStats = {
      ...counts,
      totalCount: appointments.total,
      documents: mappedAppointments,
    };

return parseStringify(data);
    } catch (error) {
        console.log(error); 
    }
}

export const updateAppointment = async ({
    appointmentId,
    userId,
    appointment,
    type,
  }: UpdateAppointmentParams) => {
    try {
      // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
      const updatedAppointment = await databases.updateDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        appointmentId,
        appointment
      );
  
      if (!updatedAppointment) throw Error;
  
      const smsMessage = `Hi friend! It's Regal Care.
     ${type === "schedule" ? `Your appointment is confirmed for 
    ${formatDateTime(appointment.schedule!).dateTime} with
     Dr. ${appointment.primaryPhysician}` : 
    `We regret to inform that your appointment for 
    ${formatDateTime(appointment.schedule!).dateTime} is cancelled. 
    Reason:  ${appointment.cancellationReason}`}.`;
      await sendSMSNotification(userId, smsMessage);
  
    
    } catch (error) {
      console.error("An error occurred while scheduling an appointment:", error);
    }
  };



  export const sendSMSNotification = async (userId: string, content:string) =>{
    try {
      const message = await messaging.createSms(
        ID.unique(),
        content,
        [],
        [userId]
      )
      return parseStringify (message)
    } catch (error) {
        console.error("Error sending SMS Notification:", error);
    }
  }
  