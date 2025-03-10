import React from 'react';
import { motion } from 'framer-motion';
import SkillCard from '@/components/ui/skill-card';
import { skills } from '@/data/constants';

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

const popIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-24 overflow-hidden relative">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-20 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <motion.div 
        className="absolute bottom-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.p 
            variants={fadeInUp}
            className="text-primary font-medium mb-1"
          >
            My Expertise
          </motion.p>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-heading font-bold text-foreground"
          >
            Skills & <span className="text-primary relative inline-block">
              Technologies
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary" 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-foreground/70 max-w-2xl mx-auto mt-4"
          >
            I've worked with a wide range of technologies throughout my career. Here are some of the key skills and tools I use to bring projects to life.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={popIn}
              custom={index}
              whileHover={{ 
                y: -10, 
                transition: { duration: 0.3 } 
              }}
            >
              <SkillCard 
                icon={skill.icon} 
                title={skill.title} 
                description={skill.description} 
                tags={skill.tags} 
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Floating tech icons background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/5 w-20 h-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ 
                y: -20, 
                opacity: 0,
                scale: Math.random() * 0.5 + 0.5 
              }}
              animate={{ 
                y: 20, 
                opacity: 0.6,
                scale: Math.random() * 0.5 + 0.7,
                transition: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: Math.random() * 3 + 2
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
