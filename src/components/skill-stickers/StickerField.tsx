import React, { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, useReducedMotion, type TargetAndTransition, type Transition } from 'framer-motion';
import SkillSticker from './SkillSticker';
import { BURST_ORDER, SKILLS, type SkillId } from './skills';
import { DEPTH, LAYOUTS, SIZES, type Breakpoint, type Placement } from './layouts';
import './StickerField.css';

type Point = { x: number; y: number };
type Geometry = { origin: Point; burst: Record<string, Point>; final: Record<string, Point> };
type Phase = 'packed' | 'gather' | 'burst' | 'spread';

// Timeline (ms)
const START_DELAY = 550; // let the name land first
const GATHER_MS = 380; // anticipation squeeze before the burst
const STAGGER_MS = 68;
const HOLD_MS = 1300; // pause around the hero before spreading out
const SPREAD_MS = 1900;

// SkillSticker's viewBox is square, so height === width
const stickerHeight = (w: number) => w;

const breakpointFor = (w: number): Breakpoint => (w >= 1024 ? 'desktop' : w >= 640 ? 'tablet' : 'mobile');

const subscribeResize = (cb: () => void) => {
  window.addEventListener('resize', cb);
  return () => window.removeEventListener('resize', cb);
};

const useBreakpoint = () =>
  useSyncExternalStore(
    subscribeResize,
    () => breakpointFor(window.innerWidth),
    () => 'desktop' as Breakpoint,
  );

// Small deterministic jitter so the gathered pile looks hand-placed
const jitter = (i: number, a: number, m: number) => (((i * a) % m) - (m - 1) / 2);

const StickerField: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const breakpoint = useBreakpoint();
  const reducedMotion = useReducedMotion() ?? false;
  const placements = LAYOUTS[breakpoint];
  const sizes = SIZES[breakpoint];

  // Skip the show if motion is reduced or the page was opened scrolled down:
  // stickers then mount directly in their resting places.
  const [skipIntro] = useState(
    () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.scrollY > window.innerHeight * 0.6,
  );
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [phase, setPhase] = useState<Phase>(skipIntro ? 'spread' : 'packed');
  const [settled, setSettled] = useState(skipIntro);
  const startedRef = useRef(false);

  const measure = useCallback(() => {
    const root = rootRef.current;
    const hero = document.getElementById('hero');
    if (!root || !hero) return;
    const rootRect = root.getBoundingClientRect();
    const heroRect = hero.getBoundingClientRect();
    const width = rootRect.width;
    // Content column edges, so section stickers can stay in the gutters
    const main = root.parentElement?.querySelector('main');
    let contentLeft = 0;
    let contentRight = width;
    if (main) {
      const m = main.getBoundingClientRect();
      const cs = getComputedStyle(main);
      contentLeft = m.left - rootRect.left + parseFloat(cs.paddingLeft);
      contentRight = m.right - rootRect.left - parseFloat(cs.paddingRight);
    }
    const gutterX = (side: 'left' | 'right', stickerWidth: number) => {
      const gutter = side === 'left' ? contentLeft : width - contentRight;
      // Centre of the gutter if it fits, otherwise slide out past the edge,
      // but always keep at least a quarter of the sticker on screen
      const offset = Math.max(stickerWidth * 0.25, Math.min(gutter / 2, gutter - stickerWidth / 2 - 8));
      return side === 'left' ? offset : width - offset;
    };
    const origin = {
      x: heroRect.left + heroRect.width / 2 - rootRect.left,
      y: heroRect.top + heroRect.height / 2 - rootRect.top,
    };
    const burst: Record<string, Point> = {};
    const final: Record<string, Point> = {};
    for (const p of placements) {
      burst[p.id] = { x: origin.x + (p.burst[0] * width) / 2, y: origin.y + (p.burst[1] * heroRect.height) / 2 };
      const anchor = document.getElementById(p.final.anchor) ?? hero;
      const a = anchor.getBoundingClientRect();
      const x =
        typeof p.final.x === 'number'
          ? p.final.x * width
          : gutterX(p.final.x, SIZES[breakpoint][SKILLS[p.id].level] * (p.final.scale ?? 1));
      final[p.id] = { x, y: a.top - rootRect.top + p.final.y * a.height };
    }
    setGeometry({ origin, burst, final });
  }, [placements, breakpoint]);

  // Measure now and whenever the page reflows (fonts, images, resize)
  useLayoutEffect(() => {
    measure();
    const page = rootRef.current?.parentElement;
    if (!page) return;
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    observer.observe(page);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [measure]);

  // Choreography: gather → burst → hold → spread → settled
  const hasGeometry = geometry !== null;
  useEffect(() => {
    if (!hasGeometry || skipIntro || startedRef.current) return;
    startedRef.current = true;
    const burstDuration = BURST_ORDER.length * STAGGER_MS + 700;
    const steps: Array<[number, () => void]> = [
      [START_DELAY, () => setPhase('gather')],
      [START_DELAY + GATHER_MS, () => setPhase('burst')],
      [START_DELAY + GATHER_MS + burstDuration + HOLD_MS, () => setPhase('spread')],
      [START_DELAY + GATHER_MS + burstDuration + HOLD_MS + SPREAD_MS, () => setSettled(true)],
    ];
    const timers = steps.map(([ms, fn]) => window.setTimeout(fn, ms));
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      startedRef.current = false;
    };
  }, [hasGeometry, skipIntro]);

  // Cursor parallax: one rAF-smoothed pair of CSS variables for the whole layer
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      root.style.setProperty('--mx', current.x.toFixed(3));
      root.style.setProperty('--my', current.y.toFixed(3));
      frame = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      target.x = 0;
      target.y = 0;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseout', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseout', onLeave);
    };
  }, [reducedMotion]);

  const targetFor = (p: Placement, which: Phase, i: number, size: number): TargetAndTransition => {
    if (!geometry) return {};
    const half = { x: size / 2, y: stickerHeight(size) / 2 };
    const { origin } = geometry;
    switch (which) {
      case 'packed':
        return { x: origin.x - half.x, y: origin.y - half.y, scale: 0.3, rotate: 0, opacity: 0 };
      case 'gather':
        return {
          x: origin.x - half.x + jitter(i, 37, 21) * 1.6,
          y: origin.y - half.y + jitter(i, 53, 17) * 1.2,
          scale: [0.3, 0.5, 0.42],
          rotate: jitter(i, 29, 25),
          opacity: 1,
        };
      case 'burst': {
        const b = geometry.burst[p.id];
        return { x: b.x - half.x, y: b.y - half.y, scale: 1, rotate: p.rotate, opacity: 1 };
      }
      case 'spread': {
        const f = geometry.final[p.id];
        return {
          x: f.x - half.x,
          y: f.y - half.y,
          scale: p.final.scale ?? 1,
          rotate: p.rotate,
          opacity: p.final.opacity ?? 1,
        };
      }
    }
  };

  const transitionFor = (p: Placement, order: number): Transition => {
    if (settled) return { type: 'spring', stiffness: 140, damping: 22 };
    const delay = (order * STAGGER_MS) / 1000;
    switch (phase) {
      case 'gather':
        return { duration: GATHER_MS / 1000, ease: 'easeOut', delay: order * 0.012 };
      case 'burst':
        return {
          type: 'spring',
          stiffness: 200,
          damping: 12,
          mass: 0.9,
          delay,
          opacity: { duration: 0.12, delay },
        };
      case 'spread': {
        const d = order * 0.045;
        // Hero stickers just drift outward; the rest glide off down the page
        if (p.final.anchor === 'hero') return { type: 'spring', stiffness: 60, damping: 11, delay: d };
        return {
          x: { duration: 1.3, ease: [0.45, 0, 0.2, 1], delay: d },
          y: { duration: 1.3, ease: [0.45, 0, 0.2, 1], delay: d },
          default: { type: 'spring', stiffness: 80, damping: 12, delay: d },
        };
      }
      default:
        return { duration: 0 };
    }
  };

  const levelZ = { A: 3, B: 2, C: 1 } as const;

  return (
    <div
      ref={rootRef}
      className={`sticker-field ${settled && !reducedMotion ? 'is-settled' : ''}`.trim()}
      aria-hidden="true"
    >
      {geometry &&
        placements.map((p, i) => {
          const meta = SKILLS[p.id as SkillId];
          const size = sizes[meta.level];
          const order = BURST_ORDER.indexOf(p.id);
          const depth = p.final.anchor === 'hero' ? DEPTH[meta.level] : 1;
          return (
            <motion.div
              key={p.id}
              className="sticker-field__item"
              style={{ zIndex: levelZ[meta.level] }}
              initial={targetFor(p, skipIntro ? 'spread' : 'packed', i, size)}
              animate={targetFor(p, phase, i, size)}
              transition={transitionFor(p, order)}
            >
              <div className="sticker-field__parallax" style={{ '--depth': `${depth}px` } as React.CSSProperties}>
                <div
                  className="sticker-field__float"
                  style={
                    {
                      '--float-duration': `${4.6 + ((i * 7) % 5) * 0.8}s`,
                      '--float-delay': `${-((i * 13) % 7)}s`,
                      '--float-y': `${-(4 + (i % 3) * 2)}px`,
                      '--float-rotate': `${(i % 2 ? 1 : -1) * (1 + (i % 3))}deg`,
                    } as React.CSSProperties
                  }
                >
                  <SkillSticker skill={p.id} size={size} />
                </div>
              </div>
            </motion.div>
          );
        })}
    </div>
  );
};

export default StickerField;
