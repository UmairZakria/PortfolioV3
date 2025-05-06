import { useEffect, useRef } from "react";

const InfinityTrail = () => {
  const pathRef = useRef(null);
  const points = useRef([]);
  const MAX_POINTS = 130; // Number of points in the trail

  useEffect(() => {
    let animationFrame;
    let progress = 0;
    const speed = 0.03;

    // Parametric equations for infinity symbol (lemniscate of Bernoulli)
    const getInfinityPoint = (t) => {
      const scale = 50;
      const cx = 150; // Center X
      const cy = 100; // Center Y
      
      const x = cx + scale * Math.cos(t) / (1 + Math.sin(t) ** 2);
      const y = cy + scale * (Math.cos(t) * Math.sin(t)) / (1 + Math.sin(t) ** 2);
      return { x, y };
    };

    const updatePath = () => {
      progress += speed;
      const newPoint = getInfinityPoint(progress);
      
      // Add new point to array
      points.current = [
        newPoint,
        ...points.current.slice(0, MAX_POINTS - 1)
      ];

      // Create smooth SVG path
      const pathData = points.current.reduce((acc, point, i) => {
        if (i === 0) return `M ${point.x},${point.y}`;
        const prev = points.current[i - 1];
        const cp = {
          x: (prev.x + point.x) / 2,
          y: (prev.y + point.y) / 2
        };
        return `${acc} Q ${prev.x},${prev.y} ${cp.x},${cp.y}`;
      }, "");

      if (pathRef.current) {
        pathRef.current.setAttribute("d", pathData);
      }

      animationFrame = requestAnimationFrame(updatePath);
    };

    // Initialize points array
    for (let i = 0; i < MAX_POINTS; i++) {
      points.current.push(getInfinityPoint(0));
    }

    updatePath();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <svg   className="border" width="50" height="50" viewBox="0 0 100 100">
      <path
        ref={pathRef}
        stroke="white"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default InfinityTrail;