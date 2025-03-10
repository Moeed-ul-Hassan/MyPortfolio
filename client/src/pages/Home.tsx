import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

const Home = () => {
  // State to track which scrollbar style to use
  const [scrollbarStyle, setScrollbarStyle] = useState<'google' | 'microsoft'>('google');
  
  useEffect(() => {
    document.title = 'Moeed ul Hassan | React & Node.js Developer';
    
    // Scroll to top on initial load
    window.scrollTo(0, 0);
    
    // Alternate between Google and Microsoft styles on scroll
    const handleScroll = () => {
      // Change scrollbar style based on page position (alternating between sections)
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Switch between Google and Microsoft styles based on which section is in view
      // Even-numbered sections will have Google style, odd-numbered will have Microsoft style
      const sectionIndex = Math.floor(scrollPosition / (windowHeight * 0.7));
      setScrollbarStyle(sectionIndex % 2 === 0 ? 'google' : 'microsoft');
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className={`min-h-screen flex flex-col custom-scroll ${
        scrollbarStyle === 'google' ? 'google-scrollbar-indicator' : 'microsoft-scrollbar-indicator'
      }`}
    >
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
