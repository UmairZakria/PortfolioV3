import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight, MoveRightIcon, MoveDown } from 'lucide-react'
import { motion } from 'framer-motion'
import ImageDistortionEffect from "./WaveImage"
import SplitType from "split-type";


gsap.registerPlugin(ScrollTrigger);
const Procard = ({ category, title, image }) => {
    return (
        <motion.div initial={{ opacity: 0, }} whileInView={{ opacity: 1, transition: { delay: 0.2, duration: 1 } }} className="md:w-auto -space-y-24 lg:-space-y-6 xl:space-y-8   pb-2">
            <div className="relative overflow-hidden rounded-xl object-cover object-center
             w-full  h-[400px]">

                {/* <img className="rounded-xl object-cover transition-all ease-in-out duration-300 hover:scale-110 w-full shadow-xl h-full" src={image} alt={title} /> */}
                {/* <WaveImage imageSrc={image} /> */}
                <p className="shadow-2xl shadow-gray-900 ">

                    <ImageDistortionEffect imageUrl={image} />
                </p>

            </div>
            <div className="pl-4 ">

                <span className="p-2 uppercase text-gray-300 font-Raleway">{category}</span>
                {/* <h3 className="text-center text-gray-600 dark:text-gray-400 font-semibold"></h3> */}
                <h2 className="p-2 group text-2xl font-Montserrat transition-all duration-300 ease-in-out flex items-center gap-2   ">
                    <motion.span initial={{ opacity: 0, x: -10 }} whileInView={{ x: 0, opacity: 1 }} className=" group-hover:block hidden transition-all duration-300 ease-in-out">

                        <MoveRightIcon />
                    </motion.span>

                    {title}</h2>
            </div>


        </motion.div>
    )
}
const About = () => {
    const [y, setY] = useState(4)
    const textRef2 = useRef(null);

    const formatKey = (key) => {
        if (!key) return '';

        const formattedKey = key
            .replace(/_/g, ' ')
            .replace(/([A-Z])/g, ' $1')
            .trim();

        return formattedKey
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    const data = [
        { name: 'PixelCraft', category: "Logo", img: "https://cdn.dribbble.com/userupload/35565885/file/original-d367a7d39ab09572d890623bee842569.png?resize=1200x853&vertical=center" },
        { name: 'CreativeVision', category: "Web Design", img: "https://cdn.dribbble.com/userupload/37370306/file/original-24ea280a87b43f3c9dba71e1740af0a3.png?resize=1200x900&vertical=center" },
        { name: 'Code Nexus', category: "Web Development", img: "https://cdn.dribbble.com/userupload/40515275/file/original-dfc2d613e15f0cfe4a34f4def8a94edc.png?resize=1200x900&vertical=center" },
        { name: 'BrandFlow', category: "Logo", img: "https://cdn.dribbble.com/userupload/40490768/file/original-cca1edc6f848feb3af09c6f764ff4ade.png?resize=1200x900&vertical=center" },
        // { name: 'UI Master', category: "Web Design", img: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msMCf.img" },
        // { name: 'Design Genie', category: "Web Design", img: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msMCf.img" },
        // { name: 'Visionary UI', category: "Web Design", img: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msMCf.img" },
        // { name: 'DevMaster', category: "Web Development", img: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msMCf.img" },
    ];

    const containerRef = useRef(null);
    const headingRef = useRef(null);
    const textRef = useRef(null);
    const [Categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);
    const normalizedData = data.map(item => ({
        ...item,
        category: item.category.toLowerCase(),
    }));
    const filteredData = normalizedData.filter(item => {
        const categories = item.category
        return selectedCategory ? categories.includes(selectedCategory.toLowerCase()) : true;
    });

    useEffect(() => {
        const allCategories = data.map(item =>
            item.category.toLowerCase()
        );
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories)
    }, [])
    useGSAP(() => {

        const textContent =
            "We are a full-stack web development team focused on creating modern, responsive, and high-performing websites. From clean UI design to robust backend integration, we cover the full development lifecycle. We believe in keeping things simple, efficient, and tailored to your business goals. Whether it’s a portfolio, e-commerce platform, or a custom web app — we build with purpose.";

        textRef.current.innerHTML = textContent
            .split(" ")
            .map((word) => `<span class="inline-block scale-0 opacity-50">${word} </span>`)
            .join(" ");

        const wordElements = textRef.current.querySelectorAll("span");
        gsap.to(wordElements, {
            opacity: 1,
            scale: 1,
            y: 0,

            duration: 1.2,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                toggleActions: "play reverse play reverse",

                end: "top 0%",
                scrub: 1,
            },
        });
        gsap.to('.scrollsvg', {
            y: 330,
            scrollTrigger: {
                trigger: '.scrollsvg',
                start: "top 60%",

                end: `top 0%`,
                toggleActions: "play reverse play reverse",

                scrub: 5,
                // pin:true
            },

        })

        const split = new SplitType(textRef2.current, { types: "chars, words" });

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
                    trigger: textRef2.current,
                    start: "top 80%",
                    end: "bottom center",
                    scrub: 2,
                },
            }
        );
    }, []);
    return (
        <div className="relative">

            <div id='AboutUs' className=' min-h-screen space-y-[30vh] my-[50vh] px-4 container mx-auto w-full' >
                <div ref={containerRef} className='space-y-12'>
                    <div className="flex items-center justify-start">

                        <h2 className="text-5xl md:text-6xl" > Who We Are </h2>

                    </div>
                    <p ref={textRef} className="w-full md:w-[70%] font-Raleway text-white text-xl  leading-loose font-extralight" >

                    </p>


                </div>
                <div className="  ">
                    <div name="projects" className=" px-4 lg:px-0 min-h-screen py-12 ">
                        <div className=" space-y-18 w-full">
                            <div className="flex w-full flex-wrap gap-4 items-center  justify-between">

                                <h2 ref={textRef2} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className=" text-3xl md:text-7xl  text-white font-Montserrat">Featured Work</h2>
                                <p className="md:w-1/4  leading-loose font-Raleway font-extralight text-sm text-gray-300  " >A glimpse into the ideas we've brought to life — crafted with purpose, shaped by function, and driven by simplicity.</p>
                            </div>

                            <div className="  flex flex-wrap items-center justify-center gap-6">
                                <button onClick={() => setSelectedCategory(null)} className={`px-5 rounded-3xl shadow-lg hover:shadow-gray-500   hover:bg-white hover:text-black  ${selectedCategory === null ? "text-black bg-white shadow-gray-500 " : "shadow-gray-900 bg-secbg"
                                    }  transition-all ease-in-out duration-500   py-2 text-sm `}>All</button>
                                {
                                    Categories.map((cat, index) => (
                                        <motion.button initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} onClick={() => setSelectedCategory(cat)} key={index} className={`px-5 hover:shadow-lg rounded-3xl shadow-lg hover:shadow-gray-500   hover:bg-white hover:text-black ${selectedCategory === cat ? "text-black bg-white shadow-gray-500" : "bg-secbg shadow-gray-900 "
                                            } transition-all ease-in-out duration-500   py-2 text-sm `}>{formatKey(cat)}</motion.button>
                                    ))
                                }




                            </div>
                            <div className="grid md:grid-cols-2   lg:px-10  items-center justify-center gap-y-20 gap-x-10 lg:gap-20">
                                {filteredData.slice(0, y).map((data, index) => (

                                    <Procard key={index} title={data.name} image={data.img} category={formatKey(data.category)} />

                                ))}

                            </div>
                            <button onClick={() => { y === data.length ? setY(4) : setY(data.length) }} className="mt-6 px-6 py-3 group hover:animate-pulse hover:scale-105 shadow-lg  transition-all ease-in-out duration-300  flex gap-2 mx-auto rounded-full border !border-white text-white">
                                {y === data.length ? "Hide " : "View More"}
                                <MoveRightIcon className="" size={24} />
                            </button>
                        </div>



                    </div>





                </div>


            </div>
            <div className="scrollsvg  w-full absolute top-[100%]    ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="black" fill-opacity="1" d="M0,160L80,138.7C160,117,320,75,480,96C640,117,800,203,960,224C1120,245,1280,203,1360,181.3L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
            </div>
        </div>

    )
}

export default About
