"use client"; // <- THIS MAKES IT A CLIENT COMPONENT
import { toast } from "sonner";

interface Props {
  slug: string;
}

export default function CommentForm({ slug }: Props) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch(`/api/comments/${slug}`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast.success("Comment submitted and awaiting approval");
      form.reset();
    } else {
      toast.error("Failed to submit comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <input
        type="text"
        name="commenterName"
        placeholder="Your Name"
        className="w-full p-3 rounded border bg-white dark:bg-zinc-800"
        required
      />

      <textarea
        name="content"
        placeholder="Write your comment..."
        className="w-full p-3 rounded border bg-white dark:bg-zinc-800"
        rows={4}
        required
      />

      <button
        type="submit"
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        Post Comment
      </button>
    </form>
  );
}
