// components/LayoutShell.tsx
"use client";

import { usePathname } from "next/navigation";
import TopNav from "./TopNav";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";


export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

    const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // On first load, check if there's a saved theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }



  return (
    <>
      {pathname === "/" && <TopNav />}

       {!pathname.startsWith("/admin") && <Navbar theme={theme} onToggleTheme={toggleTheme} />}
      <main className="flex-1">{children}</main>
        {!pathname.startsWith("/admin") && <Footer />}
    </>
  );
}
