import React, { useState } from "react";
import { Copyright } from "lucide-react"
const Footer2 = () => {
    const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" });

    const handleMouseMove = (e) => {
        // Get container dimensions
        const rect = e.currentTarget.getBoundingClientRect();
        // Calculate position relative to the container
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePosition({ x: `${x}px`, y: `${y}px` });
    };

    return (
        <>
            <div
                className="min-h-[50vh]  flex items-center justify-center relative "
                onMouseMove={handleMouseMove}
            >
                <div
                    className="text-[100px] lg:text-[200px] font-Karla   font-bold text-white"
                    style={{
                        WebkitMaskImage: `radial-gradient(circle 100px at ${mousePosition.x} ${mousePosition.y}, black 30%, transparent 100%)`,
                        maskImage: `radial-gradient(circle 100px at ${mousePosition.x} ${mousePosition.y}, black 30%, transparent 100%)`,
                    }}
                >
                    Umair
                </div>
            </div>
            <div className="bg-black h-[40px] w-full font-Montserrat flex items-center justify-evenly">
                <div className="flex items-center gap-2">

                    <Copyright className='text-green' size={14} />  <span className='text-green'>2025 <span className="font-Goldman">EdgeSmart</span></span> <span className='text-xs '>All Rights Reserved.</span>
                </div>
                <div className='flex items-center gap-3 flex-wrap '>
                    <p className='text-xs text-green '>  Designed in <span className="font-Goldman">Lights and Shadows</span> </p>
                    <a href='https://www.linkedin.com/in/maryam-fatima-rajput-91538925a/' target='_blank' className='flex items-center gap-2 hover:border-b pb-[1px] transition-all duration-300 ease-in-out  cursor-pointer  !border-green'>


                    </a>
                </div>

            </div>
        </>

    );
};

export default Footer2;