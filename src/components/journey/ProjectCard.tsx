import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard: React.FC<{title:string; desc:string; tech:string[]; link:string}> = ({ title, desc, tech, link }) => {
  return (
    <motion.a
      href={link}
      whileHover={{ scale: 1.03 }}
      className="block glass p-4 sm:p-5 rounded-2xl shadow-lg transform transition border border-white/70 bg-gradient-to-br from-white/90 to-[#fff4f8] h-full flex flex-col justify-between"
    >
      <h4 className="font-semibold text-base sm:text-lg mb-2 text-[#483b5a] leading-snug">{title}</h4>
      <p className="text-[#6b5b72] text-sm mb-4 leading-relaxed">{desc}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {tech.map((t, i) => (
          <span key={i} className="text-xs px-2 py-1 bg-[#f8dfe8] text-[#7d4a62] rounded-full border border-white/80">{t}</span>
        ))}
      </div>
    </motion.a>
  );
};

export default ProjectCard;
