import { ReactNode } from "react";
import { ChevronDown } from 'lucide-react';

interface SectionHeadingProps {
  title: ReactNode;
  className?: string;
}

const SectionHeading = ({ title, className = '' }: SectionHeadingProps) => {
  return (
   <div className={`text-center my-8 px-4 ${className}`}>
  {title}

  <div className="flex items-center justify-center gap-2 mt-4">
    <div className="w-24 sm:w-32 border-t-4 border-blue-600" />
    <ChevronDown className="mx-2 w-6 h-6 text-red-400 font-extrabold" strokeWidth={3} />
    <div className="w-24 sm:w-32 border-t-4 border-blue-600" />
  </div>
</div>

  );
};





export default SectionHeading;
