import type React from 'react';

// Shared palette for the sticker pack
export const OUT = '#3d2c5c';
export const CHEEK = '#f7a3ad';
export const YELLOW = '#ffd66b';
export const LILAC = '#c7b6f5';

// Stroke width hint for the die-cut/shadow copies (see SkillSticker.css)
export const sw = (w: number) => ({ '--sw': w }) as React.CSSProperties;
