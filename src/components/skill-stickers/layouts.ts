import type { SkillId, StickerLevel } from './skills';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export type Placement = {
  id: SkillId;
  /** Tilt while bursting and at rest */
  rotate: number;
  /**
   * Burst position around the hero centre, as a fraction of half the page
   * width (x) and half the hero height (y). Chosen to frame the name, never
   * cover it.
   */
  burst: [number, number];
  /**
   * Resting position. y is a fraction of the anchor section's height.
   * x is a fraction of the page width for hero stickers; section stickers use
   * 'left' / 'right' and are tucked into that side gutter, clear of the content
   * column (peeking in from the screen edge when the gutter is narrow).
   */
  final: { anchor: string; x: number | 'left' | 'right'; y: number; scale?: number; opacity?: number };
};

export const SIZES: Record<Breakpoint, Record<StickerLevel, number>> = {
  desktop: { A: 132, B: 110, C: 92 },
  tablet: { A: 100, B: 86, C: 72 },
  mobile: { A: 80, B: 68, C: 58 },
};

/** Cursor parallax distance per level, in px (foreground → background) */
export const DEPTH: Record<StickerLevel, number> = { A: 6, B: 3, C: 1 };

export const LAYOUTS: Record<Breakpoint, Placement[]> = {
  desktop: [
    { id: 'python', rotate: -8, burst: [-0.65, -0.74], final: { anchor: 'hero', x: 0.14, y: 0.21 } },
    { id: 'react', rotate: 5, burst: [-0.65, -0.24], final: { anchor: 'hero', x: 0.13, y: 0.54 } },
    { id: 'node', rotate: -5, burst: [-0.62, 0.86], final: { anchor: 'hero', x: 0.16, y: 0.84 } },
    { id: 'typescript', rotate: 7, burst: [-0.42, -0.86], final: { anchor: 'hero', x: 0.28, y: 0.09 } },
    { id: 'pytorch', rotate: 6, burst: [0.42, -0.84], final: { anchor: 'hero', x: 0.72, y: 0.1 } },
    { id: 'llm', rotate: -6, burst: [0.92, -0.04], final: { anchor: 'hero', x: 0.88, y: 0.54 } },
    { id: 'fastapi', rotate: -8, burst: [-0.06, 0.88], final: { anchor: 'hero', x: 0.33, y: 0.9 } },
    { id: 'docker', rotate: 8, burst: [0.65, -0.74], final: { anchor: 'hero', x: 0.84, y: 0.21 } },
    { id: 'postgres', rotate: 6, burst: [-0.65, 0.48], final: { anchor: 'projects', x: 'right', y: 0.52, scale: 0.85, opacity: 0.8 } },
    { id: 'aws', rotate: -6, burst: [0.5, 0.86], final: { anchor: 'hero', x: 0.59, y: 0.9 } },
    { id: 'tensorflow', rotate: -7, burst: [0.92, 0.3], final: { anchor: 'education', x: 'left', y: 0.5, scale: 0.9, opacity: 0.75 } },
    { id: 'vision', rotate: -8, burst: [-0.34, 0.84], final: { anchor: 'skills', x: 'right', y: 0.22, opacity: 0.85 } },
    { id: 'rag', rotate: 7, burst: [-0.65, 0.14], final: { anchor: 'projects', x: 'left', y: 0.86, opacity: 0.8 } },
    { id: 'k8s', rotate: 9, burst: [-0.92, 0.36], final: { anchor: 'skills', x: 'left', y: 0.74, opacity: 0.85 } },
    { id: 'javascript', rotate: -9, burst: [-0.9, -0.84], final: { anchor: 'hero', x: 0.04, y: 0.12 } },
    { id: 'reactnative', rotate: 8, burst: [0.9, -0.84], final: { anchor: 'hero', x: 0.96, y: 0.1 } },
    { id: 'nestjs', rotate: -6, burst: [-0.92, -0.44], final: { anchor: 'hero', x: 0.04, y: 0.38 } },
    { id: 'graphql', rotate: 7, burst: [-0.92, -0.04], final: { anchor: 'expertise', x: 'right', y: 0.3, scale: 0.85, opacity: 0.85 } },
    { id: 'mongodb', rotate: -7, burst: [0.65, -0.24], final: { anchor: 'hero', x: 0.72, y: 0.9 } },
    { id: 'redis', rotate: 6, burst: [0.65, 0.14], final: { anchor: 'experience', x: 'left', y: 0.4, scale: 0.85, opacity: 0.8 } },
    { id: 'githubactions', rotate: -8, burst: [-0.9, 0.86], final: { anchor: 'contact', x: 'right', y: 0.45, opacity: 0.8 } },
    { id: 'sklearn', rotate: 8, burst: [0.22, 0.84], final: { anchor: 'hero', x: 0.46, y: 0.88 } },
    { id: 'opencv', rotate: -5, burst: [0.92, -0.44], final: { anchor: 'hero', x: 0.96, y: 0.36 } },
  ],
  tablet: [
    { id: 'python', rotate: -8, burst: [-0.72, -0.6], final: { anchor: 'hero', x: 0.13, y: 0.2 } },
    { id: 'react', rotate: 5, burst: [-0.8, 0.46], final: { anchor: 'hero', x: 0.1, y: 0.8 } },
    { id: 'node', rotate: -5, burst: [-0.34, 0.7], final: { anchor: 'hero', x: 0.34, y: 0.9 } },
    { id: 'typescript', rotate: 7, burst: [-0.26, -0.76], final: { anchor: 'hero', x: 0.3, y: 0.08 } },
    { id: 'pytorch', rotate: 6, burst: [0.22, -0.78], final: { anchor: 'hero', x: 0.87, y: 0.2 } },
    { id: 'llm', rotate: -6, burst: [0.8, 0.4], final: { anchor: 'hero', x: 0.5, y: 0.14 } },
    { id: 'fastapi', rotate: -8, burst: [0.32, 0.72], final: { anchor: 'hero', x: 0.6, y: 0.88 } },
    { id: 'docker', rotate: 8, burst: [0.72, -0.6], final: { anchor: 'hero', x: 0.7, y: 0.08 } },
    { id: 'postgres', rotate: 6, burst: [-0.64, 0.88], final: { anchor: 'projects', x: 'right', y: 0.62, scale: 0.85, opacity: 0.7 } },
    { id: 'aws', rotate: -6, burst: [0.5, 0.5], final: { anchor: 'experience', x: 'left', y: 0.25, scale: 0.85, opacity: 0.7 } },
    { id: 'tensorflow', rotate: -7, burst: [0.95, -0.1], final: { anchor: 'education', x: 'left', y: 0.5, scale: 0.85, opacity: 0.65 } },
    { id: 'k8s', rotate: 9, burst: [-0.95, -0.1], final: { anchor: 'skills', x: 'left', y: 0.7, scale: 0.85, opacity: 0.7 } },
    { id: 'vision', rotate: -8, burst: [0, 0.94], final: { anchor: 'hero', x: 0.93, y: 0.5 } },
    { id: 'rag', rotate: 7, burst: [0.62, -0.9], final: { anchor: 'hero', x: 0.07, y: 0.5 } },
  ],
  mobile: [
    { id: 'python', rotate: -8, burst: [-0.55, -0.5], final: { anchor: 'hero', x: 0.16, y: 0.18 } },
    { id: 'react', rotate: 5, burst: [0.6, -0.42], final: { anchor: 'hero', x: 0.5, y: 0.07 } },
    { id: 'node', rotate: -5, burst: [-0.55, 0.46], final: { anchor: 'hero', x: 0.16, y: 0.8 } },
    { id: 'typescript', rotate: 7, burst: [-0.2, 0.72], final: { anchor: 'hero', x: 0.36, y: 0.25 } },
    { id: 'pytorch', rotate: 6, burst: [0.08, -0.64], final: { anchor: 'hero', x: 0.84, y: 0.18 } },
    { id: 'llm', rotate: -6, burst: [0.55, 0.34], final: { anchor: 'hero', x: 0.4, y: 0.86 } },
    { id: 'docker', rotate: 8, burst: [-0.6, -0.82], final: { anchor: 'hero', x: 0.64, y: 0.27 } },
    { id: 'fastapi', rotate: -8, burst: [0.62, -0.8], final: { anchor: 'hero', x: 0.2, y: 0.93 } },
  ],
};
