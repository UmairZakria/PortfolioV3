import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Word from './Word';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, MenuIcon, X } from 'lucide-react'

const Navbar = () => {
    const [selectedOption, setSelectedOption] = useState("intro");
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sections = ["Home", "Service", "AboutUs", "Contact"];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsHidden(true);
            } else if (currentScrollY < lastScrollY) {
                setIsHidden(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        const observers = [];
        sections.forEach((section) => {
            const target = document.getElementById(section);
            if (target) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) setSelectedOption(section);
                        });
                    },
                    { threshold: 0.5 }
                );
                observer.observe(target);
                observers.push(observer);
            }
        });
        return () => observers.forEach((observer) => observer.disconnect());
    }, [lastScrollY]);

    const handleNavClick = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setSelectedOption(sectionId);
            setIsMenuOpen(false); // Close menu on mobile after click
        }
    };

    return (
        <motion.div
            className='fixed top-0 left-1/2 -translate-x-[50%] container p-2 px-4 flex items-center justify-between z-[100] w-full'
            animate={{ y: isHidden ? -100 : 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
            <motion.div
                initial={{ x: -200, opacity: 0, y: -50 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center px-6 gap-4"
            >
                <div className="text-white">
                    <h1 className=" text-4xl lg:text-6xl font-brittany !mix-blend-difference ">
                        Umair zakria
                    </h1>
                </div>
            </motion.div>

            {/* Desktop Navigation */}
            <ul className='hidden md:flex bg-[black]  items-center font-Montserrat cursor-pointer gap-3 px-2 py-2 rounded-full backdrop-blur-lg text-white'>
                {sections.map((section) => (
                    <motion.li
                        key={section}
                        onClick={() => handleNavClick(section)}
                        className={`font-Karla px-4 py-[6px] rounded-full cursor-pointer hover:bg-white hover:text-black transition-all duration-300 ${
                            selectedOption === section ? "bg-[#ffffff] text-black" : "bg-[black]"
                        }`}
                    >
                        <span className="text-sm">
                            <Word>{section}</Word>
                        </span>
                    </motion.li>
                ))}
            </ul>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-full text-white bg-black "
                >
                    {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                </button>

                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-black  rounded-lg backdrop-blur-lg py-2"
                    >
                        {sections.map((section) => (
                            <div
                                key={section}
                                onClick={() => handleNavClick(section)}
                                className={`px-4 py-3 text-sm cursor-pointer text-white hover:bg-white hover:text-black transition-all ${
                                    selectedOption === section ? "bg-white !text-black" : ""
                                }`}
                            >
                                <Word>{section}</Word>
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}

export default Navbar;