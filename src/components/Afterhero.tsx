import React, { ReactNode } from "react";

type PageDivideProps = {
  title: ReactNode;
  icon?: ReactNode;
};

const Afterhero = ({ title, icon }: PageDivideProps) => {
  return (
    <div className="relative w-full h-40 bg-yellow-600">
      {/* Arrow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 
      border-l-[40px] border-r-[40px] border-t-[40px] 
      border-l-transparent border-r-transparent border-t-white"
      />

      {/* Content below the arrow */}
      <div className="flex gap-3 p-5 pt-12 justify-center items-center">
        <div>{icon}</div>
        <div >{title}</div>
      </div>
    </div>
  );
};

export default Afterhero;
