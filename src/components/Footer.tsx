import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="  bg-zinc-100 w-full dark:bg-zinc-900 text-dark-300 dark:text-zinc-200  py-40">
      {/* Logo Section */}
      <div className="flex w-full justify-center">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="Regal Care Logo"
          height={1000}
          width={1000}
          className=" h-16 lg:h-28 w-auto"
        />
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-500 my-20 w-full"></div>

      {/* Copyright */}
      <div className="text-center text-lg md:text-xl font-medium">
        © 2025 Regal Care Hospital | Powered by Regal Care Hospital
      </div>
    </footer>
  );
};

export default Footer;
