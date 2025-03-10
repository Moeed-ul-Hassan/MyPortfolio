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
    description: 'React & Node.js Development'
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

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-background to-background/95 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 100 
            }}
          >
            <div className="card-gradient rounded-2xl p-1 shadow-xl shadow-primary/10">
              <motion.div 
                className="rounded-xl overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent z-10 mix-blend-overlay"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=700&q=80" 
                  alt="Working on laptop" 
                  className="w-full h-auto" 
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <div className="space-y-6">
              <div>
                <motion.p 
                  variants={fadeInUp} 
                  className="text-primary font-medium mb-1">
                    About Me
                </motion.p>
                <motion.h2 
                  variants={fadeInUp} 
                  className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6"
                >
                  Passionate Developer & <span className="text-primary relative inline-block">
                    Problem Solver
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary" 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    />
                  </span>
                </motion.h2>
              </div>
              
              <motion.p variants={fadeInUp} className="text-foreground/70">
                I'm a React and Node.js developer based in Pakistan with a passion for creating elegant, efficient, and user-friendly web applications.
                I specialize in building full-stack applications using React and Node.js.
              </motion.p>
              
              <motion.p variants={fadeInUp} className="text-foreground/70">
                My approach to development is centered around understanding the core problems that need to be solved 
                and creating solutions that are not only technically sound but also provide an exceptional user experience.
                I enjoy working on projects that make a positive impact on people's lives.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {aboutInfoItems.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.2)" }}
                    >
                      <motion.i 
                        className={`${item.icon} text-primary`}
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                      ></motion.i>
                    </motion.div>
                    <div>
                      <h3 className="text-foreground font-medium text-lg">{item.title}</h3>
                      <p className="text-foreground/70 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="pt-4"
              >
                <Button size="lg" asChild className="relative overflow-hidden group">
                  <a href="#contact" className="flex items-center">
                    Let's Connect
                    <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30" 
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
