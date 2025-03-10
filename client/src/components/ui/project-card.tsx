import React from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  tags: string[];
  projectUrl: string;
  githubUrl: string;
  demoUrl: string;
  category: {
    name: string;
    color: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  image, 
  title, 
  description, 
  tags, 
  projectUrl, 
  githubUrl,
  demoUrl,
  category
}) => {
  return (
    <div className="project-card bg-background rounded-xl overflow-hidden border border-primary/20 hover:border-primary/50 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden group">
        <motion.img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover" 
          whileHover={{ scale: 1.08, rotate: -1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <motion.div 
          className="absolute top-2 right-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className={`inline-block ${category.color} text-white text-xs px-2 py-1 rounded shadow-md`}>
            {category.name}
          </span>
        </motion.div>
      </div>
      <motion.div 
        className="p-6 flex flex-col flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2 relative inline-block">
          {title}
          <motion.span 
            className="absolute -bottom-1 left-0 h-0.5 bg-primary/40" 
            initial={{ width: 0 }}
            whileInView={{ width: "40%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </h3>
        <p className="text-foreground/70 mb-4 flex-grow">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <motion.span 
              key={index} 
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + (index * 0.05) }}
              whileHover={{ y: -2, backgroundColor: "rgba(var(--primary), 0.2)" }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <motion.a 
            href={projectUrl} 
            className="text-primary hover:text-primary/80 text-sm font-medium flex items-center transition-colors group"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Project</span>
            <motion.i 
              className="fas fa-arrow-right ml-1 text-xs transition-transform" 
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
            ></motion.i>
          </motion.a>
          <div className="flex items-center space-x-3">
            <motion.a 
              href={githubUrl} 
              className="text-foreground/60 hover:text-primary transition-colors" 
              aria-label="GitHub repository"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-github"></i>
            </motion.a>
            <motion.a 
              href={demoUrl} 
              className="text-foreground/60 hover:text-primary transition-colors" 
              aria-label="Live demo"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-external-link-alt"></i>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
