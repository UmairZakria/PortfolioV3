import React ,{ useRef} from 'react'
// import {motion} from framermo
import { motion } from 'framer-motion'
import { ArrowUpRight, Scale } from "lucide-react"

import SplitType from "split-type";
import Word from './Word';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

const About4 = () => {
      const titleRef = useRef(null);
    
      useGSAP(()=>{
        const split = new SplitType(titleRef.current, { types: "chars, words" });
    
        gsap.fromTo(
          split.chars,
          { opacity: 0, y: 50, perspective: 1000 },
          {
            opacity: 1,
            y: 0,
            perspective: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              end: "bottom center",
              scrub: 2,
            },
          }
        );
      },[])
    return (
        <div className='bg-white  min-h-screen w-full pb-[400px] '>

            <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.3}} className='bg-black  h-screen w-full p-4 gap-10 flex flex-col justify-evenly  '>
                <h1 ref={titleRef} className='text-center text-3xl lg:text-6xl font-Raleway' >Working With Bold Name</h1>
                <div className=' container  flex items-center justify-center  mx-auto'>

                    <div className="md:px-5 space-y-14 w-full md:w-[90%] flex md:items-start items-center flex-col  justify-center px-2 ">
                        <p className="text-lg lg:text-xl font-karl transition-all duration-200 ease-in-out text-block text-gray-300 hover:text-white">"<span className='font-semibold'>Maryam Fatima</span> is a proficient Software Engineer with expertise in Machine Learning and modern technologies. I’ve worked under her direction on multiple projects, where her clear vision and strong technical leadership played a key role in delivering high-quality outcomes."</p>
                        <div className='flex flex-wrap gap-5  justify-between items-center w-full'>

                            <div className="space-y-2">
                                <motion.h2 initial={{ opacity: 0, y: 20, x: -20 }} whileInView={{ opacity: 1, y: 0, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-3xl font-Raleway">Maryam Fatima</motion.h2>
                                <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-[15px] font-Karla uppercase text-gray-300 hover:text-white "><Word>ML&nbsp;&&nbsp;Software&nbsp;Engineer</Word></motion.h3>
                            </div>
                            <div className='flex flex-row-reverse items-center gap-4'>

                                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className=" group relative  w-[113px] text-gray-300 hover:text-white overflow-hidden h-[30px]    ">
                                    <div className="group-hover:translate-x-[-100px] flex gap-4 transition-all duration-500 ease-in-out">
                                        <motion.a target="_blank" href="https://www.linkedin.com/in/maryam-fatima-rajput-91538925a" className=" items-center gap-1 text-xl border-b  inline-flex"><ArrowUpRight size={22} /> LinkedIn </motion.a>
                                        <motion.a target="_blank" href="https://www.linkedin.com/in/maryam-fatima-rajput-91538925a" className=" items-center gap-1 text-xl border-b inline-flex">LinkedIn <ArrowUpRight size={22} /></motion.a>

                                    </div>

                                </motion.div>
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className=" group relative text-gray-300 hover:text-white  w-[100px] overflow-hidden h-[30px]    ">
                                    <div className="group-hover:translate-x-[-100px] flex gap-4 transition-all duration-500 ease-in-out">
                                        <motion.a target="_blank" href="https://github.com/maryam-fati" className=" items-center gap-1 text-xl border-b  inline-flex"><ArrowUpRight size={22} /> GitHub </motion.a>
                                        <motion.a target="_blank" href="https://github.com/maryam-fati" className=" items-center gap-1 text-xl border-b inline-flex">GitHub <ArrowUpRight size={22} /></motion.a>

                                    </div>

                                </motion.div>
                            </div>

                        </div>


                    </div>
                </div>

            </motion.div>
        </div>
    )
}

export default About4
