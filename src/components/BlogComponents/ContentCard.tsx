"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { PostFormData } from "../../../types/blog";
import ReactMarkdown from "react-markdown";

interface ContentCardProps {
  register: UseFormRegister<PostFormData>;
  contentValue?: string;
}

export default function ContentCard({ register, contentValue }: ContentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content</CardTitle>
        <CardDescription>Write markdown below</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="write">
          <TabsList>
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="write">
            <textarea {...register("content")} rows={15} className="font-mono border rounded w-full p-2" />
          </TabsContent>
          <TabsContent value="preview">
            <div className="border p-4 rounded">
              <ReactMarkdown>{contentValue || "*No content yet*"}</ReactMarkdown>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
