// src/types/blog.ts
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  tags: z.string().optional(),
  category: z.string().optional(),
  coverImage: z.string().optional(),
  author: z.string().optional(),
  published: z.boolean().default(false),
});


