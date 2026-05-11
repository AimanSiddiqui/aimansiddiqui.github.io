import React, { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import pandaGif from '../../assets/panda.gif';

const ProgressRoad: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const barRef = useRef<HTMLDivElement | null>(null);
  const pandaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!barRef.current || !pandaRef.current) return;
    const unsubscribe = scrollYProgress.onChange((v) => {
      barRef.current!.style.transform = `scaleX(${v})`;
      pandaRef.current!.style.left = `calc(${v * 100}% - 1.1rem)`;
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-10xl relative">
        <div className="relative h-4 bg-white/70 backdrop-blur-sm shadow-[0_8px_24px_rgba(234,180,200,0.18)] overflow-visible">
          <div ref={barRef} className="origin-left h-4  bg-gradient-to-r from-[#f1b4c9] via-[#f6d18d] to-[#9ad8b5] transform scale-x-0" style={{ transformOrigin: 'left' }} />
        </div>
        <div
          ref={pandaRef}
          className="absolute -top-14 left-0 h-24 w-24 transition-[left] duration-200 ease-out z-20"
          style={{ left: '0%' }}
        >
          <img src={pandaGif} alt="Panda progress marker" className="transform -scale-x-100 h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.22)] mt-8" />
        </div>
      </div>
    </div>
  );
};

export default ProgressRoad;
