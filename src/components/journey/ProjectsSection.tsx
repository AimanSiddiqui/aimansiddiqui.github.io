import React from 'react';
import Section from './Section';
import ProjectCard from './ProjectCard';
import projects from '../../data/projects.json';

const ProjectsSection: React.FC = () => {

  return (
    <Section id="projects" title="Pit Stops">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-6 xl:gap-8">
        {projects.map((p, i) => (
          <ProjectCard key={i} {...p} />
        ))}
      </div>
    </Section>
  );
};

export default ProjectsSection;
