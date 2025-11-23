"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

import slugify from "slugify";
import { PostFormData } from "../../../types/blog";

interface BasicInfoCardProps {
  register: UseFormRegister<PostFormData>;
  setValue: UseFormSetValue<PostFormData>;
  watch: UseFormWatch<PostFormData>;
  categories?: any[];
}

export default function BasicInfoCard({ register, setValue, watch, categories }: BasicInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Info</CardTitle>
        <CardDescription>Details about your post</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Title</Label>
          <Input
            {...register("title")}
            placeholder="Enter title"
            onChange={(e) => {
              setValue("title", e.target.value);
              const slug = slugify(e.target.value, { lower: true, strict: true });
              setValue("slug", slug);
            }}
          />
        </div>

        <div>
          <Label>Slug</Label>
          <Input {...register("slug")} placeholder="slug" />
        </div>

        <div>
          <Label>Excerpt</Label>
          <textarea {...register("excerpt")} rows={3} className="border rounded w-full p-2" />
        </div>

        <div>
          <Label>Category</Label>
          <select {...register("category")} className="border p-2 rounded w-full">
            <option value="">Select Category</option>
            {categories?.map((c: any) => (
              <option key={c._id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <Label>Tags</Label>
          <Input {...register("tags")} placeholder="nurse, doctor" />
        </div>
      </CardContent>
    </Card>
  );
}
