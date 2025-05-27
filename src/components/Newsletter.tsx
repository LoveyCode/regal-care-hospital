"use client";

import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

export default function Newsletter() {
  return (
    <div className="w-full">
      {/* Newsletter Subscription Bar */}
      <div className="w-full bg-blue-300 text-white flex flex-col 2xl:flex-row items-center justify-between px-6 sm:px-12 md:px-20 lg:px-28 2xl:px-32 py-12 2xl:py-32 space-y-6 2xl:space-y-0">
        <div className="text-center 2xl:text-left">
          <div className="flex flex-col 2xl:flex-row justify-center 2xl:justify-start items-center gap-4 text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
            <Mail className="text-white w-8 h-8 sm:w-10 sm:h-10" />
            Subscribe to our Newsletter
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto 2xl:mx-0">
            Stay in touch with us to get latest news and special offers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full 2xl:w-auto gap-4">
          <input
            type="email"
            placeholder="Your Email Address"
            className="flex-1 px-4 py-3 sm:py-4 sm:px-6 text-base sm:text-xl rounded-md text-dark-200 bg-white"
          />
          <button className="text-base sm:text-xl bg-blue-600 px-4 py-3 sm:px-6 sm:py-4 rounded-md hover:bg-white hover:text-blue-600 transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="w-full bg-blue-600 text-white px-6 sm:px-12 md:px-20 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex items-start gap-4">
          <MapPin className="mt-1 text-white w-8 h-8 sm:w-10 sm:h-10" />
          <div>
            <h3 className="font-bold text-xl sm:text-2xl">Address</h3>
            <p className="text-base sm:text-xl mt-2">23 Ronke Jade Street, Lagos Island</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Phone className="mt-1 text-white w-8 h-8 sm:w-10 sm:h-10" />
          <div>
            <h3 className="font-bold text-xl sm:text-2xl">Call Us</h3>
            <p className="text-base sm:text-xl mt-2">
              09014568790, 04067839267, 01034658945
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Mail className="mt-1 text-white w-8 h-8 sm:w-10 sm:h-10" />
          <div>
            <h3 className="font-bold text-xl sm:text-2xl">Email Us</h3>
            <p className="text-base sm:text-xl mt-2">info@regalcare.com</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t-4 border-zinc-700 w-full" />

      {/* Footer */}
      <div className="w-full bg-blue-300 text-white flex items-center justify-center py-6 gap-3 sm:gap-4 text-base sm:text-xl">
        <ShieldCheck className="cursor-pointer text-white w-6 h-6 sm:w-8 sm:h-8" />
        <span className="font-medium">Privacy Policy</span>
      </div>
    </div>
  );
}
