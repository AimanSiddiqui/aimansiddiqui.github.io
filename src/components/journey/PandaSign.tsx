import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import layout from '../../../public/panda/layout.json';
import './PandaSign.css';

// Clips built by scripts/avatar/build_peek_panda.py, cut where the source
// frames match, so switching is a plain cut with no crossfade (a crossfade of
// two slightly different poses shows a ghosted double image).
const BASE = `${import.meta.env.BASE_URL}panda/`;
const CLIPS = ['peek-idle', 'peek-hi', 'rise', 'out-idle', 'sink'] as const;
type Clip = (typeof CLIPS)[number];

// She ducks a little quicker than the render
const SINK_RATE = 1.5;

// The smiling loop only matches the sink's first frame at certain moments
// (measured, in seconds). When the pointer leaves mid-loop she fast-forwards
// to the next such moment, then sinks, so there's never a jump.
const OUT_EXIT_WINDOWS: [number, number][] = [
  [0, 0.05],
  [2.42, 2.92],
  [6.25, 99],
];
const OUT_FAST_RATE = 4;

// Safari can't play WebM with transparency, so it gets the two still poses
const isSafari = () => /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(navigator.userAgent);

type Props = {
  /** Hovered: she climbs up and smiles */
  out: boolean;
  children: React.ReactNode;
  onPointerEnter?: React.PointerEventHandler;
  onPointerLeave?: React.PointerEventHandler;
  onPointerDown?: React.PointerEventHandler;
};

const PandaSign: React.FC<Props> = ({ out, children, onPointerEnter, onPointerLeave, onPointerDown }) => {
  const reducedMotion = useReducedMotion() ?? false;
  const [stillsOnly] = useState(isSafari);
  const videos = useRef<Partial<Record<Clip, HTMLVideoElement>>>({});
  const current = useRef<Clip | null>(null);
  const outRef = useRef(out);
  const peekLoops = useRef(0);
  const z = useRef(1);
  const leaving = useRef(false);

  // Watch the smiling loop frame by frame until it reaches the exit window
  const leaveWhenReady = () => {
    const el = videos.current['out-idle'] as (HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number }) | undefined;
    if (!el) return;
    leaving.current = true;
    const check = () => {
      if (!leaving.current || current.current !== 'out-idle') return;
      const t = el.currentTime;
      if (OUT_EXIT_WINDOWS.some(([from, to]) => t >= from && t <= to)) {
        leaving.current = false;
        play('sink');
        return;
      }
      el.playbackRate = OUT_FAST_RATE;
      if (el.requestVideoFrameCallback) el.requestVideoFrameCallback(check);
      else window.setTimeout(check, 30);
    };
    check();
  };

  const play = (next: Clip, restart = false) => {
    const el = videos.current[next];
    if (!el || (current.current === next && !restart)) return;
    current.current = next;
    el.currentTime = 0;
    el.playbackRate = next === 'sink' ? SINK_RATE : 1;
    el.style.zIndex = String(++z.current);
    const show = () => {
      el.style.opacity = '1';
      // Hide the previous clip once the new one fully covers it
      window.setTimeout(() => {
        if (current.current !== next) return;
        for (const other of Object.values(videos.current)) {
          if (other && other !== el) {
            other.style.transition = 'none';
            other.style.opacity = '0';
            other.pause();
          }
        }
      }, 0);
    };
    const withFrame = el as HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number };
    if (withFrame.requestVideoFrameCallback) withFrame.requestVideoFrameCallback(show);
    else el.addEventListener('playing', show, { once: true });
    el.play().catch(() => {});
  };

  // What plays after each clip ends
  const onEnded = (clip: Clip) => {
    if (current.current !== clip) return;
    const hovered = outRef.current;
    switch (clip) {
      case 'peek-idle':
      case 'peek-hi':
        if (hovered) return play('rise');
        peekLoops.current += 1;
        // Wave again after every other peek loop
        if (clip === 'peek-idle' && peekLoops.current % 2 === 0) return play('peek-hi');
        return play('peek-idle', true);
      case 'rise':
        return play(hovered ? 'out-idle' : 'sink');
      case 'sink':
        return play(hovered ? 'rise' : 'peek-idle');
    }
  };

  // Hover changes: respond right away when she's somewhere she can switch from
  useEffect(() => {
    outRef.current = out;
    const now = current.current;
    if (out && (now === 'peek-idle' || now === 'peek-hi')) play('rise');
    else if (!out && now === 'out-idle') leaveWhenReady();
    else if (out && leaving.current) {
      // Came back before she finished: carry on smiling at normal speed
      leaving.current = false;
      const el = videos.current['out-idle'];
      if (el) el.playbackRate = 1;
    }
    // rise / sink finish first, then onEnded picks the right next clip.
    // play / leaveWhenReady only touch refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out]);

  // Start with a hello
  useEffect(() => {
    if (stillsOnly || reducedMotion) return;
    play('peek-hi');
  }, [stillsOnly, reducedMotion]);

  const { paper, aspect } = layout;
  const useStills = stillsOnly || reducedMotion;

  return (
    <div
      className="panda-sign"
      style={{ aspectRatio: `${aspect[0]} / ${aspect[1]}` }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
    >
      {useStills ? (
        <img
          src={`${BASE}${out ? 'pose-up' : 'pose-peek'}.webp`}
          alt=""
          aria-hidden="true"
          className="panda-sign__layer"
          style={{ opacity: 1 }}
          draggable={false}
        />
      ) : (
        CLIPS.map((clip) => (
          <video
            key={clip}
            ref={(el) => {
              if (el) videos.current[clip] = el;
            }}
            src={`${BASE}${clip}.webm`}
            poster={clip === 'peek-hi' ? `${BASE}pose-peek.webp` : undefined}
            muted
            playsInline
            // The smiling loop repeats natively (gapless); leaving hover crossfades to sink
            loop={clip === 'out-idle'}
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
            className="panda-sign__layer"
            style={{ opacity: clip === 'peek-hi' ? 1 : 0 }}
            onEnded={() => onEnded(clip)}
          />
        ))
      )}
      <div
        className="panda-sign__paper"
        style={{
          left: `${paper.left}%`,
          right: `${100 - paper.right}%`,
          top: `${paper.top}%`,
          bottom: `${100 - paper.bottom}%`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PandaSign;
