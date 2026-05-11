import React, { useState, useEffect } from 'react';
import personalInfo from '../../data/personalInfo.json';
import RealisticTree from './RealisticTree';
import MobileTree from './MobileTree';

const HeroSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStart = () => {
    const el = document.getElementById('expertise');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <header className="min-h-screen flex items-center justify-center text-center">
      <div className="relative mx-auto w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl h-[40vh] sm:h-[50vh] md:h-[65vh] lg:h-[72vh] xl:h-[78vh] overflow-visible -z-10">
        {isMobile ? <MobileTree className="absolute inset-0" /> : <RealisticTree className="absolute inset-0" />}
      </div>

      <div className="max-w-10xl absolute w-full px-4">
        <h1 className="text-10xl md:text-8xl font-extrabold mb-20 tracking-tight text-panda-cloud drop-shadow-lg">
          {personalInfo.name}
        </h1>
        <p className="text-lg text-panda-bamboo font-semibold mb-6">{personalInfo.location}</p>
        
        <button onClick={handleStart} className="px-8 py-3 rounded-full bg-gradient-to-r from-[#d96b9d] to-[#8b6dd6] text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform border border-white/20">
          Start Journey
        </button>
      </div>
    </header>
  );
};

export default HeroSection;
