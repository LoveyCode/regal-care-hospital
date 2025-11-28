"use client";
import { useState } from "react";
import Sidebar from "@/components/BlogComponents/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
import { Menu } from "lucide-react";
import { ToasterProvider } from "@/providers/ToasterProvider";

export default function SidebarContainer({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <AuthProvider>
     
        <div className="flex flex-1 flex-col bg-zinc-100 dark:bg-zinc-900">

          {/* Mobile menu button */}
          <div className="lg:hidden p-4 border-b flex items-center">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Page content */}
          {children}
        </div>
      </AuthProvider>
    </>
  );
}
