import React from 'react';

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
    <div className="project-card bg-background rounded-xl overflow-hidden border border-primary/20 hover:border-primary/50 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
        <div className="absolute top-2 right-2">
          <span className={`inline-block ${category.color} text-white text-xs px-2 py-1 rounded`}>
            {category.name}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-foreground/70 mb-4 flex-grow">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <a 
            href={projectUrl} 
            className="text-primary hover:text-primary/80 text-sm font-medium flex items-center transition-colors"
          >
            <span>View Project</span>
            <i className="fas fa-arrow-right ml-1 text-xs"></i>
          </a>
          <div className="flex items-center space-x-3">
            <a 
              href={githubUrl} 
              className="text-foreground/60 hover:text-primary transition-colors" 
              aria-label="GitHub repository"
            >
              <i className="fab fa-github"></i>
            </a>
            <a 
              href={demoUrl} 
              className="text-foreground/60 hover:text-primary transition-colors" 
              aria-label="Live demo"
            >
              <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
