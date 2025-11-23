"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  slug: z.string().min(1, "Slug is required").max(200, "Slug too long"),
  excerpt: z.string().min(1, "Excerpt is required").max(500, "Excerpt too long"),
  content: z.string().min(1, "Content is required"),
  tags: z.string(),
  category: z.string().min(1, "Category is required"),
  coverImage: z.string().optional(),
  author: z.string().min(1, "Author is required"),
  published: z.boolean(),
});

type PostFormData = z.infer<typeof postSchema>;

const EditPost = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const res = await fetch(`/api/blogPosts/${slug}`, {
        method: "GET",
      });
      if (!res.ok) throw new Error("Failed to load blog post");
      return res.json();
    },
    enabled: !!slug,
  });


  const { data: categories } = useQuery({
    queryKey: ["categories"],
      queryFn: async () => {
    const res = await fetch(`/api/categories`, {
        method: "GET",
      });
    if (!res.ok) throw new Error("Failed to load blog categories");
    return res.json();
  }
});

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        tags: post.tags.join(", "),
        category: post.category,
        coverImage: post.coverImage,
        author: post.author,
        published: post.published,
      });
    }
  }, [post, reset]);

const updateMutation = useMutation({
  mutationFn: async (data: PostFormData) => {
    const tags = data.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const res = await fetch(`/api/blogPosts/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, tags }),
    });

    if (!res.ok) throw new Error("Failed to update post");

    return res.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["post", slug] });
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    toast.success("Post updated successfully");
  },
  onError: () => {
    toast.error("Failed to update post");
  },
});


  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/blogPosts/${slug}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete post");
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
      router.push("/dashboard/posts");
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });

  const onSubmit = (data: PostFormData) => {
    updateMutation.mutate(data);
  };

  const contentValue = watch("content");

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/posts")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Post</h1>
            <p className="text-muted-foreground">Update your blog article</p>
          </div>
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Post
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteMutation.mutate()}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update the basic details of your post</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} placeholder="Post title" />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" {...register("slug")} placeholder="post-slug" />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                {...register("excerpt")}
                placeholder="Brief description of the post"
                rows={3}
              />
              {errors.excerpt && (
                <p className="text-sm text-destructive">{errors.excerpt.message}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={watch("category")}
                  onValueChange={(value) => setValue("category", value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat: { _id: string; slug: string; name: string }) => (
                      <SelectItem key={cat._id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" {...register("author")} placeholder="Author name" />
                {errors.author && (
                  <p className="text-sm text-destructive">{errors.author.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                {...register("tags")}
                placeholder="react, javascript, web-development"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                {...register("coverImage")}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
            <CardDescription>Update your post content in Markdown</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="write" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="write">
                <Textarea
                  {...register("content")}
                  placeholder="Write your content in Markdown..."
                  rows={20}
                  className="font-mono"
                />
                {errors.content && (
                  <p className="mt-2 text-sm text-destructive">{errors.content.message}</p>
                )}
              </TabsContent>
              <TabsContent value="preview">
                <div className="prose prose-sm max-w-none rounded-lg border p-4 dark:prose-invert">
                  <ReactMarkdown>{contentValue || "*No content yet*"}</ReactMarkdown>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publishing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="published">Published status</Label>
                <p className="text-sm text-muted-foreground">
                  Make this post visible to readers
                </p>
              </div>
              <Switch
                id="published"
                checked={watch("published")}
                onCheckedChange={(checked) => setValue("published", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/posts")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
