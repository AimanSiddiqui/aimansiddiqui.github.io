import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PandaCompanion: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-30 select-none cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 120, damping: 14 }}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Panda body */}
      <motion.div
        className="relative w-20 h-34 flex flex-col items-center justify-center"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Head */}
        <motion.div className="relative">
          <div className="w-20 h-20 bg-white rounded-full relative border-2 border-gray-200 shadow-lg">
            {/* Left eye black patch */}
            <motion.div
              className="absolute top-6 left-3 w-5 h-5 bg-black rounded-full"
              animate={{ scale: [1, 0.7, 1] }}
              transition={{ duration: 0.3, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 3.2 }}
            />
            {/* Right eye black patch */}
            <motion.div
              className="absolute top-6 right-3 w-5 h-5 bg-black rounded-full"
              animate={{ scale: [1, 0.7, 1] }}
              transition={{ duration: 0.3, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 3.2 }}
            />
            {/* Eye shine */}
            <div className="absolute top-7 left-4 w-1.5 h-1.5 bg-white rounded-full" />
            <div className="absolute top-7 right-4 w-1.5 h-1.5 bg-white rounded-full" />
            {/* Nose */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1 w-1.5 h-1.5 bg-black rounded-full" />
            {/* Mouth — simple curve */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3 h-1.5 border-b-2 border-black rounded-b-full" />
          </div>
          {/* Ears */}
          <div className="absolute z-10 -top-4 left-1 w-7 h-7 bg-black rounded-full" />
          <div className="absolute z-10 -top-4 right-1 w-7 h-7 bg-black rounded-full" />
        </motion.div>

        {/* Body */}
        <motion.div
          className="mt-1 w-16 h-16 bg-white rounded-3xl shadow-md border border-gray-200 flex items-center justify-center gap-1"
          animate={{ rotateZ: [-1, 1, -1] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Arms holding bamboo */}
          <div className="absolute -left-2 top-2 w-4 h-8 bg-black rounded-full" />
          <div className="absolute -right-2 top-2 w-4 h-8 bg-black rounded-full" />

        </motion.div>

        {/* Belly spot */}
        <motion.div
          className="absolute bottom-5 w-7 h-8 bg-gray-300 rounded-full opacity-60"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Chat bubble on hover */}
      <motion.div
        className="absolute -top-20 z-10 right-0 bg-gradient-to-br from-[#d96b9d] to-[#8b6dd6] text-white text-sm font-semibold px-4 py-4 rounded-full whitespace-nowrap pointer-events-none shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 8, scale: 0.8 }}
        animate={isHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        Want to chat?
      </motion.div>
    </motion.div>
  );
};

export default PandaCompanion;
