import { useEffect, useRef } from "react";

const MouseTrail = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const points = useRef([]);
  const segments = 50;
  const mouse = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef();

  useEffect(() => {
    const move = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;

      if (points.current.length === 0) {
        points.current = Array.from({ length: segments }, () => ({
          x: event.clientX,
          y: event.clientY,
        }));
      }
    };
    

    const updatePoints = () => {
      let px = mouse.current.x;
      let py = mouse.current.y;

      return points.current.map((p, index) => {
        const newPoint = { x: px, y: py };
        const next = points.current[index + 1];

        if (next) {
          const factor = 0.35 * (1 - index / segments);
          px += (next.x - px) * factor;
          py += (next.y - py) * factor;
        }

        return newPoint;
      });
    };

    const generateSmoothPath = (pointsArray) => {
      if (pointsArray.length < 2) return "";

      let path = `M ${pointsArray[0].x} ${pointsArray[0].y}`;
      const tension = 0.4;

      for (let i = 0; i < pointsArray.length - 1; i++) {
        const p0 = i > 0 ? pointsArray[i - 1] : pointsArray[i];
        const p1 = pointsArray[i];
        const p2 = pointsArray[i + 1];
        const p3 = i + 2 < pointsArray.length ? pointsArray[i + 2] : p2;

        const cp1x = p1.x + (p2.x - p0.x) * tension;
        const cp1y = p1.y + (p2.y - p0.y) * tension;
        const cp2x = p2.x - (p3.x - p1.x) * tension;
        const cp2y = p2.y - (p3.y - p1.y) * tension;

        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
      }

      return path;
    };

    const animate = () => {
      if (points.current.length === 0) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      points.current = updatePoints();
      const pathData = generateSmoothPath(points.current);

      if (pathRef.current) {
        pathRef.current.setAttribute("d", pathData);
        pathRef.current.style.strokeWidth = `${Math.min(
          6,
          6 * (window.innerWidth / 1920)
        )}`;
      }
      // console.log("SVG Path:", pathData);

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const resize = () => {
      const ww = window.innerWidth;
      const wh = window.innerHeight;

      if (svgRef.current) {
        svgRef.current.style.width = `${ww}px`;
        svgRef.current.style.height = `${wh}px`;
        svgRef.current.setAttribute("viewBox", `0 0 ${ww} ${wh}`);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("resize", resize);
    
    resize();
    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1 1"
      className="trail fixed top-0 left-0  z-[10] pointer-events-none"
    >
      <path
        ref={pathRef}
        d=""
        stroke="white"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export default MouseTrail;