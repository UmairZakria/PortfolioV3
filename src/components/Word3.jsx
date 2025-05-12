import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const DURATION = 0.4;
const STAGGER = 0.2;
const DELAY = 2.5;

const Word = ({ tags = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px" });
  const [animate, setAnimate] = useState(false);
  const [currentTag, setCurrentTag] = useState(tags[0]);

  useEffect(() => {
    let interval;
    let randomInterval;

    if (isInView && tags.length > 0) {
      setAnimate(true);

      // Update displayed word randomly every second
      randomInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * tags.length);
        setCurrentTag(tags[randomIndex]);
      }, 8000);

      // Toggle animation to restart it
      interval = setInterval(() => {
        setAnimate((prev) => !prev);
      }, (DURATION + STAGGER * currentTag.name.length + DELAY) * 1000);
    }

    return () => {
      clearInterval(interval);
      clearInterval(randomInterval);
      setAnimate(false);
    };
  }, [isInView, tags]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={animate ? "animated" : "initial"}
      className="relative     !font-Raleway  overflow-hidden whitespace-nowrap"
      style={{ lineHeight: 0.75 }}
    >
      <a href={currentTag.href}  className="transition-all duration-300 ease-linear" rel="noopener  noreferrer">
        <div>
          {currentTag.name.split("").map((l, i) => (
            <motion.span
              key={`top-${i}`}
              variants={{
                initial: { y: 0 ,opacity:1},
                animated: { y: "-100%",opacity:0 },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
              style={{ display: l === " " ? "inline" : "inline-block", width: l === " " ? "0.5em" : "auto" }}
            >
              {l}
            </motion.span>
          ))}
        </div>
        <div className="!absolute  !inset-0">
          {currentTag.name.split("").map((l, i) => (
            <motion.span
              key={`bottom-${i}`}
              variants={{
                initial: { y: "100%",opacity:0 },
                animated: { y: 0 ,opacity:1},
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
              style={{ display: l === " " ? "inline" : "inline-block", width: l === " " ? "0.5em" : "auto" }}
            >
              {l}
            </motion.span>
          ))}
        </div>
      </a>
    </motion.div>
  );
};

export default Word;
