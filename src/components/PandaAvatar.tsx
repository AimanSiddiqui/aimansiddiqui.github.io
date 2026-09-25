import React, { useEffect, useRef } from 'react';
import './PandaAvatar.css';

type Props = {
  /** Any CSS length, e.g. "360px" or "min(420px, 80vw)". Defaults to the CSS value. */
  size?: string;
  className?: string;
  /** Accessible description of the character. Pass "" when it's decorative. */
  label?: string;
};

// Layers generated from the flattened artwork by scripts/avatar/split_layers.py
const ASSET_DIR = `${import.meta.env.BASE_URL}avatar/`;

const CONFIG = {
  // Where the eyes sit inside the square (fractions of width/height). Cursor
  // position is measured from here, so pointing at the face means "look straight".
  lookOrigin: { x: 0.5, y: 0.33 },
  // 0–1: fraction of the remaining distance covered per 60fps frame.
  smoothing: 0.09,
  // Proximity: fully "near" within `nearInner` avatar-widths of the centre,
  // fading out by `nearOuter`.
  nearInner: 0.35,
  nearOuter: 0.95,
  blinkEveryMs: [3000, 6000] as const,
  blinkDurationMs: 150,
  doubleBlinkChance: 0.18,
};

const IMAGE_LAYER_COUNT = 6;

const clamp = (v: number, min = -1, max = 1) => Math.min(max, Math.max(min, v));

const PandaAvatar: React.FC<Props> = ({ size, className, label = 'Animated character of Aiman in a panda cap and hijab' }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const loadedRef = useRef(0);

  // Reveal only once every layer is in, so there's no flash of empty eyes
  const onLayerSettled = () => {
    loadedRef.current += 1;
    if (loadedRef.current >= IMAGE_LAYER_COUNT) rootRef.current?.classList.add('is-ready');
  };

  // Cursor tracking: all per-frame work happens outside React via CSS variables.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const target = { x: 0, y: 0, near: 0 };
    const current = { x: 0, y: 0, near: 0 };
    let pointer: { x: number; y: number } | null = null;
    let isNear = false;
    let frame = 0;
    let lastTime = 0;

    const updateTarget = () => {
      if (!pointer) {
        target.x = 0;
        target.y = 0;
        target.near = 0;
        return;
      }
      const rect = root.getBoundingClientRect();
      const ox = rect.left + rect.width * CONFIG.lookOrigin.x;
      const oy = rect.top + rect.height * CONFIG.lookOrigin.y;
      const dx = pointer.x - ox;
      const dy = pointer.y - oy;
      // Normalise against the distance to the viewport edge on that side, so the
      // far-left edge is exactly -1 and the far-right edge exactly 1.
      target.x = clamp(dx / Math.max(1, dx < 0 ? ox : window.innerWidth - ox));
      target.y = clamp(dy / Math.max(1, dy < 0 ? oy : window.innerHeight - oy));

      const dist = Math.hypot(pointer.x - (rect.left + rect.width / 2), pointer.y - (rect.top + rect.height / 2));
      const inner = rect.width * CONFIG.nearInner;
      const outer = rect.width * CONFIG.nearOuter;
      target.near = clamp(1 - (dist - inner) / (outer - inner), 0, 1);
    };

    const tick = (now: number) => {
      const dt = lastTime ? Math.min(now - lastTime, 100) / (1000 / 60) : 1;
      lastTime = now;
      updateTarget();

      const k = 1 - Math.pow(1 - CONFIG.smoothing, dt);
      current.x += (target.x - current.x) * k;
      current.y += (target.y - current.y) * k;
      current.near += (target.near - current.near) * k;

      root.style.setProperty('--look-x', current.x.toFixed(4));
      root.style.setProperty('--look-y', current.y.toFixed(4));
      root.style.setProperty('--near', current.near.toFixed(4));

      // Hysteresis so the ear wiggle doesn't retrigger at the boundary
      if (!isNear && current.near > 0.6) {
        isNear = true;
        root.classList.add('is-near');
      } else if (isNear && current.near < 0.3) {
        isNear = false;
        root.classList.remove('is-near');
      }

      const settled =
        Math.abs(target.x - current.x) < 0.001 &&
        Math.abs(target.y - current.y) < 0.001 &&
        Math.abs(target.near - current.near) < 0.001;
      if (settled) {
        // Sleep until the next input instead of rendering idle frames
        frame = 0;
        lastTime = 0;
        return;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      wake();
    };
    // Touch: follow the finger while it's down, then drift back to centre
    const onPointerEnd = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      pointer = null;
      wake();
    };
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget) return; // still inside the page
      pointer = null;
      wake();
    };
    const onBlur = () => {
      pointer = null;
      wake();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerEnd, { passive: true });
    window.addEventListener('pointercancel', onPointerEnd, { passive: true });
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('blur', onBlur);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerMove);
      window.removeEventListener('pointerup', onPointerEnd);
      window.removeEventListener('pointercancel', onPointerEnd);
      window.removeEventListener('scroll', wake);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  // Blinking: a class toggle drives the CSS closed-eyes reveal.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const timers = new Set<number>();
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };

    const blink = (then: () => void) => {
      root.classList.add('is-blinking');
      later(() => {
        root.classList.remove('is-blinking');
        then();
      }, CONFIG.blinkDurationMs);
    };

    const schedule = () => {
      const [min, max] = CONFIG.blinkEveryMs;
      later(() => {
        if (Math.random() < CONFIG.doubleBlinkChance) {
          blink(() => later(() => blink(schedule), 90));
        } else {
          blink(schedule);
        }
      }, min + Math.random() * (max - min));
    };
    schedule();

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      timers.clear();
      root.classList.remove('is-blinking');
    };
  }, []);

  const style = {
    '--eye-mask': `url("${ASSET_DIR}eye-mask.png")`,
    ...(size ? { '--avatar-size': size } : {}),
  } as React.CSSProperties;

  const layer = (file: string, extra = '') => (
    <img
      src={`${ASSET_DIR}${file}`}
      className={`panda-avatar__layer ${extra}`.trim()}
      alt=""
      draggable={false}
      decoding="async"
      onLoad={onLayerSettled}
      onError={onLayerSettled}
    />
  );

  return (
    <div
      ref={rootRef}
      className={`panda-avatar ${className ?? ''}`.trim()}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
    >
      <div className="panda-avatar__follow" aria-hidden="true">
        <div className="panda-avatar__breathe">
          {layer('left-ear.png', 'panda-avatar__ear panda-avatar__ear--left')}
          {layer('right-ear.png', 'panda-avatar__ear panda-avatar__ear--right')}
          {layer('body.png')}
          <div className="panda-avatar__blush panda-avatar__blush--left" />
          <div className="panda-avatar__blush panda-avatar__blush--right" />
          <div className="panda-avatar__eyes">
            {layer('left-iris.png', 'panda-avatar__iris')}
            {layer('right-iris.png', 'panda-avatar__iris')}
          </div>
          {layer('closed-eyes.png', 'panda-avatar__lids')}
        </div>
      </div>
    </div>
  );
};

export default PandaAvatar;
