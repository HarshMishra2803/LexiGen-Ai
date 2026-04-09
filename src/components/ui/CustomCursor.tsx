import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = () => setIsHovering(true);
    const handleUnhover = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    
    const interactives = document.querySelectorAll("button, a, .cursor-pointer");
    interactives.forEach(el => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleUnhover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleUnhover);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor hidden md:block"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "#22C55E" : "#1A1A1A"
        }}
        transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="custom-cursor-follower hidden md:block"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: isHovering ? 1.8 : 1,
          borderColor: isHovering ? "#22C55E" : "#1A1A1A",
          opacity: isHovering ? 0.3 : 0.6
        }}
        transition={{ type: "spring", damping: 20, stiffness: 150, mass: 0.8 }}
      />
    </>
  );
};
