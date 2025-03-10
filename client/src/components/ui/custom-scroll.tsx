import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { ArrowUp } from 'lucide-react';

interface CustomScrollProps {
  useNativeScroll?: boolean;
}

const CustomScroll: React.FC<CustomScrollProps> = ({ 
  useNativeScroll = false // Default to using custom scroll behavior 
}) => {
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Calculate scroll percentage
  const scrollPercentage = viewportHeight ? (scrollY / (documentHeight - viewportHeight)) * 100 : 0;
  
  // For smooth scrolling
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 20, 
    restDelta: 0.001 
  });
  
  // Transform for scroll progress bar
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);
  
  // Update scroll position and dimensions
  useEffect(() => {
    const updateScroll = () => {
      setScrollY(window.scrollY);
      setDocumentHeight(document.documentElement.scrollHeight);
      setViewportHeight(window.innerHeight);
      setScrolling(true);
      
      // Reset scrolling state after 200ms of inactivity
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setScrolling(false), 200);
    };
    
    // Initialize
    updateScroll();

    window.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);
    
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Custom scroll to top with smooth animation
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Smooth scroll behavior for all anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Override default wheel behavior for smoother scrolling
  useEffect(() => {
    // Skip custom scroll behavior if native scrolling is enabled
    if (useNativeScroll) return;
    
    // Microsoft/Google-like smooth scroll
    const smoothWheel = (e: Event) => {
      const wheelEvent = e as WheelEvent;
      // Don't interfere with horizontal scrolling
      if (Math.abs(wheelEvent.deltaX) > Math.abs(wheelEvent.deltaY)) return;

      wheelEvent.preventDefault();
      
      const delta = wheelEvent.deltaY;
      
      // Detect if it's likely a trackpad/touchpad (two-finger gesture)
      // Trackpad typically produces smaller delta values with higher frequency
      const isTouchpad = Math.abs(delta) < 10;
      
      // Adjust speed based on input device
      // Much higher speed for touchpad/trackpad, moderate for mouse wheel
      const speed = isTouchpad ? 8.0 : 1.5;
      
      // Smooth scrolling with easing
      window.scrollBy({
        top: delta * speed,
        behavior: 'smooth'
      });
    };
    
    // Only add the custom scroll behavior if useNativeScroll is false
    document.addEventListener('wheel', smoothWheel, { passive: false } as EventListenerOptions);
    
    return () => {
      document.removeEventListener('wheel', smoothWheel, { passive: false } as EventListenerOptions);
    };
  }, [useNativeScroll]);

  // Dots that appear during scrolling (like Google loading animation)
  const renderScrollIndicatorDots = () => {
    // Google colors with dark theme adjustments
    const dotColors = [
      theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500',
      theme === 'dark' ? 'bg-red-400' : 'bg-red-500',
      theme === 'dark' ? 'bg-amber-300' : 'bg-yellow-500',
      theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
    ];
    
    return (
      <motion.div 
        className="fixed right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolling ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full my-1 ${dotColors[index]}`}
            initial={{ scale: 0.5, opacity: 0.7 }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        ))}
      </motion.div>
    );
  };

  // Microsoft-style progress bar at top of page
  const renderScrollProgressBar = () => {
    return (
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
    );
  };

  // Back to top button (appears after scrolling down)
  const renderBackToTopButton = () => {
    return (
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: scrollPercentage > 20 ? 1 : 0,
          y: scrollPercentage > 20 ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp size={20} />
      </motion.button>
    );
  };

  // Section indicators (Microsoft-style dots on the right)
  const renderSectionIndicator = () => {
    // Get all sections with ids for navigation
    const [sections, setSections] = useState<HTMLElement[]>([]);
    
    useEffect(() => {
      const sectionElements = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];
      setSections(sectionElements);
    }, [documentHeight]);
    
    // Only show if there are sections with IDs
    if (sections.length === 0) return null;
    
    return (
      <motion.div 
        className="fixed right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {sections.map((section, index) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const isActive = scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight - 100;
          
          return (
            <motion.div
              key={section.id}
              className="my-2 cursor-pointer relative group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              <motion.div
                className={`w-3 h-3 rounded-full ${
                  isActive ? 'bg-primary scale-110' : 'bg-primary/30'
                } hover:bg-primary transition-all duration-300`}
                whileHover={{ scale: 1.3 }}
              />
              
              {/* Section title tooltip */}
              <motion.div 
                className="absolute right-full mr-2 top-0 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-foreground whitespace-nowrap opacity-0 translate-x-2 pointer-events-none"
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : 2
                }}
                transition={{ duration: 0.2 }}
              >
                {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
              </motion.div>
              
              {/* Hover tooltip */}
              <motion.div 
                className="absolute right-full mr-2 top-0 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-foreground whitespace-nowrap opacity-0 translate-x-2 pointer-events-none"
                initial={{ opacity: 0, x: 2 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <>
      {renderScrollProgressBar()}
      {renderScrollIndicatorDots()}
      {renderSectionIndicator()}
      {renderBackToTopButton()}
    </>
  );
};

export default CustomScroll;