// import './style.css'
import { useEffect, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import gsap from 'gsap';

export default function Reviews() {

    const plane1 = useRef(null);
    const plane2 = useRef(null);
    const plane3 = useRef(null);
    let requestAnimationFrameId = null;
    let xForce = 0;
    let yForce = 0;
    const easing = 0.08;
    const speed = 0.01;

    const manageMouseMove = (e) => {
        const { movementX, movementY } = e
        xForce += movementX * speed;
        yForce += movementY * speed;

        if (requestAnimationFrameId == null) {
            requestAnimationFrameId = requestAnimationFrame(animate);
        }
    }

    const lerp = (start, target, amount) => start * (1 - amount) + target * amount;

    const animate = () => {
        xForce = lerp(xForce, 0, easing);
        yForce = lerp(yForce, 0, easing);
        gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` })
        gsap.set(plane2.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` })
        gsap.set(plane3.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}` })

        if (Math.abs(xForce) < 0.01) xForce = 0;
        if (Math.abs(yForce) < 0.01) yForce = 0;

        if (xForce != 0 || yForce != 0) {
            requestAnimationFrame(animate);
        }
        else {
            cancelAnimationFrame(requestAnimationFrameId)
            requestAnimationFrameId = null;
        }
    }
    useGSAP(() => {
        gsap.to(plane3.current, {
            y: -window.innerHeight,
            scrollTrigger: {
                trigger: plane3.current,
                start: "top 80%",
                // end: "top 0%",
                end: `top ${-window.innerHeight}`,

                toggleActions: "play reverse play reverse",

                scrub: 1,
                // pin:true
            },
        })
        gsap.to(plane1.current, {
            y: -window.innerHeight,
            scrollTrigger: {
                trigger: plane1.current,
                start: "top 80%",
                end: `top ${-window.innerHeight}`,
                toggleActions: "play reverse play reverse",

                scrub: 1,
                // pin:true
            },
        })
        gsap.to(plane2.current, {
            y: -window.innerHeight,
            scrollTrigger: {
                trigger: plane2.current,
                start: "top 80%",
                end: `bottom ${-window.innerHeight}`,
                toggleActions: "play reverse play reverse",

                scrub: 1,
                // pin:true
            },
        })
    }, [])

    const Text = ({ name, role, img, text }) => {
        return (
            <div className={`lg:w-[340px] p-5 space-y-4 shadow-lg  overflow-hidden rounded-md relative bg-[#fdfcfc]  `}>
                <div className='absolute bg-black/30 -top-2 -right-2  p-2 rounded-full '></div>
                <p className='leading-relaxed  font-Montserrat'>

                    {text}
                </p>
                <div className='flex items-center gap-6'>
                    <img src={img} className='object-cover size-[50px] rounded-full' alt="" />
                    <div className=''>
                        <span className='text-xl '>{name}</span> <br />
                        <span className='text-gray-700'>{role}</span>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className=' bg-white text-black relative'>
            <div className='absolute top-0 left-1/2 -translate-x-1/2 text-center text-4xl lg:text-7xl'>
                <p className='text-sm uppercase font-Goldman'>testimonials</p>
                <h1>Built on Trust, Proven by Results</h1>
            </div>
            <div onMouseMove={(e) => { manageMouseMove(e) }} className='bg-white   text-black min-h-[100vh]  pb-[10vh] flex   items-center justify-center md:gap-0 gap-[5vh] md:justify-evenly flex-wrap' >


                <div ref={plane3} className='flex items-center justify-around flex-col gap-[15vh] md:gap-[30vh]' >

                    <Text name={'John Doe'} role={'CEO, Tech Innovations'} img={'https://img.icons8.com/?size=80&id=60655&format=png&color=1A1A1A'} text={'Our partnership with this team has exceeded expectations. They developed an innovative product that transformed the way we operate, offering exceptional results.'} />

                    <Text name={'Emma W. Lee'} role={'CTO, Bright Future Solutions'} img={'https://img.icons8.com/?size=100&id=60655&format=png&color=1A1A1A'} text={'They have been instrumental in transforming our business model with a unique solution. Their technical expertise and creative vision are unmatched.'} />

                </div>
                <div ref={plane2} className='flex items-center justify-around flex-col  gap-[15vh] md:gap-[40vh] xl:gap-[20vh]'>
                    <Text name={'Lily Zhang'} role={'Founder, GreenTech Labs'} img={'https://img.icons8.com/?size=100&id=60655&format=png&color=1A1A1A'} text={'The development team has been phenomenal in delivering a product that has boosted our operational efficiency. Their collaboration was key to our success.'} />
                    <Text name={'Michael R. Scott'} role={'Director, Data Solutions'} img={'https://img.icons8.com/?size=100&id=60655&format=png&color=1A1A1A'} text={'A top-notch development team. They’re always professional, delivering outstanding solutions that help our business grow. Highly recommend their work.'} />
                </div>
                <div ref={plane1} className='flex items-center justify-around flex-col gap-[15vh] md:gap-[30vh]'>

                    <Text name={'Anna White'} role={'Founder, Spark Innovations'} img={'https://img.icons8.com/?size=100&id=60655&format=png&color=1A1A1A'} text={'The team’s approach to problem-solving and design is second to none. They delivered a solution that fit our needs perfectly and helped us scale up quickly.'} />
                    <Text name={'David S. Foster'} role={'Manager, Digital Ventures'} img={'https://img.icons8.com/?size=100&id=60655&format=png&color=1A1A1A'} text={'Working with this team has been an absolute pleasure. Their technical expertise and timely delivery helped us achieve our objectives seamlessly.'} />
                </div>


            </div>
        </div>

    )
}
