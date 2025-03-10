import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const aboutInfoItems = [
  {
    icon: 'fas fa-graduation-cap',
    title: 'Education',
    description: 'Computer Science'
  },
  {
    icon: 'fas fa-briefcase',
    title: 'Experience',
    description: 'MERN Stack Development'
  },
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Location',
    description: 'Pakistan'
  },
  {
    icon: 'fas fa-language',
    title: 'Languages',
    description: 'English, Urdu'
  }
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="card-gradient rounded-2xl p-1">
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=700&q=80" 
                  alt="Working on laptop" 
                  className="w-full h-auto" 
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <div>
                <p className="text-primary font-medium mb-1">About Me</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  Passionate Developer & <span className="text-primary">Problem Solver</span>
                </h2>
              </div>
              
              <p className="text-foreground/70">
                I'm a MERN stack developer based in Pakistan with a passion for creating elegant, efficient, and user-friendly web applications.
                I specialize in building full-stack applications using MongoDB, Express.js, React, and Node.js.
              </p>
              
              <p className="text-foreground/70">
                My approach to development is centered around understanding the core problems that need to be solved 
                and creating solutions that are not only technically sound but also provide an exceptional user experience.
                I enjoy working on projects that make a positive impact on people's lives.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                {aboutInfoItems.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <i className={`${item.icon} text-primary`}></i>
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium text-lg">{item.title}</h3>
                      <p className="text-foreground/70 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="pt-4">
                <Button size="lg" asChild>
                  <a href="#contact">
                    Let's Connect
                    <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
