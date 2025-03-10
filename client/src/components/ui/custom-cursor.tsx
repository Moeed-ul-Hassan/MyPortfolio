import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { ChevronUp, ChevronDown } from 'lucide-react';

const CustomCursor: React.FC = () => {
  const { theme } = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [isTouchScroll, setIsTouchScroll] = useState(false);
  
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
  
  // Track wheel events to show scroll direction arrow
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout;
    let lastScrollTop = window.scrollY;
    
    const handleWheel = (e: WheelEvent) => {
      // Detect touchpad/two-finger scroll (smaller delta values typically)
      const isTouchpad = Math.abs(e.deltaY) < 10;
      setIsTouchScroll(isTouchpad);
      
      if (e.deltaY < 0) {
        setScrollDirection('up');
      } else if (e.deltaY > 0) {
        setScrollDirection('down');
      }
      
      // Reset scroll direction indicator after a short delay
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        setScrollDirection(null);
      }, 500);
    };
    
    // Alternative detection via scroll events
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      
      // If the scroll amount is small, it's likely a touchpad/two-finger scroll
      const scrollDiff = Math.abs(scrollTop - lastScrollTop);
      const isTouchpadLike = scrollDiff < 15;
      
      if (isTouchpadLike) {
        setIsTouchScroll(true);
        
        if (scrollTop < lastScrollTop) {
          setScrollDirection('up');
        } else if (scrollTop > lastScrollTop) {
          setScrollDirection('down');
        }
        
        // Reset after delay
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          setScrollDirection(null);
        }, 500);
      }
      
      lastScrollTop = scrollTop;
    };
    
    document.addEventListener('wheel', handleWheel);
    document.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('scroll', handleScroll);
      clearTimeout(wheelTimeout);
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
      {/* Regular cursor elements */}
      {!isTouchScroll || !scrollDirection ? (
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
        </>
      ) : (
        // Scroll direction arrow cursor (for two-finger/touchpad scrolling)
        <motion.div
          className="fixed z-[9999] pointer-events-none text-primary"
          animate={{
            x: position.x - 12,
            y: position.y - 12,
            scale: 1.2,
            opacity: 0.9
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28
          }}
        >
          {scrollDirection === 'up' ? (
            <ChevronUp size={24} strokeWidth={2.5} />
          ) : (
            <ChevronDown size={24} strokeWidth={2.5} />
          )}
        </motion.div>
      )}
      
      {/* Google/Microsoft style colored dots that appear on click */}
      {clicked && (
        <>
          {/* Google-like dots in their 4 colors */}
          <motion.div
            className="fixed w-3 h-3 rounded-full bg-blue-500 z-[9997] pointer-events-none dark:opacity-90"
            initial={{ 
              x: position.x - 6, 
              y: position.y - 6,
              scale: 0,
              opacity: theme === 'dark' ? 0.9 : 0.8
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
            className="fixed w-3 h-3 rounded-full bg-red-500 z-[9997] pointer-events-none dark:opacity-90"
            initial={{ 
              x: position.x - 6, 
              y: position.y - 6,
              scale: 0,
              opacity: theme === 'dark' ? 0.9 : 0.8
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
            className="fixed w-3 h-3 rounded-full bg-yellow-500 z-[9997] pointer-events-none dark:opacity-90"
            initial={{ 
              x: position.x - 6, 
              y: position.y - 6,
              scale: 0,
              opacity: theme === 'dark' ? 0.9 : 0.8
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
            className="fixed w-3 h-3 rounded-full bg-green-500 z-[9997] pointer-events-none dark:opacity-90"
            initial={{ 
              x: position.x - 6, 
              y: position.y - 6,
              scale: 0,
              opacity: theme === 'dark' ? 0.9 : 0.8
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
            className="fixed w-4 h-4 bg-[#f25022] z-[9996] pointer-events-none dark:opacity-90"
            initial={{ 
              x: position.x - 2, 
              y: position.y - 16,
              opacity: theme === 'dark' ? 0.9 : 0.8,
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
            className="fixed w-4 h-4 bg-[#7fba00] z-[9996] pointer-events-none dark:opacity-90"
            initial={{ 
              x: position.x - 2, 
              y: position.y - 16,
              opacity: theme === 'dark' ? 0.9 : 0.8,
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
            className="fixed w-4 h-4 bg-[#00a4ef] z-[9996] pointer-events-none dark:opacity-90"
            initial={{ 
              x: position.x - 2, 
              y: position.y - 16,
              opacity: theme === 'dark' ? 0.9 : 0.8,
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
            className="fixed w-4 h-4 bg-[#ffb900] z-[9996] pointer-events-none dark:opacity-90"
            initial={{ 
              x: position.x - 2, 
              y: position.y - 16,
              opacity: theme === 'dark' ? 0.9 : 0.8,
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
      {linkHovered && !isTouchScroll && (
        <motion.div
          className={`fixed rounded-full ${cursorColors.hover} z-[9997] pointer-events-none mix-blend-difference`}
          animate={{
            x: position.x - 36,
            y: position.y - 36,
            scale: 1,
            width: '72px',
            height: '72px',
            opacity: theme === 'dark' ? 0.7 : 0.6
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