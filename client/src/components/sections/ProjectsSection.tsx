import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ui/project-card';
import { projects } from '@/data/constants';

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-16 md:py-24 bg-gradient-to-b from-background/95 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-medium mb-1">My Work</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Recent <span className="text-primary">Projects</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mt-4">
            Here are some of the projects I've worked on recently. Each project represents a unique challenge and solution.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              View All Projects
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
