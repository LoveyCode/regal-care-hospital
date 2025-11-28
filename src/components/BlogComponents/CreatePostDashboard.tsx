"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import BasicInfoCard from "@/components/BlogComponents/BasicInfoCard";
import FeatureImageCard from "@/components/BlogComponents/FeatureImageCard";
import ContentCard from "@/components/BlogComponents/ContentCard";
import ImageModal from "@/components/BlogComponents/ImageModal";

import { postSchema } from "@/models/postForm";
import { PostFormData } from "../../../types/blog";



export default function CreatePostDashboard() {
  const router = useRouter();
  const [slugValue, setSlugValue] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`/api/categories`);
      if (!res.ok) throw new Error("Failed to load categories");
      return res.json();
    },
  });

  const { register, handleSubmit, watch, setValue, getValues } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: { published: false, author: "Admin" },
  });

  const createOrUpdateMutation = useMutation({
    mutationFn: async (data: PostFormData) => {
      const tags = data.tags?.split(",").map((t: string) => t.trim()).filter(Boolean) || [];
      const slug =
        slugValue ||
        data.slug ||
        slugify(data.title || "untitled", { lower: true, strict: true });
      const method = slugValue ? "PATCH" : "POST";
      const url = slugValue ? `/api/blogPosts/${slug}` : `/api/blogPosts`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, tags, slug }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save draft");
      }
      const result = await res.json();
      if (!slugValue && result.slug) setSlugValue(result.slug);
      return result;
    },
    onSuccess: () => {
      toast.success(slugValue ? "Draft updated" : "Draft created");
      setIsSaving(false);
    },
    onError: (err: any) => {
      toast.error(err.message || "Autosave failed");
      setIsSaving(false);
    },
  });

  const values = watch();

  useEffect(() => {
    const meaningful = Object.values(getValues()).some((v) =>
      v && String(v).trim().length > 0
    );
    if (meaningful && !hasTyped) setHasTyped(true);
  }, [values, getValues, hasTyped]);

  useEffect(() => {
    if (!hasTyped) return;
    if (createOrUpdateMutation.isPending) return;

    const timeout = setTimeout(() => {
      const data = getValues();
      const hasInput = Object.values(data).some(
        (v) => v && String(v).trim().length > 0
      );
      if (!hasInput) return;
      if (!slugValue && (!data.title || data.title.trim() === "")) return;
      const currentSnapshot = JSON.stringify(data);
      if (sessionStorage.getItem("lastSavedData") === currentSnapshot) return;
      sessionStorage.setItem("lastSavedData", currentSnapshot);
      setIsSaving(true);
      createOrUpdateMutation.mutate(data);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [values, hasTyped, getValues]);

  const contentValue = watch("content");

  const handlePublish = async () => {
    const slug = slugValue || slugify(getValues("title") || "untitled", { lower: true, strict: true });
    const res = await fetch(`/api/blogPosts/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: true }),
    });
    if (res.ok) {
      toast.success("Post published!");
      router.push("/dashboard/blogActions/allPost");
    } else {
      toast.error("Failed to publish post");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/blogActions/allPost")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <p className="text-muted-foreground">
            Write your new article{" "}
            {isSaving && <span className="text-xs text-yellow-500">(Saving draft...)</span>}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handlePublish)} className="space-y-6">
        <BasicInfoCard register={register} setValue={setValue} watch={watch} categories={categories} />
        <FeatureImageCard watch={watch} setValue={setValue} setShowImageModal={setShowImageModal} />
        <ContentCard register={register} contentValue={contentValue} />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => router.push("/dashboard/blogActions/allPost")}>
            Cancel
          </Button>
          <Button type="submit">
            {createOrUpdateMutation.isPending ? "Publishing..." : "Publish Post"}
          </Button>
        </div>
      </form>

      {showImageModal && <ImageModal setShowImageModal={setShowImageModal} setValue={setValue} />}
    </div>
  );
}
