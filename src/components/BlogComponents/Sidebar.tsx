"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  PlusCircle,
  FolderOpen,
  MessageSquare,
  Archive,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const blogItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "All Posts", path: "/dashboard/blogActions/allPost" },
  { icon: PlusCircle, label: "Create Post", path: "/dashboard/blogActions/createPost" },
  { icon: FolderOpen, label: "Categories", path: "/dashboard/postCategories" },
  { icon: MessageSquare, label: "Comments", path: "/dashboard/postComments" },
  { icon: Archive, label: "Archives", path: "/dashboard/archives" },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden bg-mode"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 bg-sidebar transition-transform duration-300 lg:sticky lg:translate-x-0 bg-zinc-100 dark:bg-zinc-900 text-dark-300 dark:text-zinc-200",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
            <h2 className="text-lg font-semibold text-sidebar-foreground">
              Admin Panel
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {blogItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>


        </div>
      </aside>
    </>
  );
};
export default Sidebar;