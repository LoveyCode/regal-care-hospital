"use client";

import { cn } from "@/lib/utils";
import { Boxes } from "@/components/ui/background-boxes";
import Image from "next/image";

interface Props {
  title: string;
  description?: string;
  className?: string;
}

const PagesBackgroundHeader = ({ title, description, className }: Props) => {
  return (
    <section
      className={cn(
        "h-72 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center",
        className
      )}
    >
      {/* Layer 1: Static background fade */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Layer 2: Faded slanted logo on the left (responsive) */}
      <div className="absolute left-[-10px] sm:left-[-60px] md:left-[-100px] top-1/2 transform -translate-y-1/2 rotate-[-20deg] opacity-30 z-10 pointer-events-none">
        <Image
          src="/assets/icons/logo-full.svg" // Replace with your actual logo path
          alt="Background Logo"
          width={600}
          height={600}
          className="w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] h-auto"
        />
      </div>

      {/* Layer 3: Animated background boxes */}
      <Boxes />

      {/* Layer 4: Foreground content */}
      <h1 className="text-5xl lg:text-6xl font-bold relative z-20 text-center">
  {title.split(" ").map((word, index) => (
    <span
      key={index}
      className={index % 2 === 1 ? "text-blue-300" : "text-neutral-300"} // alternate colors
    >
      {word}{" "}
    </span>
  ))}
</h1>
      {description && (
        <p className="text-center mt-2 text-lg sm:text-base md:text-xl text-yellow-600 relative z-20 px-4 sm:px-0">
          {description}
        </p>
      )}
    </section>
  );
};

export default PagesBackgroundHeader;
