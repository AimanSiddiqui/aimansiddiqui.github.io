import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PandaAvatar from './PandaAvatar';

// Chat head geometry (px). The avatar is drawn larger than the circle and
// positioned so her face sits in the middle; a mask keeps everything inside the
// circle except the cap and ears, which poke out over the top. These numbers
// are the desktop/max size; CSS clamps scale them down on narrow screens.
const CIRCLE = 150;
const HEAD_ROOM = 30; // space above the circle for the ears
const AVATAR_WIDTH = 180;
// Her face centre as a fraction of the avatar's width/height
const FACE = { x: 0.5, y: 0.45 };
const AVATAR_HEIGHT = AVATAR_WIDTH * (1018 / 916);
const MOBILE_SCALE = 112 / CIRCLE;
const FLUID_CIRCLE_VW = 28;

const responsivePx = (px: number) => {
  const small = px * MOBILE_SCALE;
  const fluid = (px / CIRCLE) * FLUID_CIRCLE_VW;
  const min = Math.min(small, px);
  const max = Math.max(small, px);

  return `clamp(${min.toFixed(2)}px, ${fluid.toFixed(2)}vw, ${max.toFixed(2)}px)`;
};

const companionStyle = {
  '--companion-circle': responsivePx(CIRCLE),
  '--companion-head-room': responsivePx(HEAD_ROOM),
  '--companion-height': responsivePx(CIRCLE + HEAD_ROOM),
  '--companion-radius': responsivePx(CIRCLE / 2),
  '--companion-mask-height': responsivePx(HEAD_ROOM + CIRCLE / 2),
  '--companion-avatar-width': responsivePx(AVATAR_WIDTH),
  '--companion-avatar-left': responsivePx(CIRCLE / 2 - AVATAR_WIDTH * FACE.x),
  '--companion-avatar-top': responsivePx(HEAD_ROOM + CIRCLE / 2 - AVATAR_HEIGHT * FACE.y),
  width: 'var(--companion-circle)',
  height: 'var(--companion-height)',
} as React.CSSProperties;

const headMask = [
  'radial-gradient(circle var(--companion-radius) at 50% var(--companion-mask-height), #000 98%, transparent 100%)',
  'linear-gradient(#000, #000)',
].join(', ');

const PandaCompanion: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <motion.button
      type="button"
      aria-label="Chat with Aiman — jump to the contact form"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 select-none cursor-pointer bg-transparent border-0 p-0"
      style={companionStyle}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 120, damping: 14 }}
      whileHover={{ scale: 1.06 }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Circle backdrop */}
      <span
        className="absolute left-0 rounded-full bg-gradient-to-br from-[#ffd8e8] to-[#e4d9ff] border-[3px] border-white shadow-lg"
        style={{
          top: 'var(--companion-head-room)',
          width: 'var(--companion-circle)',
          height: 'var(--companion-circle)',
        }}
      />

      {/* Character, clipped to the circle below her eyes */}
      <span
        className="absolute inset-0"
        style={{
          WebkitMaskImage: headMask,
          maskImage: headMask,
          WebkitMaskSize: '100% 100%, 100% var(--companion-mask-height)',
          maskSize: '100% 100%, 100% var(--companion-mask-height)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center, top',
          maskPosition: 'center, top',
        }}
      >
        <span
          className="absolute"
          style={{
            left: 'var(--companion-avatar-left)',
            top: 'var(--companion-avatar-top)',
          }}
        >
          <PandaAvatar size="var(--companion-avatar-width)" label="" />
        </span>
      </span>

      {/* Chat bubble on hover */}
      <motion.span
        className="absolute -top-10 z-10 right-0 bg-gradient-to-br from-[#d96b9d] to-[#8b6dd6] text-white text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap pointer-events-none shadow-lg"
        initial={{ opacity: 0, y: 8, scale: 0.8 }}
        animate={isHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        Want to chat?
      </motion.span>
    </motion.button>
  );
};

export default PandaCompanion;
