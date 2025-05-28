"use server"
import {ID, Query } from "node-appwrite"
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

import  { BUCKET_ID,
DATABASE_ID,
ENDPOINT,
PATIENT_COLLECTION_ID,
PROJECT_ID,
databases,
storage,
users,
} from "../appwrite.config";

import { InputFile } from "node-appwrite/file"
import { parseStringify } from "../utils";


const JWT_SECRET = process.env.JWT_SECRET as string 


export const checkIfUserExists = async (email: string) => {
  try {
    const documents = await users.list([Query.equal("email", [email])]);
    return documents?.users[0] || null;
  } catch (error) {
    console.error("Error checking existing user:", error);
    return null;
  }
};

//  const documents = await users.list([Query.equal("email", [email])]); means 
// check if inputed email is equal to any email in the database
// return documents?.users[0] || null; means if you find any email like that which is documents 
// then the first of that email(it is trying to target the found email) if none is found return null



export const createUser = async (user: CreateUserParams) => {
  try {
    // 1. Check if user already exists
    const existingUser = await checkIfUserExists(user.email);

    if (existingUser) {
      const token = jwt.sign(
        {
          userId: existingUser.$id,
          isRegistered: true,
        },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return {
        token,
        user: parseStringify(existingUser),
      };
    }

    // 2. Create new user
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    const token = jwt.sign(
      {
        userId: newUser.$id,
        isRegistered: false,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      token,
      user: parseStringify(newUser),
    };
  } catch (error: any) {
    console.error("An error occurred while creating a new user:", error);
    throw error;
  }
};


export const handleCreateUser = async (user: CreateUserParams) => {
  const result = await createUser(user);

  const token = result.token;

  // ✅ Set the cookie
  cookies().set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600,
    path: '/',
  });

   const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

  return {
    user: result.user,
    isRegistered: decoded?.isRegistered,
  };
};





  export const getUser= async (userId: string) =>{
   try {
    const user = await users.get(userId);
    return parseStringify(user)
   } catch (error) {
    console.log(error);
    
   }

  }

  export const getPatient = async (userId: string) => {
    try {
      const patients = await databases.listDocuments(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        [Query.equal("userId", [userId])]
      );
      return parseStringify(patients.documents[0]);
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  };


  export const registerPatient =async ({ identificationDocument, ...patient}: RegisterUserParams) => {
try {
  let file;

  if(identificationDocument) {
    const inputFile = InputFile.fromBuffer(
      identificationDocument?.get('blobFile') as Blob,
      identificationDocument?.get('fileName') as string,
    )
    file =await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
  }

  
const newPatient =await databases.createDocument(
  DATABASE_ID!,
  PATIENT_COLLECTION_ID!,
  ID.unique(),
  {
    identificationDocument: file?.$id || null,
    identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/
    files/${file?.$id}/view?project=${PROJECT_ID}`,
    ...patient
  }
)
return parseStringify(newPatient);
} catch (error) {
    console.error("Error Creating New Patient:", error);
}
  }

  export const generateAuthToken = (userId: string) => {
  return jwt.sign(
    { userId, isRegistered: true },
    JWT_SECRET,
    { expiresIn: '1h' }  // ⏱ 1-hour expiry
  );
};
