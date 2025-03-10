import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { resumeUrl } from '@/data/constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [, navigate] = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 200) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="text-foreground font-heading font-semibold text-xl">
            <span className="text-primary">Portfolio</span>
          </a>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-foreground focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map(item => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className={`nav-link ${activeSection === item.id ? 'active-link' : ''} text-foreground hover:text-primary transition-colors text-sm font-medium`}
              >
                {item.label}
              </a>
            ))}
            <a 
              href={resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Resume
            </a>
          </nav>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden bg-background/95 backdrop-blur-sm border-b border-white/10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map(item => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className="block py-2 px-3 text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
              <a 
                href={resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block py-2 px-3 text-primary font-medium"
                onClick={closeMenu}
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
