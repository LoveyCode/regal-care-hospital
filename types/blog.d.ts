import { z } from "zod";
import { postSchema } from "@/models/postSchema";
 
 declare type PostListOptions = {
 page?: number;
  limit?: number;
 search?: string;
  tags?: string[];
  publishedOnly?: boolean;
 category?: string;
 };

export interface ICategory {
  _id?: string;
  name: string;
  postCount?: number;
}


 export interface IComment {
    _id: string;
   slug: string;
   postTitle?: string;
   postCategory?: string;
   commenterName: string;
   commenterEmail?: string;
   content: string;
   approved?: boolean; // admin can moderate
   createdAt: Date;
   updatedAt: Date;
 }

 export interface IPost {
   _id?: string;
   title: string;
   slug: string;
   content: string;
   excerpt?: string;
   author?: string;
   coverImage?: string;
   tags?: string[];
   published?: boolean;
   category: string;
   createdAt: Date;
   updatedAt: Date;
 }

 export interface Archive {
  _id: {
    year: number;
    month: number;
  };
  count: number;
}




export type PostFormData = z.infer<typeof postSchema>;
