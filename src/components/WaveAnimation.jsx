import React, { useRef, useEffect, useCallback } from 'react';

const WaveAnimation = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const rafID = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const mouseLastX = useRef(0);
  const mouseLastY = useRef(0);
  const mouseDirectionX = useRef(0);
  const mouseDirectionY = useRef(0);
  const mouseSpeedX = useRef(0);
  const mouseSpeedY = useRef(0);

  // Configuration variables
  const vars = {
    totalPoints: 6,
    viscosity: 20,
    mouseDist: 80,
    damping: 0.15,
    leftColor: 'transparent',
    rightColor: 'transparent'
  };

  class Point {
    constructor(x, y, gap) {
      this.x = x;
      this.ix = x;
      this.vx = 0;
      this.y = y;
      this.iy = y;
      this.gap = gap;
    }

    move() {
      this.vx += (this.ix - this.x) / vars.viscosity;
      const dx = this.ix - mouseX.current;
      const dy = this.y - mouseY.current;

      if ((mouseDirectionX.current > 0 && mouseX.current > this.x) || 
          (mouseDirectionX.current < 0 && mouseX.current < this.x)) {
        if (Math.sqrt(dx * dx) < vars.mouseDist && Math.sqrt(dy * dy) < this.gap) {
          this.vx = mouseSpeedX.current / 8;
        }
      }

      this.vx *= (1 - vars.damping);
      this.x += this.vx;
    }
  }

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    points.current = [];
    const gap = canvas.height / (vars.totalPoints - 1);
    
    for(let i = 0; i < vars.totalPoints; i++) {
      points.current.push(new Point(window.innerWidth / 2, i * gap, gap));
    }

    renderCanvas();
  }, []);

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    context.clearRect(0, 0, canvas.width, canvas.height);

    points.current.forEach(point => point.move());

    // Draw the wave shape
    context.beginPath();
    context.moveTo(window.innerWidth / 2, 0);

    points.current.forEach((point, i) => {
      const nextPoint = points.current[i + 1];
      if(nextPoint) {
        const cx = (point.x + nextPoint.x) / 2;
        const cy = (point.y + nextPoint.y) / 2;
        context.quadraticCurveTo(point.x, point.y, cx, cy);
      }
    });

    context.lineTo(window.innerWidth, window.innerHeight);
    context.lineTo(window.innerWidth, 0);
    context.closePath();
    context.fillStyle = vars.rightColor;
    context.fill();

    rafID.current = requestAnimationFrame(renderCanvas);
  }, []);

  // Mouse handlers
  const handleMouseMove = useCallback((e) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;

    if(e.clientX > mouseLastX.current) mouseDirectionX.current = 1;
    else if(e.clientX < mouseLastX.current) mouseDirectionX.current = -1;
    else mouseDirectionX.current = 0;

    mouseLastX.current = e.clientX;
    mouseLastY.current = e.clientY;
  }, []);

  useEffect(() => {
    const mouseSpeedInterval = setInterval(() => {
      mouseSpeedX.current = mouseX.current - mouseLastX.current;
      mouseSpeedY.current = mouseY.current - mouseLastY.current;
      mouseLastX.current = mouseX.current;
      mouseLastY.current = mouseY.current;
    }, 50);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', initCanvas);

    initCanvas();

    return () => {
      clearInterval(mouseSpeedInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', initCanvas);
      cancelAnimationFrame(rafID.current);
    };
  }, [initCanvas, handleMouseMove]);

  return (
    <div className="relative h-screen w-full">
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      />
      
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 'auto',
          mixBlendMode: 'multiply',
          zIndex: 2
        }}
      >
        <path 
          fill="red" 
          d="M0,160L80,138.7C160,117,320,75,480,96C640,117,800,203,960,224C1120,245,1280,203,1360,181.3L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        />
      </svg>
    </div>
  );
};

export default WaveAnimation;