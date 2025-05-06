import React from 'react'
import Letwork from './CalligraphyE'
import { useEffect, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

import gsap from 'gsap';
const Footer = () => {
  useGSAP(()=>{
    gsap.to('.scrollsvg2',{
      y: -330,
      scrollTrigger: {
          trigger: '.scrollsvg2',
          start: "top 100%",
          
          end: `top 30%`,
          toggleActions: "play reverse play reverse",

          scrub: 5,
      },
  })
  },[])
  return (
    <>
    <div className=' w-full flex items-end  relative justify-center '>
      <svg className='scrollsvg2  absolute   top-[280px] md:top-1/3 left-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="black" fill-opacity="1" d="M0,64L48,74.7C96,85,192,107,288,101.3C384,96,480,64,576,69.3C672,75,768,117,864,144C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"  ></path>
      </svg>
      <div className='w-full md:w-3/4 relative z-[100] mx-auto'>

        <Letwork />
      </div>
    </div>
    </>

  )
}

export default Footer
