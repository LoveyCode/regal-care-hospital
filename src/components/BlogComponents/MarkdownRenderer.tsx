// components/MarkdownRenderer.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import "highlight.js/styles/github.css"; // optional syntax theme

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Casting fixes minor TS mismatches with className prop
  const Markdown = ReactMarkdown as unknown as React.ComponentType<{
    children: React.ReactNode;
    remarkPlugins?: any;
    rehypePlugins?: any;
    className?: string;
  }>;

  return (
     <div className="prose max-w-none">
      <Markdown>{content}</Markdown>
    </div>
  );
}
