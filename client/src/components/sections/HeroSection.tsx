import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { socialLinks } from '@/data/constants';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.div 
            className="md:w-3/5 mb-12 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-medium mb-2">Hello, I'm</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4">
              Moeed ul <span className="text-primary">Hassan</span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground/80 mb-6">
              <span className="text-gradient">
                MERN Stack Developer
              </span>
            </h2>
            <p className="text-foreground/70 text-base md:text-lg max-w-lg mb-8">
              I build exceptional digital experiences that are fast, accessible, visually appealing, and responsive. Passionate about creating solutions that solve real-world problems.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="#contact">
                  Contact Me
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#projects">
                  View Portfolio
                </a>
              </Button>
            </div>
            <div className="flex items-center space-x-4 mt-8">
              {socialLinks.map(link => (
                <a 
                  key={link.name}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-foreground/70 hover:text-primary transition-colors" 
                  aria-label={link.name}
                >
                  <i className={`${link.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-2/5 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
              <img 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" 
                alt="Profile portrait" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/0 mix-blend-overlay"></div>
            </div>
            <motion.div 
              className="absolute -bottom-4 -right-4 md:bottom-0 md:right-0 bg-secondary/10 backdrop-blur-sm p-3 rounded-lg border border-secondary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-sm font-medium">
                <span className="text-secondary">10+</span> 
                <span className="text-foreground/80">Years of Experience</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
