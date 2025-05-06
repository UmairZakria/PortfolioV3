import React from 'react';
import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { MoveRight } from 'lucide-react';
import Word2 from './Word2';
import Greeting from './Greeting';
import Word from './Word';
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const sectionRef = useRef(null); 
    const triggerRef = useRef(null); 
    const vidref = useRef(null); 

    useGSAP(() => {
        const section = sectionRef.current;
        const trigger = triggerRef.current;

        const numChildren = section.children.length;
        const containerWidth = numChildren * 100;
        section.style.width = `${containerWidth}vw`;

       
        const scrollWidth = section.scrollWidth - window.innerWidth;

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

        gsap.set('.title2', { opacity: 0 });
        gsap.to('.title2', {
            opacity: 1,
            scrollTrigger: {
                trigger: '.title2',
                start: 'left 80%', 
                end: 'left 20%',
                scrub: true,
                toggleActions: 'play none none reverse',
            },
        });
    }, []);

    return (
        <>
            <div id="Home" ref={triggerRef} className="relative h-screen w-full overflow-hidden">
                <motion.video
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
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
                    <motion.div
                        initial={{ opacity: 0, y: 100, x: -30 }}
                        whileInView={{ x: 0, opacity: 1, y: 0, transition: { delay: 0.5, duration: 1 } }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="section h-screen w-screen md:w-full  overflow-hidden flex flex-col justify-evenly  relative gap-10  container mx-auto py-[100px] "
                    >
                        <div className='absolute hidden lg:block left-1/2 bottom-5 font-Raleway hover:text-white -translate-x-1/2 text-sm text-gray-400'>
                            Scroll Down
                            
                        </div>
                            <h3 className='text-sm absolute right-5 bottom-16 lg:bottom-5  text-gray-300'><span className='font-brittany text-3xl font-light'>Socials / <a href="https://www.linkedin.com/in/umair-zakria-67477b33a/" target='_blank' className='hover:text-white'>li</a> / <a href="https://github.com/UmairZakria" target='_blank' className='hover:text-white'>git</a> </span> </h3>

                        <div  className=" flex lg:px-0 px-2p 76 justify-between">
                            <Greeting />
                            {/* <h3 className='text-sm text-gray-300'>Socials <span>/ li / git  </span></h3> */}
                            <div className=''>

                            <ul className=' w-[200%] space-y-2  text-gray-300 text-[14px] xl:text-[16px] flex flex-col '>
                                {/* <hr className=' text-gray-500 '/> */}
                                <li className='border-b-[1px] border-gray-500 hover:text-white transition-all duration-200 ease-in-out'>Website Design</li>
                                <li className='border-b-[1px] border-gray-500 hover:text-white transition-all duration-200 ease-in-out'>UI Development</li>
                                <li className='border-b-[1px] border-gray-500 hover:text-white transition-all duration-200 ease-in-out' >API Design</li>
                                {/* <hr className='text-gray-500  '/> */}


                            </ul>
                            </div>



                        </div>
                        <div className="font-Raleway px-2 lg:px-0  text-4xl lg:w-[78%] w-screen space-y-3">
                            <h2 className=" pl-1 text-[12px] xl:text-[20px] font-Raleway text-gray-400 " >Hi there this is <br /><span className='text-[16px] xl:text-[24px] font-Goldman hover:text-white transition-all duration-200 ease-in-out'><span className='text-white '>Umair</span> Zakria</span></h2>
                            <h1 className='font-extralight text-[20px] lg:text-[60px] xl:text-[80px]'>
                            Transforming Ideas into Powerful Digital Solutions.
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
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div
                        initial={{ y: 50 }}
                        whileInView={{ y: 0, transition: { delay: 1.3, duration: 0.6 } }}
                        className="section title2 h-screen w-screen flex items-center justify-center"
                    >
                        <h1 className="lg:text-7xl text-[20px]  xl:text-8xl font-extralight font-Raleway text-center text-4xl w-[78%]">
                            Elevate Your Business with Cutting-Edge Tech.
                        </h1>
                    </motion.div>

                    {/* Section 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 1 } }}
                        className="section h-screen w-screen flex items-center justify-center"
                    >
                        <h1 className="lg:text-7xl text-[20px]  xl:text-8xl font-extralight font-Raleway text-center text-4xl w-[78%]">
                            Your Vision, Our Expertise, One Future.
                        </h1>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Hero;