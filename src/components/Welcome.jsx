import React, { useState, useEffect } from 'react'
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion"

const Welcome = ({setAnidone}) => {
    const [done, setDone] = useState(true)
    // useEffect(() => {

    // }, [])
    useGSAP(() => {
        const tlogo = gsap.timeline({
            onComplete: () => {
                setDone(false);
            },
        });
        gsap.set('.logotext', { opacity: 1, translateX: -300 })
        gsap.set('.bigtriangle', { scale: 5, x: 0, y: 100 })
        gsap.set('html, body', { overflow: "hidden", height: '100vh' })

        gsap.set('.smalltriangle', { opacity: 0, rotate: 180 })

        tlogo.to('.bigtriangle', { scale: 1.5, x: 0, y: 0, duration: 1 })
            .to('.smalltriangle', { opacity: 1, rotate: 0, duration: 0.5 })
            .to('.logotext', { opacity: 1, translateX: 0, duration: 1 })
            .to('.logocont', { y: -100, duration: 1, delay: 1.5 })
            .to('.bar', {  scaleY: 0, opacity:0.95, transformOrigin: "top", stagger: 0.08, duration: 2, ease: 'power4.inOut' },"bar")
            .add(() => setAnidone(true),"bar+=1.7")
            
            // .to('.bar2', {  height:0, stagger: 0.2, duration: 0.4 },"-=0.5")
            
            
            .to('.maincont', { height: 0, duration: 0.1 })
            .set('#welcome', {display: 'none',})
            .set('html, body', { overflow: "auto", height: 'auto' })
            

        tlogo.play()


    }, [])


    return (
        <div id='welcome' className='relative'>
            {done &&
                <div className='maincont  h-screen bg-transparent w-full fixed  !z-[999] will-change-transform'>
                    {/* <div className='absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-8xl '>Invotion Meet Us</div> */}
                    <div className='flex'>

                        {
                            [0, 1, 2, 3, 4, 5, 6, 7, 9, 10].map((el, index) => (
                                <div className="bar bg-white h-[110vh] rounded-bl-4xl w-[40vw] md:w-[10vw] "></div>

                            ))
                        }
                    </div>
                    {/* <div className='flex absolute inset-0 -z-[2]'>

                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 9, 10].map((el, index) => (
                        <div className="bar2 bg-white h-[110vh] w-[10vw] "></div>

                    ))
                }
            </div> */}
                    <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  '>
                        <div

                            className=" overflow-hidden p-5"
                        >
                            <div className="logocont  flex items-center px-6 gap-4 ">

                                <div className="relative ">

                                    <svg

                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className="bigtriangle  text-white "
                                    >
                                        <path
                                            stroke="black"

                                            strokeWidth="2"
                                            fill="none"
                                            d="M12 2L2 17h20L12  2z"
                                        />
                                    </svg>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className="smalltriangle text-white absolute -top-1 right-2 "
                                    >
                                        <path
                                            stroke="black"

                                            strokeWidth="2"
                                            fill="none"
                                            d="M12 2L2 17h20L12  2z"
                                        />
                                    </svg>

                                </div>


                                <div className=" text-black pb-2 overflow-hidden ">
                                    <h1 className="logotext text-3xl font-Goldman  up">Umair Zakria
                                    </h1>
                                </div>
                            </div>

                        </div>

                    </div>


                </div>
            }
        </div>

    )
}

export default Welcome
