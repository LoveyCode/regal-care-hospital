"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IComment } from "../../../../types/blog";
import { Button } from "@/components/ui/button";


import { Check, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Comments = () => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();


  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await fetch(`/api/comments/`);
      if (!res.ok) throw new Error("Failed to load comments");
      return res.json();
    },
  });

const approveMutation = useMutation({
  mutationFn: async (id: string) => {
    const res = await fetch(`/api/comments/byId/${id}`, {
      method: "PUT",
    });
    if (!res.ok) throw new Error("Failed to update comment");
    return res.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["comments"] });
    toast.success("Comment approved");
  },
  onError: () => {
    toast.error("Failed to approve comment");
  },
});

const deleteMutation = useMutation({
  mutationFn: async (id: string) => {
    const res = await fetch(`/api/comments/byId/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete comment");
    return res.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["comments"] });
    toast.success("Comment deleted");
    setDeleteId(null);
  },
  onError: () => {
    toast.error("Failed to delete comment");
  },
});


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Comments</h1>
        <p className="text-muted-foreground">Moderate user comments</p>
      </div>

      {isLoading ? (
        <div className="text-center">Loading comments...</div>
      ) : comments?.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-[200px] items-center justify-center">
            <p className="text-muted-foreground">No comments yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {comments?.map((comment: IComment) => (
            <Card key={comment.slug}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{comment.commenterName}</p>
                      <span className="text-sm text-muted-foreground">
                        {comment.commenterEmail}
                      </span>
                      <Badge variant={comment.approved ? "default" : "secondary"}>
                        {comment.approved ? "Approved" : "Pending"}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      On: {comment.postTitle}
                    </p>
                    <p className="text-sm">{comment.content}</p>
                    <p className="text-sm">In: {comment.postCategory}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!comment.approved && (
                 <Button
                       variant="ghost"
                        size="icon"
                        onClick={() => approveMutation.mutate(comment._id)}
                      >
                        <Check className="h-4 w-4 text-success" />
                      </Button>
                    )}
                 <Button
                   variant="ghost"
                   size="icon"
                   onClick={() => setDeleteId(comment._id)} 
                 >
                   <Trash2 className="h-4 w-4 text-destructive" />
                 </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the comment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Comments;
