"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/dashboard/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      <p className="text-gray-500">Checking authentication...</p>
    </div>
    );
  }

  if (!isAuthenticated) return null; // prevent flash before redirect

  return <>{children}</>;
}
