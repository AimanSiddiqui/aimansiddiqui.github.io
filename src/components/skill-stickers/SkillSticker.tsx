import React from 'react';
import { OUT } from './palette';
import { SKILLS, type SkillId } from './skills';
import './SkillSticker.css';

type Props = {
  skill: SkillId;
  /** Rendered width in px */
  size?: number;
  rotation?: number;
  /** false = artwork only (e.g. next to a visible skill name) */
  showLabel?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

// Art box is 120 × 100; the label sits underneath. Padding leaves room for
// the white die-cut border and the shadow.
const VIEW = { x: -16, y: -10, w: 152, h: 152 };
const VIEW_ART_ONLY = { ...VIEW, h: 124 };
const LABEL_Y = 121;

const labelWidth = (text: string) => Math.min(128, text.length * 15);

const Label: React.FC<{ text: string; color: string }> = ({ text, color }) => {
  const long = text.length > 7;
  return (
    <text
      x={60}
      y={LABEL_Y}
      textAnchor="middle"
      fontFamily="Sniglet, Nunito, sans-serif"
      fontWeight={800}
      fontSize={long ? 21 : 25}
      letterSpacing={0.4}
      fill={color}
      stroke={OUT}
      strokeWidth={2.8}
      strokeLinejoin="round"
      paintOrder="stroke"
      style={{ '--sw': 2.8 } as React.CSSProperties}
      {...(long ? { textLength: labelWidth(text), lengthAdjust: 'spacingAndGlyphs' } : {})}
    >
      {text}
    </text>
  );
};

// Invisible in the artwork layer; in the cut/shadow copies it joins the art
// and the label into one sticker silhouette.
const Backing: React.FC<{ text: string }> = ({ text }) => {
  const w = labelWidth(text) + 10;
  return (
    <>
      <rect x={60 - w / 2} y={LABEL_Y - 19} width={w} height={24} rx={12} />
      <rect x={42} y={78} width={36} height={30} rx={10} />
    </>
  );
};

const SkillSticker: React.FC<Props> = ({ skill, size = 110, rotation = 0, showLabel = true, className, style }) => {
  const { Art, label, color } = SKILLS[skill];
  const view = showLabel ? VIEW : VIEW_ART_ONLY;
  return (
    <svg
      className={`skill-sticker ${className ?? ''}`.trim()}
      viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
      width={size}
      height={(size * view.h) / view.w}
      style={rotation ? { ...style, transform: `rotate(${rotation}deg)` } : style}
      aria-hidden="true"
      focusable="false"
    >
      <g className="skill-sticker__shadow" transform="translate(0 3)">
        {showLabel && <Backing text={label} />}
        <Art />
        {showLabel && <Label text={label} color={color} />}
      </g>
      <g className="skill-sticker__cut">
        {showLabel && <Backing text={label} />}
        <Art />
        {showLabel && <Label text={label} color={color} />}
      </g>
      <Art />
      {showLabel && <Label text={label} color={color} />}
    </svg>
  );
};

export default SkillSticker;
