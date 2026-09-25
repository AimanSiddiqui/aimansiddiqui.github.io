import React from 'react';
import { motion } from 'framer-motion';

type Props = { title: string; subtitle?: string; desc: string; tech: string[]; link?: string };

const ProjectCard: React.FC<Props> = ({ title, subtitle, desc, tech, link }) => {
  // Only a real link makes the card clickable
  const Card = link ? motion.a : motion.div;
  return (
    <Card
      {...(link ? { href: link, target: '_blank', rel: 'noreferrer' } : {})}
      whileHover={{ scale: 1.03 }}
      className="block glass p-4 sm:p-5 rounded-2xl shadow-lg transform transition border border-white/70 bg-gradient-to-br from-white/90 to-[#fff4f8] h-full flex flex-col justify-between"
    >
      <div>
        <h4 className="font-semibold text-base sm:text-lg text-[#483b5a] leading-snug">{title}</h4>
        {subtitle && <p className="text-xs sm:text-sm italic text-[#9a7fa6] mt-0.5">{subtitle}</p>}
        <p className="text-[#6b5b72] text-sm mt-2 mb-4 leading-relaxed">{desc}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {tech.map((t, i) => (
          <span key={i} className="text-xs px-2 py-1 bg-[#f8dfe8] text-[#7d4a62] rounded-full border border-white/80">{t}</span>
        ))}
      </div>
    </Card>
  );
};

export default ProjectCard;
