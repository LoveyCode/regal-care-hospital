"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🧠 On mount, check if cookie exists via API

useEffect(() => {
  const checkAuth = async () => {
    setLoading(true); // ✅ move this to the start
    try {
      const res = await fetch("/api/dashboard/auth/verify", {
        credentials: "include",
      });

      const data = await res.json(); // ✅ always parse JSON
      setIsAuthenticated(data.authenticated || false);
    } catch (err) {
      console.error("Auth check failed:", err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // ✅ always stop loading after completion
    }
  };

  checkAuth();
}, []);


  // ✅ Login using your Next.js API
  const login = async (username: string, password: string) => {
    try {
      const res = await fetch("/api/dashboard/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Important: allows cookies to be set
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Invalid credentials");
        throw new Error(err.error || "Invalid credentials");
      }

      toast.success("Login successful!");
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    }
  };

  // ✅ Logout by clearing cookie via API
  const logout = async () => {
    try {
      await fetch("/api/dashboard/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
      router.push("/dashboard/login");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
