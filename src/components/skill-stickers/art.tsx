import React from 'react';
import { CHEEK, OUT, YELLOW, sw } from './palette';

// Shared drawing vocabulary for the sticker pack, so every sticker has the same
// outline colour, face, cheeks and sparkles.

type FaceProps = { cx: number; cy: number; s?: number; wink?: boolean };

export const Face: React.FC<FaceProps> = ({ cx, cy, s = 1, wink = false }) => {
  const d = 7 * s;
  return (
    <g>
      <ellipse cx={cx - d - 5 * s} cy={cy + 4 * s} rx={3.6 * s} ry={2.3 * s} fill={CHEEK} opacity={0.85} />
      <ellipse cx={cx + d + 5 * s} cy={cy + 4 * s} rx={3.6 * s} ry={2.3 * s} fill={CHEEK} opacity={0.85} />
      <circle cx={cx - d} cy={cy} r={2.4 * s} fill={OUT} />
      <circle cx={cx - d + 0.8 * s} cy={cy - 0.8 * s} r={0.8 * s} fill="#fff" />
      {wink ? (
        <path
          d={`M${cx + d - 2.6 * s} ${cy + 0.4 * s} Q${cx + d} ${cy - 2.4 * s} ${cx + d + 2.6 * s} ${cy + 0.4 * s}`}
          fill="none"
          stroke={OUT}
          strokeWidth={1.8 * s}
          strokeLinecap="round"
        />
      ) : (
        <>
          <circle cx={cx + d} cy={cy} r={2.4 * s} fill={OUT} />
          <circle cx={cx + d + 0.8 * s} cy={cy - 0.8 * s} r={0.8 * s} fill="#fff" />
        </>
      )}
      <path
        d={`M${cx - 3.4 * s} ${cy + 3.2 * s} Q${cx} ${cy + 6.8 * s} ${cx + 3.4 * s} ${cy + 3.2 * s}`}
        fill="none"
        stroke={OUT}
        strokeWidth={1.9 * s}
        strokeLinecap="round"
      />
    </g>
  );
};

type SparkleProps = { x: number; y: number; s?: number; color?: string };

// Four-pointed twinkle
export const Sparkle: React.FC<SparkleProps> = ({ x, y, s = 6, color = YELLOW }) => (
  <path
    d={`M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s}Z`}
    fill={color}
    stroke={OUT}
    strokeWidth={1.4}
    strokeLinejoin="round"
    style={sw(1.4)}
  />
);

type TubeProps = { d: string; w: number; color: string };

// A thick outlined line: dark stroke underneath, coloured stroke on top
export const Tube: React.FC<TubeProps> = ({ d, w, color }) => (
  <>
    <path d={d} fill="none" stroke={OUT} strokeWidth={w + 5} strokeLinecap="round" strokeLinejoin="round" style={sw(w + 5)} />
    <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" style={sw(w)} />
  </>
);

// Soft glossy highlight
export const Shine: React.FC<{ d: string }> = ({ d }) => (
  <path d={d} fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.55} style={sw(3)} />
);
