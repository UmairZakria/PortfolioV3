import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { MoveRight } from 'lucide-react';
import Word3 from './Word3';
import Greeting from './Greeting';
import Word from './Word';

import { useTopLayer } from './Dlayers'

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ anidone }) => {
    const layer = useTopLayer(['Home', 'welcome'])
    const contref = useRef(null)
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const vidref = useRef(null);

    useGSAP(() => {

        if (anidone) {
            const twelcome = gsap.timeline()
            twelcome.to('.section1', { opacity: 1, duration: 0.6 }, 'label-bc')
                .from('.greeting', { y: -30, x: -30, opacity: 0 }, 'label-bc')
                .from('.greeting1', { y: -25, opacity: 0, delay: 0.5, duration: 0.4 }, 'label-bc')
                .from('.greeting2', { y: -25, opacity: 0, delay: 0.3, duration: 0.4 }, 'label-bc')
                .from('.greeting3', { y: -25, opacity: 0, delay: 0.2, duration: 0.4 }, 'label-bc')
                .from('.socials', { opacity: 0, y: 100, duration: 0.7 }, 'label-bc')
                .from('.title1', { y: 15, opacity: 0, duration: 1 }, 'label-bc')
                .from('.title2', { y: -15, scale: 1.1, opacity: 0, duration: 0.9 }, 'label-bc')
            twelcome.play()

        }
    }, [anidone]);

    useGSAP(() => {
        const section = sectionRef.current;
        const trigger = triggerRef.current;

        const numChildren = section.children.length;
        const containerWidth = numChildren * 100;
        section.style.width = `${containerWidth}vw`;

        const scrollWidth = section.scrollWidth - window.innerWidth;
        gsap.set(contref.current, { opacity: 0 });

        gsap.to(section, {
            x: -scrollWidth,
            ease: 'none',
            scrollTrigger: {
                trigger: trigger,
                start: 'top top',
                end: () => `+=${scrollWidth}`,
                scrub: 0.1,
                pin: true,
                anticipatePin: 1,
                snap: {
                    snapTo: 1 / (numChildren - 1),
                    duration: { min: 0.5, max: 0.5 },
                    ease: 'power1.inOut',
                    mandatory: true,
                },
            },
        });
    }, [])
    useEffect(() => {
        if (vidref.current) {
            vidref.current.playbackRate = 0.5;
        }
    }, []);


    return (

        <>

            <div id="Home" ref={triggerRef} className="relative h-screen w-full overflow-hidden">


                <motion.video
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: anidone ? 1 : 0, transition: { delay: 0.2, duration: 1 } }}
                    ref={vidref}
                    src="/bg1.mp4"

                    muted
                    loop
                    autoPlay
                    className="fixed h-full w-full object-cover origin-center"
                />

                {/* Horizontal Scroll Container */}
                <div
                    ref={sectionRef}
                    className="absolute bg-[#0000007e] backdrop-blur-lg inset-0 h-full flex"
                >
                    {/* Section 1 */}
                    <div
                        // ref={contref}
                        // initial={{ opacity: 0, y: 100, x: -30 }}
                        // whileInView={{ x: 0, opacity: 1, y: 0, transition: { delay: 0.5, duration: 1 } }}
                        // viewport={{ once: false, amount: 0.3 }}
                        className="section1 opacity-0 h-screen w-screen md:w-full  overflow-hidden flex flex-col justify-evenly  relative gap-10  container mx-auto  pt-[50px] "
                    >
                        {/* <div className='absolute hidden lg:block left-1/2 bottom-5 font-Raleway hover:text-white -translate-x-1/2 text-xs text-gray-400'>
                            Scroll Down

                        </div> */}
                        <h3 className='socials text-sm absolute  right-5 bottom-16 lg:bottom-5  text-gray-300'><span className='font-brittany text-3xl font-light'>Socials / <a href="https://www.linkedin.com/in/umair-zakria-67477b33a/" target='_blank' className='hover:text-white'>li</a> / <a href="https://github.com/UmairZakria" target='_blank' className='hover:text-white'>git-Hub</a> </span> </h3>

                        <div className=" flex lg:px-0 px-2  76 justify-between">
                            <span className='greeting'>

                                <Greeting />
                            </span>
                            {/* <h3 className='text-sm text-gray-300'>Socials <span>/ li / git  </span></h3> */}
                            <div className=''>

                                <ul className=' w-[200%] space-y-2  text-gray-300 text-[14px] uppercase font-Karla  xl:text-[16px] flex flex-col '>
                                    {/* <hr className=' text-gray-500 '/> */}
                                    <span className='greeting1 border-b-[1px] border-gray-500 hover:text-white '><Word>Website&nbsp;Design</Word></span>
                                    <li className='greeting2 border-b-[1px] border-gray-500 hover:text-white '><Word>UI&nbsp;Development</Word></li>
                                    <li className='greeting3 border-b-[1px] border-gray-500 hover:text-white ' ><Word>API&nbsp;Design</Word></li>
                                    {/* <hr className='text-gray-500  '/> */}


                                </ul>
                            </div>



                        </div>
                        <div className=" font-Raleway px-2 lg:px-0  text-4xl lg:w-[78%] w-screen space-y-3">
                            <h2 className="title2 lg:pl-1 text-[10px] xl:text-[15px] font-Goldman text-gray-400 " >Hi there this is <br /><span className='text-[18px] xl:text-[24px] font-Montserrat    hover:text-white transition-all duration-200 ease-in-out'><span className='text-white '>Umair</span> Zakria</span></h2>
                            <h1 className='title1  font-Montserrat font-extralight text-shadow-lg text-shadow-sky-300 text-[30px] lg:text-[60px] xl:text-[70px] leading-normal'>
                                Transforming <span className='animate-pulse'>Ideas</span> into <span className="animate-pulse">Powerful</span> Digital <span className='animate-pulse'>Solutions</span>.
                            </h1>
                        </div>
                        {/* <button className="bg-white absolute bottom-10 hover:bg-transparent hover:text-white transition-all cursor-pointer duration-500 ease-in-out border flex items-center gap-4 text-black !border-white px-6 py-2 rounded-full text-lg">
                            Let's Start
                            <Word2>
                                <span>
                                    <MoveRight />
                                </span>
                            </Word2>
                        </button> */}
                    </div>

                    {/* Section 2 */}
                    <motion.div
                        initial={{ y: 50 }}
                        whileInView={{ y: 0, transition: { delay: 1.3, duration: 0.6 } }}
                        className="section title2 h-screen w-screen flex items-center justify-center"
                    >
                        <h1 className="lg:text-7xl text-[30px] leading-12 md:leading-normal   font-extralight font-Raleway text-center text-4xl w-[78%]">
                            Elevate Your Business with Cutting-Edge Tech.
                        </h1>
                    </motion.div>

                    {/* Section 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 1 } }}
                        className="section h-screen w-screen flex items-center justify-center"
                    >
                        <h1 className="lg:text-7xl text-[30px]  leading-12 md:leading-normal  xl:text-7xl font-extralight font-Raleway text-center text-4xl w-[78%]">
                            Your Vision, Our Expertise, One Future.
                        </h1>
                    </motion.div>
                </div>



            </div>
        </>


    );
};

export default Hero;