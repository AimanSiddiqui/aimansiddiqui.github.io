import React from 'react';
import './BubbleName.css';

type Props = {
  text: string;
};

// Bamboo leaves drifting down across the name: horizontal start, size, fall
// duration, delay, sway direction (1 / -1) and shade
const LEAVES = [
  { x: '2%', s: '0.55em', d: '7.2s', delay: '0s', dir: 1, shade: 0 },
  { x: '16%', s: '0.42em', d: '8.6s', delay: '-3.1s', dir: -1, shade: 1 },
  { x: '31%', s: '0.5em', d: '7.8s', delay: '-5.6s', dir: 1, shade: 2 },
  { x: '47%', s: '0.4em', d: '9.2s', delay: '-1.4s', dir: -1, shade: 0 },
  { x: '62%', s: '0.52em', d: '8.1s', delay: '-6.8s', dir: 1, shade: 1 },
  { x: '77%', s: '0.44em', d: '7.5s', delay: '-2.5s', dir: -1, shade: 2 },
  { x: '90%', s: '0.5em', d: '8.9s', delay: '-4.4s', dir: 1, shade: 0 },
];

const SHADES = [
  ['#9ccf5f', '#5f9e3a'],
  ['#b5dc74', '#74ad45'],
  ['#86c05a', '#4f8a33'],
];

const Leaf: React.FC<{ shade: number }> = ({ shade }) => {
  const [light, dark] = SHADES[shade];
  const id = `bubble-name-leaf-${shade}`;
  return (
    <svg viewBox="0 0 40 12" width="100%" height="100%">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
      </defs>
      <path d="M1 6 C 9 0.5, 27 0.5, 39 6 C 27 11.5, 9 11.5, 1 6 Z" fill={`url(#${id})`} />
      <path d="M3 6 L 36 6" stroke="rgb(255 255 255 / 0.55)" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
};

const BubbleName: React.FC<Props> = ({ text }) => {
  // Each letter's position in the whole name, used to stagger its animation
  const words = text.split(' ').map((word, w, all) => ({
    letters: [...word],
    start: all.slice(0, w).reduce((n, prev) => n + prev.length, 0),
  }));

  return (
    <h1 className="bubble-name" aria-label={text}>
      <span className="bubble-name__leaves" aria-hidden="true">
        {LEAVES.map((l, i) => (
          <span
            key={i}
            className="bubble-name__leaf"
            style={{ '--x': l.x, '--s': l.s, '--d': l.d, '--delay': l.delay, '--dir': l.dir } as React.CSSProperties}
          >
            <span className="bubble-name__leaf-sway">
              <Leaf shade={l.shade} />
            </span>
          </span>
        ))}
      </span>
      {words.map(({ letters, start }, w) => (
        <span key={w} className="bubble-name__word" aria-hidden="true">
          {letters.map((ch, c) => (
            <span key={c} className="bubble-name__letter" style={{ '--i': start + c } as React.CSSProperties}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
};

export default BubbleName;
