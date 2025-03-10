import React from 'react';
import { socialLinks } from '@/data/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-foreground font-heading font-semibold text-xl">
              <span className="text-primary">Portfolio</span>
            </a>
            <p className="text-foreground/60 mt-2 text-sm">
              © {currentYear} John Doe. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
            <nav className="flex space-x-6 mb-6 sm:mb-0">
              <a href="#home" className="text-foreground/70 hover:text-primary text-sm transition-colors">Home</a>
              <a href="#about" className="text-foreground/70 hover:text-primary text-sm transition-colors">About</a>
              <a href="#skills" className="text-foreground/70 hover:text-primary text-sm transition-colors">Skills</a>
              <a href="#projects" className="text-foreground/70 hover:text-primary text-sm transition-colors">Projects</a>
              <a href="#contact" className="text-foreground/70 hover:text-primary text-sm transition-colors">Contact</a>
            </nav>
            
            <div className="flex space-x-4">
              {socialLinks.map(link => (
                <a 
                  key={link.name}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-foreground/60 hover:text-primary transition-colors" 
                  aria-label={link.name}
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
