import React from "react";
import { Github } from "lucide-react";

function Logo({ width = "100px" }) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white border-2 border-gray-color  w-8 h-8 sm:h-10 sm:w-10 flex justify-center items-center rounded-full">
          <span className="sm:w-10px">       
            <img src="/logo.png" alt="" />
          </span>
        </div>
        <span className="text-gray-color text-[0.75rem] font-semibold">Life in Words</span>
      </div>
    </div>
  );
}

export default Logo;
