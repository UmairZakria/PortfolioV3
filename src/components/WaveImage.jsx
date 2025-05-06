import React, { useRef, useEffect, useState } from "react";

const ImageDistortionEffect = ({ imageUrl }) => {
  const containerRef = useRef(null);
  const filterRef = useRef(null);
  const animationFrame = useRef(null);
  const isHovering = useRef(false);
  
  // Generate a unique filter ID for each component instance
  const [filterId] = useState(() => `distortionFilter-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      if (!filterRef.current) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      filterRef.current.children[0].setAttribute(
        "baseFrequency",
        `${0.02 + 0.01 * x}, ${0.02 + 0.01 * y}`
      );
      filterRef.current.children[1].setAttribute("scale", 30 * (1 - Math.abs(x - 0.5)));
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
      if (!animationFrame.current) animate();
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      resetFilter();
    };

    const animate = () => {
      if (!isHovering.current) return;
      animationFrame.current = requestAnimationFrame(animate);
    };

    const resetFilter = () => {
      if (filterRef.current) {
        filterRef.current.children[0].setAttribute("baseFrequency", "0.02 0.02");
        filterRef.current.children[1].setAttribute("scale", "0");
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* Unique SVG filter for each component */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id={filterId} ref={filterRef}>
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.02" numOctaves="1" />
          <feDisplacementMap in="SourceGraphic" scale="0" />
        </filter>
      </svg>

      <img
        src={imageUrl}
        alt="distortion effect"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: `url(#${filterId})`, // Apply unique filter to each image
          transition: "filter 0.1s ease",
        }}
      />
    </div>
  );
};

export default ImageDistortionEffect;
