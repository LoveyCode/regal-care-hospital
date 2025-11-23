"use client";
import { Button } from "@/components/ui/button";
import { UseFormSetValue } from "react-hook-form";
import { PostFormData } from "../../../types/blog";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Image from "next/image";

interface ImageModalProps {
  setShowImageModal: (val: boolean) => void;
  setValue: UseFormSetValue<PostFormData>;
}

export default function ImageModal({ setShowImageModal, setValue }: ImageModalProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: uploadedImages = [], refetch: refetchImages } = useQuery({
    queryKey: ["uploadedImages"],
    queryFn: async () => {
      const res = await fetch("/api/uploads");
      if (!res.ok) throw new Error("Failed to fetch uploaded images");
      return res.json();
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className=" relative p-20 items-center rounded-xl w-[90%] max-w-lg space-y-4 shadow-lg bg-mode ">
        <button
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
          onClick={() => setShowImageModal(false)}
        >
          ×
        </button>

            <div className="flex justify-between items-center mb-8"> 
        <h2 className="text-xl font-semibold ">Select Feature Image</h2>

           <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? "Uploading..." : "Upload New Image"}
        </Button>
        </div>

        <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto">
          {uploadedImages?.length ? (
            uploadedImages.map((img: any) => (
              <div
                key={img._id}
                className="border rounded cursor-pointer hover:ring-2 hover:ring-primary"
                onClick={() => {
                  setValue("coverImage", img.url);
                  setShowImageModal(false);
                }}
              >
                <Image
                 src={img.url} 
                 alt="uploaded" 
                 className="w-full h-24 object-cover rounded" />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center flex flex-col items-center gap-2">
              <p className="text-sm text-gray-500">No images uploaded yet</p>
            </div>
          )}
        </div>

     

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setUploading(true);

            const formData = new FormData();
            formData.append("file", file);

            try {
              const res = await fetch("/api/uploads", {
                method: "POST",
                body: formData,
              });
              if (!res.ok) throw new Error("Upload failed");
              const result = await res.json();
              setValue("coverImage", result.url);
              toast.success("Image uploaded!");
              refetchImages();
              setShowImageModal(false);
            } catch (err: any) {
              toast.error(err.message || "Upload error");
            } finally {
              setUploading(false);
            }
          }}
        />
      </div>
    </div>
  );
}
