// import React from "react";
import React, { useState,useRef,useEffect } from "react";

import { MoveRight } from "lucide-react";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// import { motion } from "framer-motion";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import { motion, useMotionValue, useTransform } from "framer-motion";


const Service = () => {
  const titleRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const data = [
    {
      title: "Website Design",
      description:
        "Simple, modern layouts that focus on clarity, usability, and brand identity.",
      img: "https://cdn.dribbble.com/userupload/14656775/file/original-387452115d08470ec289a098dd992c72.png?resize=752x564&vertical=center",
    },
    {
      title: "Custom Solution",
      description:
        "Creating secure, scalable, and tailored web solutions to meet your unique business needs with modern technologies.",
      img: "/custom.png",
    },
    {
      title: "Full-Stack Web Application",
      description:
        "Developing end-to-end web applications with seamless front-end and back-end integration, tailored for performance and scalability.",
      img: "https://cdn.dribbble.com/userupload/35895022/file/original-429970a9da804b924557444a4b2c5d87.jpg?resize=752x&vertical=center",
    },
    {
      title: "E-commerce Solutions",
      description:
        "Scalable online stores designed for seamless shopping experiences and efficient management.",
      img: "https://cdn.dribbble.com/userupload/34224869/file/original-b66bfbf48ddbe37a5f061766c189edf5.png?resize=752x&vertical=center",
    },    {
      title: "WordPress Development",
      description:
        "Creating fully customized, secure, and responsive websites with theme customization, plugin development, and e-commerce integration.",
      img: "https://cdn.dribbble.com/userupload/41720954/file/original-c2d576eb55ec1d94d0ca3f7c024d36a1.png?resize=800x600",
    },   {
      title: "Backend Integration",
      description:
        "Seamless integration of APIs, databases, and third-party services with a smooth, responsive frontend experience.",
      img: "https://cdn.dribbble.com/users/1434359/screenshots/3286476/attachments/708082/backend_illustration-hd.png",
    },
  ];
  const [cursorImg, setCursorImg] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const handleMouseMove = (event) => {
    cursorX.set(event.clientX);
    cursorY.set(event.clientY);
  };

  const handleMouseEnter = (img) => {
    setCursorImg(img);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setCursorImg(null);
    setIsHovered(false);
  };

  const parentVariants = {
    hover: {
      padding: isMobile ? '10px' : '60px',
      transition: {
        // staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const childVariants = {
    initial: { opacity: isMobile ? 1 : 0 },
    hover: {
      opacity: 1,
      // y: 0,
      transition: {
        type: "tween",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const titleVariants = {
    hover: {
      fontSize: "35px",
      color: "#ffffff",
      paddingLeft: "10px",
      transition: {
        type: "tween",
        stiffness: 200,
        // damping: 10
      }
    }
  };

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
    <div id="Service" onMouseMove={handleMouseMove} className="min-h-screen space-y-[10vh] xl:space-y-[30vh] lg:space-y-[40vh]  font-Montserrat my-[50vh] px-4 xl:px-20 lg:px-15">
      {isHovered && (
        <motion.div
          className="fixed size-[100] md:size-[280px] object-contain overflow-hidden pointer-events-none z-50"
          style={{
            left: cursorX,
            top: cursorY,
            // backgroundImage: `url(${cursorImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '2%',
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration:0.5}}
        >
          <img src={cursorImg} className="w-full h-full object-center object-cover " alt="" />
        </motion.div>
      )}
      <div className="space-y-24">
        <h2 className="text-gray-400 text-2xl font-Goldman uppercase">Our Service</h2>
        <div className="flex items-center flex-wrap gap-4 justify-between">
          <h3 ref={titleRef}  className="text-5xl lg:text-7xl font-Karla font-light">
            What Service We're Offering
          </h3>
          <motion.p initial={{ opacity: 0}} whileInView={{ opacity: 1}} transition={{ delay: 0.3, duration: 0.6 }}  viewport={{once:true}} className=" md:w-1/3 xl:w-1/2 font-Karla hover:text-white uppercase text-gray-200 text-sm font-extralight leading-relaxed">
           we create innovative and high-performance digital
            solutions designed to enhance user experiences and drive growth.
          </motion.p>
        </div>
      </div>

      <div className="flex flex-col gap-[10vh]">
        {data.map((item, index) => (
          <motion.div
            key={index}
            variants={parentVariants}
            onMouseEnter={() => handleMouseEnter(item.img)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={(e) => {
              cursorX.set(e.clientX);
              cursorY.set(e.clientY);
            }}
            initial="initial"
            whileHover="hover"
            transition={{ duration: 1 }}
            className="group relative p-2 py-8   flex gap-6 flex-wrap items-center justify-end md:justify-between border-b !border-gray-300 w-full lg:p-8 h-auto overflow-hidden"
          >
            {/* Text Content */}
            <div className="relative z-10 w-full  ">
              <motion.div className="relative flex gap-6 flex-wrap items-center justify-between">
                <motion.h1
                  className="text-3xl text-white lg:text-gray-300 relative"
                  variants={titleVariants}
                >
                  {item.title}
                </motion.h1>

                {/* Description */}
                <motion.div
                  className="w-full md:w-[50%] "
                  variants={childVariants}
                >
                  <p className="text-[17px] leading-8 lg:text-lg xl:text-xl text-gray-300 lg:text-white">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            </div>

            
            {/* <motion.a
            href="#Contact"
              className="text-gray-300 p-3 border rounded-full  !border-white shrink-0"
              whileHover={{
                scale: 1.1,
                rotate: 90,
                borderColor: "#ffffff80",
                transition: { duration: 0.3 },
              }}
            >
              <MoveRight />
            </motion.a> */}


          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Service;