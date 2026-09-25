import React, { useEffect, useRef, useState } from 'react';
import personalInfo from '../../data/personalInfo.json';
import BubbleName from './BubbleName';
import PandaSign from './PandaSign';

const HeroSection: React.FC = () => {
  // The panda climbs up while the pointer is over her or the sign; a tap on
  // touch screens brings her up for a moment.
  const [out, setOut] = useState(false);
  const tapTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(tapTimer.current), []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    setOut(true);
    window.clearTimeout(tapTimer.current);
    tapTimer.current = window.setTimeout(() => setOut(false), 2500);
  };

  return (
    <header id="hero" className="min-h-screen flex items-center justify-center text-center px-4">
      <PandaSign
        out={out}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setOut(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setOut(false)}
        onPointerDown={onPointerDown}
      >
        <div className="hero-title">
          <BubbleName text={personalInfo.name.toLocaleUpperCase()} />
          <p className="hero-title__role">AI Engineer · Full-Stack Developer</p>
          <p className="hero-title__tagline">Building intelligent, useful and slightly cute things.</p>
        </div>
      </PandaSign>
    </header>
  );
};

export default HeroSection;
