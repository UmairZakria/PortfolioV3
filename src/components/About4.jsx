import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitType from "split-type";

const DURATION = 0.3;
const STAGGER = 0;
const DELAY = 0.2;

const About4 = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "0px" });
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        if (ref.current) {
            const split = new SplitType(ref.current, { types: "chars", absolute: false });
            setLetters(split.chars);
        }
    }, []);

    return (
        <div className="bg-white border min-h-screen text-black flex items-center justify-center text-8xl">
            <motion.div
                ref={ref} // ✅ Attach ref to the div
                initial="initial"
                whileHover="animated"
                className="relative block my-1 border overflow-hidden whitespace-nowrap"
                style={{ lineHeight: 0.75 }}
            >
                <div>
                    {letters.map((char, i) => (
                        <motion.span
                            key={i}
                            variants={{
                                initial: { y: 0 },
                                animated: { y: "-100%" },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: "easeInOut",
                                delay: STAGGER * i,
                            }}
                            className="inline-block"
                        >
                            {char.innerText === " " ? "\u00A0" : char.innerText}
                        </motion.span>
                    ))}
                </div>
                <div className="!absolute pt-[1px] !inset-0">
                    {letters.map((char, i) => (
                        <motion.span
                            key={i}
                            variants={{
                                initial: { y: "100%" },
                                animated: { y: 0 },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: "easeInOut",
                                delay: STAGGER * i,
                            }}
                            className="inline-block"
                        >
                            {char.innerText === " " ? "\u00A0" : char.innerText}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default About4;
