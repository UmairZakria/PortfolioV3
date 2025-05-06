import React, { useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Letwork = () => {
  const contRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const split = new SplitType(textRef.current, { types: "words, chars" });

    gsap.fromTo(
      split.words,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,

        duration: 1.2,
        ease: "power3.out",
        stagger: 0.5,
        scrollTrigger: {
          trigger: contRef.current,
          start: "top 80%",
          end: "bottom center",
          scrub: 1.5,
        },
      }
    );
  }, []);

  return (
    <div
      ref={contRef}
      className="w-full   whitespace-pre-wrap min-h-[60vh] max-h-screen text-[60px] md:text-[75px] lg:text-[160px] flex items-center justify-center font-brittany"
    >
      <div ref={textRef}>Lets Work Together</div>
    </div>
  );
};

export default Letwork;
