import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CustomScrollbar = () => {
  const thumbRef = useRef(null);
  const maxThumbMoveRef = useRef(0);
  const maxScrollRef = useRef(0);
  const isDraggingRef = useRef(false);

  const updateScrollbar = useCallback(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;

    const container = thumb.parentElement;
    const scrollbarHeight = container.getBoundingClientRect().height;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    maxScrollRef.current = Math.max(scrollHeight - clientHeight, 1);
    const scrollRatio = scrollbarHeight / scrollHeight;

    const thumbHeight = Math.max(scrollbarHeight * scrollRatio, 50);
    maxThumbMoveRef.current = scrollbarHeight - thumbHeight;

    gsap.set(thumb, { height: thumbHeight });
  }, []);

  const updateThumbPosition = useCallback(() => {
    if (!maxScrollRef.current || !thumbRef.current || isDraggingRef.current) return;
    const progress = window.scrollY / maxScrollRef.current;
    gsap.set(thumbRef.current, { y: progress * maxThumbMoveRef.current });
  }, []);

  const handleThumbMouseDown = useCallback((e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    const startY = e.clientY;
    const startScroll = window.scrollY;

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaY = e.clientY - startY;
      const scrollDelta = (deltaY / maxThumbMoveRef.current) * maxScrollRef.current;
      window.scrollTo(0, startScroll + scrollDelta);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, []);

  useEffect(() => {
    const initScrollTrigger = () => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: updateThumbPosition,
        onRefresh: () => {
          updateScrollbar();
          updateThumbPosition();
        }
      });
    };

    updateScrollbar();
    initScrollTrigger();
    updateThumbPosition();

    const onResize = () => {
      updateScrollbar();
      ScrollTrigger.refresh();
      updateThumbPosition();
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [updateScrollbar, updateThumbPosition]);

  return (
    <div className="block fixed top-[8vh] md:top-[5vh] right-0 md:right-2 w-[6px] h-[90vh] bg-[#0000004f] rounded-full z-[1000] overflow-hidden">
      <div
        ref={thumbRef}
        className="w-full bg-white rounded-full absolute top-0 cursor-pointer"
        onMouseDown={handleThumbMouseDown}
      />
    </div>
  );
};

export default CustomScrollbar;