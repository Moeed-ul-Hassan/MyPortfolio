import React from 'react';

interface SkillCardProps {
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description, tags }) => {
  return (
    <div className="skill-card bg-background border border-primary/20 rounded-xl p-6 hover:border-primary/50 h-full flex flex-col">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <i className={`${icon} text-primary text-xl`}></i>
      </div>
      <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-foreground/70 mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;
