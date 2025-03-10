import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ui/project-card';
import { projects } from '@/data/constants';

const fadeIn = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-16 md:py-24 bg-gradient-to-b from-background/95 to-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1] 
          }}
        >
          <motion.p 
            className="text-primary font-medium mb-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            My Work
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Recent <span className="text-primary relative inline-block">
              Projects
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/70" 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </span>
          </motion.h2>
          <motion.p 
            className="text-foreground/70 max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Here are some of the projects I've worked on recently. Each project represents a unique challenge and solution.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={fadeIn}
              custom={index}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <ProjectCard
                image={project.image}
                title={project.title}
                description={project.description}
                tags={project.tags}
                projectUrl={project.projectUrl}
                githubUrl={project.githubUrl}
                demoUrl={project.demoUrl}
                category={project.category}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button 
            variant="outline" 
            size="lg" 
            asChild 
            className="relative overflow-hidden group"
          >
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              View All Projects
              <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/50" 
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
