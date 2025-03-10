import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  useEffect(() => {
    // Update cursor position
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if the cursor is over a clickable element
      const target = e.target as HTMLElement;
      const isLink = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('clickable');
      
      setLinkHovered(isLink);
    };
    
    // Handle mouse events
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    // Hide cursor when it leaves the window
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Remove cursor from touch devices
    if ('ontouchstart' in window) {
      setHidden(true);
    }
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);
  
  // Google/Microsoft style colors: primary color with complementary circle accents
  const cursorColors = {
    dot: 'bg-primary',
    ring: 'border-primary',
    click: 'bg-primary/30',
    hover: 'bg-primary/10'
  };
  
  // Don't render on touch devices or when hidden
  if (hidden) return null;
  
  return (
    <>
      {/* Custom cursor dot (follows exact cursor position) */}
      <motion.div
        className={`fixed w-3 h-3 rounded-full ${cursorColors.dot} z-[9999] pointer-events-none`}
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: clicked ? 0.8 : linkHovered ? 0.5 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
      
      {/* Cursor ring (follows with slight delay for tech-professional effect) */}
      <motion.div
        className={`fixed w-8 h-8 rounded-full border-2 ${cursorColors.ring} z-[9998] pointer-events-none`}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 1.2 : linkHovered ? 1.5 : 1,
          opacity: clicked ? 0.6 : linkHovered ? 0.8 : 0.6
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.8
        }}
      />
      
      {/* Google/Microsoft style colored dots that appear on click */}
      {clicked && (
        <>
          {/* Google-like dots in their 4 colors */}
          <motion.div
            className="fixed w-3 h-3 rounded-full bg-blue-500 z-[9997] pointer-events-none"
            initial={{ 
              x: position.x - 6, 
              y: position.y - 6,
              scale: 0,
              opacity: 0.8
            }}
            animate={{ 
              x: position.x - 6 + 15, 
              y: position.y - 6 - 15,
              scale: 1,
              opacity: 0
            }}
            transition={{ 
              duration: 0.6
            }}
          />
          <motion.div
            className="fixed w-3 h-3 rounded-full bg-red-500 z-[9997] pointer-events-none"
            initial={{ 
              x: position.x - 6, 
              y: position.y - 6,
              scale: 0,
              opacity: 0.8 
            }}
            animate={{ 
              x: position.x - 6 - 15, 
              y: position.y - 6 - 15,
              scale: 1,
              opacity: 0
            }}
            transition={{ 
              duration: 0.6
            }}
          />
          <motion.div
            className="fixed w-3 h-3 rounded-full bg-yellow-500 z-[9997] pointer-events-none"
            initial={{ 
              x: position.x - 6, 
              y: position.y - 6,
              scale: 0,
              opacity: 0.8
            }}
            animate={{ 
              x: position.x - 6 - 15, 
              y: position.y - 6 + 15,
              scale: 1,
              opacity: 0
            }}
            transition={{ 
              duration: 0.6
            }}
          />
          <motion.div
            className="fixed w-3 h-3 rounded-full bg-green-500 z-[9997] pointer-events-none"
            initial={{ 
              x: position.x - 6, 
              y: position.y - 6,
              scale: 0,
              opacity: 0.8
            }}
            animate={{ 
              x: position.x - 6 + 15, 
              y: position.y - 6 + 15,
              scale: 1,
              opacity: 0
            }}
            transition={{ 
              duration: 0.6
            }}
          />
          
          {/* Microsoft-like squares */}
          <motion.div
            className="fixed w-4 h-4 bg-[#f25022] z-[9996] pointer-events-none"
            initial={{ 
              x: position.x - 2, 
              y: position.y - 16,
              opacity: 0.8,
              scale: 0.2
            }}
            animate={{ 
              x: position.x - 30, 
              y: position.y - 40,
              opacity: 0,
              scale: 1
            }}
            transition={{ 
              duration: 0.5
            }}
          />
          <motion.div
            className="fixed w-4 h-4 bg-[#7fba00] z-[9996] pointer-events-none"
            initial={{ 
              x: position.x - 2, 
              y: position.y - 16,
              opacity: 0.8,
              scale: 0.2
            }}
            animate={{ 
              x: position.x + 20, 
              y: position.y - 40,
              opacity: 0,
              scale: 1
            }}
            transition={{ 
              duration: 0.5
            }}
          />
          <motion.div
            className="fixed w-4 h-4 bg-[#00a4ef] z-[9996] pointer-events-none"
            initial={{ 
              x: position.x - 2, 
              y: position.y - 16,
              opacity: 0.8,
              scale: 0.2
            }}
            animate={{ 
              x: position.x - 30, 
              y: position.y + 10,
              opacity: 0,
              scale: 1
            }}
            transition={{ 
              duration: 0.5
            }}
          />
          <motion.div
            className="fixed w-4 h-4 bg-[#ffb900] z-[9996] pointer-events-none"
            initial={{ 
              x: position.x - 2, 
              y: position.y - 16,
              opacity: 0.8,
              scale: 0.2
            }}
            animate={{ 
              x: position.x + 20, 
              y: position.y + 10,
              opacity: 0,
              scale: 1
            }}
            transition={{ 
              duration: 0.5
            }}
          />
        </>
      )}
      
      {/* Special effect for hovering over links */}
      {linkHovered && (
        <motion.div
          className={`fixed rounded-full ${cursorColors.hover} z-[9997] pointer-events-none mix-blend-difference`}
          animate={{
            x: position.x - 36,
            y: position.y - 36,
            scale: 1,
            width: '72px',
            height: '72px',
            opacity: 0.6
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;