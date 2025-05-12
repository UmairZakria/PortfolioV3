import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight, Scale } from "lucide-react"
import { motion } from 'framer-motion'
gsap.registerPlugin(ScrollTrigger);

const About2 = () => {
    const contRef = useRef(null

    );
    const founderRef = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.utils.toArray(".text-block").forEach((el, index) => {
            gsap.from(el, {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power3.out",
                delay: index * 0.3, // Adds a slight delay for each block
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "top 60%",
                    toggleActions: "play none none reverse",
                },
            });
        });
        gsap.from('.mtitle', {
            y: 100,
            x: -20,
            opacity: 0,
            scrollTrigger: {
                trigger: '.mtitle',
                start: "top 80%",
                end: "top center",
                toggleActions: "play none none reverse"
            }
        })
        // const founder = founderRef.current;
        // const container = containerRef.current;
        // gsap.to(founder, {
        //     y: () => container.offsetHeight - founder.offsetHeight, // Moves down to the end of the container
        //     ease: "none",
        //     scrollTrigger: {
        //         trigger: container,
        //         start: "top top", // Starts animation when container reaches top
        //         end: "bottom bottom", // Stops when reaching the bottom
        //         scrub: 10,
        //         pin: true,
        //     },
        // });
        gsap.from('.foundvid',{
            scale:1.5,
            ease:'power1.inOut',
            scrollTrigger: {
                trigger: '.foundvid',
                start: "top 80%", // Starts animation when container reaches top
                end: "top 20%", // Stops when reaching the bottom
                scrub: 1,
                toggleActions: "play none none reverse",

            },  
        })

    }, []);

    return (
        <div className="bg-white text-black py-32 px-4 min-h-screen">
            <div ref={contRef} className="container mx-auto">
                <div>
                    <h1 className="mtitle text-4xl md:text-7xl font-normal font-Raleway ">
                        Our approach.
                    </h1>
                    <div className="flex items-center justify-between md:grid md:grid-cols-2 flex-wrap gap-16">
                        <hr className="text-gray-300 my-20 col-span-2" />

                        <div className="text-xl w-full md:w-1/2 font-Montserrat text-">
                            Crafting excellence, not just abundance. Quality that speaks louder than quantity.
                        </div>
                        <div className="xl:w-[65%] lg:w-[70%] w-full mx-auto text-2xl font-Karla leading-7 text-">
                            We believe in delivering excellence over excess. Every project we undertake is driven by precision, innovation, and a commitment to quality—because true impact comes from mastery, not mass production.
                        </div>

                        <hr className="text-gray-300 my-20 col-span-2" />

                        <div className="text-xl w-full md:w-1/2 font-Montserrat text-">
                            Precision that delivers, passion that resonates. You need both.
                        </div>
                        <div className="xl:w-[65%] w-full lg:w-[70%] text-2xl mx-auto font-Karla leading-7 text-">
                            True impact is a balance of precision and passion. We blend cutting-edge performance with deep emotional connection, ensuring every experience is not only powerful but also meaningful—because success isn’t just about efficiency, it’s about resonance.
                        </div>

                    </div>
                </div>
                {/* <div ref={containerRef} className="flex   gap-12  xl:px-20 h-auto my-[60vh]  relative  w-full">
                    <div className="  w-[40%]  hidden md:block">

                        <span
                            ref={founderRef}
                            className="  top-0 left-10 absolute text-xl uppercase font-Karla  px-4 py-2"
                        >
                            One Founder
                        </span>
                    </div>

                    <div className="foundimg  w-full h-full  md:relative absolute  inset-0 opacity-10 md:opacity-100  overflow-hidden   xl:justify-center ">

                        <img src="/founder.jpg" className="w-[120%] transition-all duration-500 ease-in-out  hover:scale-110 h-[85vh] object-cover object-top" alt="" />
                    </div>
                    <div className="md:px-5 space-y-10 w-full md:w-[90%] flex md:items-start items-center flex-col  justify-center px-2 ">
                        <p className="text-xl font-Montserrat text-block">"We've reimagined the agency experience cutting through the clutter to connect you directly with top tier talent. No delays, no false promises just pure strategy, creativity, and results that matter."</p>
                        <div className="space-y-1">
                            <motion.h2 initial={{opacity:0,y:20, x:-20}} whileInView={{opacity:1,y:0,x:0}} transition={{duration:1,delay:0.2}} className="text-3xl font-Raleway">Maryam Fatima</motion.h2>
                            <motion.h3 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:1,delay:0.2}}  className="text-xl font-Montserrat text-gray-600 ">Founder & Innovator </motion.h3>
                        </div>
                        <motion.div initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}} transition={{duration:1,delay:0.2}}  className="mt-[100px] group relative  w-[116px] overflow-hidden h-[30px]   ">
                            <div className="group-hover:translate-x-[-100px] flex gap-4 transition-all duration-500 ease-in-out">
                            <motion.a target="_blank" href="https://www.linkedin.com/in/maryam-fatima-rajput-91538925a" className=" items-center gap-1 text-xl border-b  inline-flex"><ArrowUpRight size={22} /> LinkedIn </motion.a>
                            <motion.a  target="_blank" href="https://www.linkedin.com/in/maryam-fatima-rajput-91538925a" className=" items-center gap-1 text-xl border-b inline-flex">LinkedIn <ArrowUpRight size={22} /></motion.a>
                 
                            </div>

                        </motion.div>


                    </div>
                </div> */}
                <div className="foundvid  h-auto my-[20vh] w-full">
                    <video src="/take1.mp4"                 
                        // muted
                        controls

                        // loop
                        // autoPlay
                        className=" h-full w-full object-fit  origin-center"
                   ></video>
            </div>
        </div>
        </div >
    );
};

export default About2;
