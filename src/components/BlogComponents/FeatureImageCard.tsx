"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { PostFormData } from "../../../types/blog";
import Image from "next/image";

interface FeatureImageCardProps {
  watch: UseFormWatch<PostFormData>;
  setValue: UseFormSetValue<PostFormData>;
  setShowImageModal: (val: boolean) => void;
}

export default function FeatureImageCard({ watch, setValue, setShowImageModal }: FeatureImageCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Image</CardTitle>
        <CardDescription>Choose or upload a cover image for this post</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {watch("coverImage") ? (
          <div className="relative w-full max-w-sm">
            <Image
              src={watch("coverImage")}
              alt="Cover Preview"
             width={800}
              height={400}
              className="rounded-md border w-full h-48 object-cover"

            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-4 right-4 text-lg text-white bg-black/50 hover:bg-black/70"
              onClick={() => setValue("coverImage", "")}
            >
              Remove
            </Button>
          </div>
        ) : (
          <Button type="button" variant="outline" onClick={() => setShowImageModal(true)}>
            Set Feature Image
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
