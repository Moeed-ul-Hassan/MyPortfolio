import React from 'react';
import { motion } from 'framer-motion';
import SkillCard from '@/components/ui/skill-card';
import { skills } from '@/data/constants';

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-medium mb-1">My Expertise</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Skills & <span className="text-primary">Technologies</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mt-4">
            I've worked with a wide range of technologies throughout my career. Here are some of the key skills and tools I use to bring projects to life.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillCard 
                icon={skill.icon} 
                title={skill.title} 
                description={skill.description} 
                tags={skill.tags} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
