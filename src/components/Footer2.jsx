import React, { useState } from "react";
import { Copyright } from "lucide-react";

const Footer2 = () => {
  // const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" });

  // const handleMouseMove = (e) => {
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   const x = ((e.clientX - rect.left) / rect.width) * 130;
  //   const y = ((e.clientY - rect.top) / rect.height) * 130;

  //   setMousePosition({ x: `${x}%`, y: `${y}%` });
  // };


  return (
    <>
      {/* <div
        className="min-h-[50vh]   flex items-center justify-center relative bg-black"
        onMouseMove={handleMouseMove}
      >
        <div
          className="text-[100px] hidden lg:text-[200px] font-Karla font-bold text-white"
          style={{
            WebkitMaskImage: `radial-gradient(circle 100px at ${mousePosition.x} ${mousePosition.y}, black 30%, transparent 100%)`,
            maskImage: `radial-gradient(circle 100px at ${mousePosition.x} ${mousePosition.y}, black 30%, transparent 100%)`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
        >
          Umair
        </div>
      </div> */}

    <div className="h-[300px] w-full"></div>

      <div className="bg-black h-auto py-2  w-full font-Montserrat flex items-center justify-evenly">
        <div className="flex items-center gap-2">
          <Copyright className="text-green" size={13} />
          <span className="text-green text-sm">
            2025 
          </span>
          <span className="text-xs">All Rights Reserved.</span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-xs text-green">
            <span className="font-brittany text-4xl md:text-5xl ">umair zakria</span>
          </p>
        </div>
      </div>

    </>
  );
};

export default Footer2;
