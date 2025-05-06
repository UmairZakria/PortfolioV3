import React, { useEffect, useState, useRef } from 'react';
import { Draggable } from "gsap/Draggable";
import { gsap } from 'gsap';

gsap.registerPlugin(Draggable);

const Flip = () => {
    const [active, setActive] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const flipRef = useRef(null);
    const draggableInstance = useRef(null);
    
    const text = [
        
        'Future Web',
        'Designs',
        'Keep it simple',
        "Lights and Shadows",
        'Simple Unique'
    ];

    useEffect(() => {
        draggableInstance.current = Draggable.create(flipRef.current, {
            type: "x,y", 
            bounds: {
                minX: 0,
                maxX: window.innerWidth - flipRef.current.offsetWidth,
                minY: 0,
                maxY: window.innerHeight - flipRef.current.offsetHeight
            },
            inertia: true,
            edgeResistance: 0.8,
            onPress: () => setIsDragging(true),
            onDragEnd: function() {
                setIsDragging(false);
                const midX = window.innerWidth / 2;
                const midY = window.innerHeight / 2;
                const currentX = this.x + flipRef.current.offsetWidth / 2;
                const currentY = this.y + flipRef.current.offsetHeight / 2;

                let finalX, finalY;

                // Snap horizontally (left or right)
                if (currentX < midX) {
                    finalX = 0; // Snap to left
                } else {
                    finalX = window.innerWidth - flipRef.current.offsetWidth; // Snap to right
                }

                // Snap vertically (top, center, or bottom)
                if (currentY < midY - 100) {
                    finalY = 0; // Snap to top
                } else if (currentY > midY + 100) {
                    finalY = window.innerHeight - flipRef.current.offsetHeight; // Snap to bottom
                } else {
                    finalY = (window.innerHeight - flipRef.current.offsetHeight) / 2; // Center
                }

                // Smoothly animate to the final position
                gsap.to(this.target, {
                    x: finalX,
                    y: finalY,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });

        return () => {
            if (draggableInstance.current) {
                draggableInstance.current[0].kill();
            }
        };
    }, []);

    useEffect(() => {
        if (!isDragging) {
            const timer = setTimeout(() => {
                setActive(prev => (prev + 1) % text.length);
            }, 1000);
            
            return () => clearTimeout(timer);
        }
    }, [active, isDragging]);

    return (
        <div 
            ref={flipRef}
            className='fixed top-1/2 z-[500] hidden lg:block right-0 uppercase font-Goldman 
                     writing-mode-vertical-lr text-center h-auto px-2 text-xs 
                     bg-white text-black border transition-all duration-300 ease-in-out !border-white cursor-grab'
            style={{
                touchAction: 'none',
                userSelect: 'none',
                transform: 'translateY(-50%)' // Initial vertical centering
            }}
        >
            <span className='transition-all duration-300 ease-in-out'>{text[active]}</span>
        </div>
    );
};

export default Flip;