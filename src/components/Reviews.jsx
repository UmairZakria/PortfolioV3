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

    const Text = ({ name, role,img,text }) => {
        return (
            <div className={`lg:w-[340px] p-5 space-y-4 bg-[#fdfcfc]  `}>
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
            <div className='absolute top-0 left-1/2 -translate-x-1/2 text-center text-7xl'>
                <p className='text-sm uppercase font-Goldman'>testimonials</p>
                <h1>Built on Trust, Proven by Results</h1>
            </div>
            <div onMouseMove={(e) => { manageMouseMove(e) }} className='bg-white contan  text-black min-h-[100vh]  pb-[10vh] flex  justify-evenly flex-wrap' >

                <div ref={plane3} className='flex items-center justify-around flex-col gap-[30vh]' >

                    <Text name={'Donkey king'} role={'Donkey CEO'} img={'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwc2ltaWxlfGVufDB8fDB8fHww'} text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptates nam omnis dignissimos voluptas eum, explicabo voluptatibus quaerat, '} />
                    {/* <Text /> */}
                    {/* <Text />/ */}

                    <Text name={'Donkey king'} role={'Donkey CEO'} img={'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwc2ltaWxlfGVufDB8fDB8fHww'} text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptates nam omnis dignissimos voluptas eum, explicabo voluptatibus quaerat, '} />
                    {/* <Text /> */}


                    {/* <Text text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptates nam omnis dignissimos voluptas eum, explicabo voluptatibus quaerat, deserunt autem dolor id ad corrupti, voluptate sequi consectetur eos! Ratione, facere!'} /> */}
                    {/* <Text /> */}
                </div>
                <div ref={plane2} className='flex items-center justify-around flex-col  gap-[40vh] xl:gap-[20vh]'>
                    {/* <Text


                        width={250}
                    /> */}
                    <Text name={'Donkey king'} role={'Donkey CEO'} img={'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwc2ltaWxlfGVufDB8fDB8fHww'}  text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptates nam omnis dignissimos voluptas eum, explicabo voluptatibus quaerat, '} />

                    {/* <Text


                        width={200}
                    /> */}
                    <Text name={'Donkey king'} role={'Donkey CEO'} img={'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwc2ltaWxlfGVufDB8fDB8fHww'}  text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptates nam omnis dignissimos voluptas eum, explicabo voluptatibus quaerat, '} />

                    {/* <Text


                        width={225}
                    /> */}
                    {/* <Text text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptates nam omnis dignissimos voluptas eum, explicabo voluptatibus quaerat, deserunt autem dolor id ad corrupti, voluptate sequi consectetur eos! Ratione, facere!'} /> */}

                </div>
                <div ref={plane1} className='flex items-center justify-around flex-col gap-[30vh]'>

                    <Text name={'Donkey king'} role={'Donkey CEO'} img={'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwc2ltaWxlfGVufDB8fDB8fHww'}  text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptates nam omnis dignissimos voluptas eum, explicabo voluptatibus quaerat, '} />
                    <Text name={'Donkey king'} role={'Donkey CEO'} img={'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwc2ltaWxlfGVufDB8fDB8fHww'}  text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptates nam omnis dignissimos volup ng elit. Non voluptates nam omnis dignissimos voluptas eum, explicabo voluptatibus quaerat, '} />
                    {/* <Text /> */}
                    {/* <Text text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptates nam omnis dignissimos voluptas eum, explicabo voluptatibus quaerat, deserunt autem dolor id ad corrupti, voluptate sequi consectetur eos! Ratione, facere!'} /> */}
                    {/* <Text /> */}
                </div>



            </div>
        </div>

    )
}
