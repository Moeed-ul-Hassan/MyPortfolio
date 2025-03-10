import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { socialLinks } from '@/data/constants';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04
    }
  }
};

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.div 
            className="md:w-3/5 mb-12 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="text-primary font-medium mb-2">Hello, I'm</motion.p>
            <motion.h1 
              variants={fadeInUp} 
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4"
            >
              Moeed ul <span className="text-primary relative inline-block">
                Hassan
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-1 bg-primary" 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />
              </span>
            </motion.h1>
            <motion.h2 
              variants={fadeInUp}
              className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground/80 mb-6"
            >
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                React & Node.js Developer
              </span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-foreground/70 text-base md:text-lg max-w-lg mb-8"
            >
              I build exceptional digital experiences that are fast, accessible, visually appealing, and responsive. Passionate about creating solutions that solve real-world problems.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="relative overflow-hidden group">
                <a href="#contact" className="flex items-center">
                  Contact Me
                  <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30" 
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="relative overflow-hidden group">
                <a href="#projects" className="flex items-center">
                  View Portfolio
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/50" 
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </Button>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="flex items-center space-x-4 mt-8"
            >
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={link.name}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-foreground/70 hover:text-primary transition-colors" 
                  aria-label={link.name}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + (index * 0.1) }}
                >
                  <i className={`${link.icon} text-xl`}></i>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-2/5 relative"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
              <motion.img 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" 
                alt="Profile portrait" 
                className="w-full h-full object-cover" 
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
                whileHover={{ scale: 1.05 }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/0 mix-blend-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>
            <motion.div 
              className="absolute -bottom-4 -right-4 md:bottom-0 md:right-0 bg-secondary/10 backdrop-blur-sm p-3 rounded-lg border border-secondary/20"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
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
