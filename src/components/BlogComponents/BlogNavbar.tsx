"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type Category = {
  _id: string;
  name: string;
};

export default function BlogNavbar() {
  const [open, setOpen] = useState(false);

  // ----- FETCH CATEGORIES -----
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
    refetchOnWindowFocus: false,
  });

  return (
    <nav className="w-full bg-blue-300 text-white">
      {/* ---------- TOP BAR ---------- */}
      <div className=" h-20 lg:h-5 flex items-center justify-between px-6 lg:justify-center">
        <h2 className="text-xl font-bold lg:hidden">Categories</h2>

        {/* Hamburger / Close Icon */}
        <button
          className="lg:hidden flex flex-col gap-[6px]"
          onClick={() => setOpen((prev) => !prev)}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-6 h-[3px] bg-white rounded"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-[3px] bg-white rounded"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-6 h-[3px] bg-white rounded"
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* ---------- DESKTOP NAV ---------- */}
      <ul className="hidden lg:flex gap-5 justify-center pb-4">
        {isLoading && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/loader.svg"
              alt="loader"
              width={14}
              height={14}
              className="animate-spin"
            />
            Loading...
          </div>
        )}

        {error && <p className="text-red-200">Failed to load categories</p>}

        {categories?.length > 0 &&
          categories.map((cat: Category) => (
          <li key={cat._id}>
        <Link
         href={`/blog/category/${encodeURIComponent(cat.name)}`}
          className="bg-transparent text-white text-lg px-4 py-2 hover:bg-yellow-600 transition block"
        >
          {cat.name}
        </Link>
      </li>
          ))}
      </ul>

      {/* ---------- MOBILE MENU ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-blue-400"
          >
            <ul className="flex flex-col gap-4 p-6">
              {isLoading && (
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/icons/loader.svg"
                    alt="loader"
                    width={14}
                    height={14}
                    className="animate-spin"
                  />
                  Loading...
                </div>
              )}

              {error && <p className="text-red-100">Failed to load categories</p>}

              {categories?.length > 0 &&
                categories.map((cat: Category) => (
                 
       <li key={cat._id}>
        <Link
         href={`/blog/category/${encodeURIComponent(cat.name)}`}
          className="bg-transparent text-white text-lg px-4 py-2 hover:bg-yellow-600 transition block"
        >
          {cat.name}
        </Link>
      </li>
                ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
