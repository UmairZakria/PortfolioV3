import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const DURATION = 0.6;
const STAGGER = 0;
const DELAY = 0.1; // 10-second delay between animations

const Word2 = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px" }); // Detects viewport entry
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let interval;
    if (isInView) {
      setAnimate(true);
      interval = setInterval(() => {
        setAnimate((prev) => !prev); // Toggle animation to restart it
      }, (DURATION + STAGGER * children.length) * 1000 + DELAY * 1000); // Animation duration + delay
    } else {
      clearInterval(interval);
      setAnimate(false);
    }

    return () => clearInterval(interval);
  }, [isInView, children.length]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      whileHover={"animated" }
      className="relative block my-1 overflow-hidden whitespace-nowrap"
      style={{ lineHeight: 0.75 }}
    >
      <div>
        {/* {children.split("").map((l, i) => ( */}
          <motion.span
            variants={{
              initial: { x: 0 },
              animated: { x: "100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER ,
            }}
            className="inline-block"
            key={children}
          >
            {children}
          </motion.span>
        {/* ))} */}
      </div>
      <div className="!absolute pt-[1px] !inset-0">
        {/* {children.split("").map((l, i) => ( */}
          <motion.span
            variants={{
              initial: { x: "-100%" },
              animated: { x: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER,
            }}
            className="inline-block"
            key={children}
          >
            {children}
          </motion.span>
        {/* ))} */}
      </div>
    </motion.div>
  );
};

export default Word2;
