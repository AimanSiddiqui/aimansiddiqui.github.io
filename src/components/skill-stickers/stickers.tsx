import React from 'react';
import { Face, Shine, Sparkle, Tube } from './art';
import { CHEEK, LILAC, OUT, YELLOW, sw } from './palette';

// Original illustrations, drawn in a 120 × 100 art box (the label sits below).
// Every stroke that should grow a white die-cut border uses the OUT outline.

const line = { stroke: OUT, strokeWidth: 2.6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };

export const ReactArt: React.FC = () => {
  const rings = [0, 60, 120];
  return (
    <g>
      {rings.map((r) => (
        <ellipse key={`o${r}`} cx={60} cy={50} rx={46} ry={16} transform={`rotate(${r} 60 50)`} fill="none" stroke={OUT} strokeWidth={8} style={sw(8)} />
      ))}
      {rings.map((r) => (
        <ellipse key={`c${r}`} cx={60} cy={50} rx={46} ry={16} transform={`rotate(${r} 60 50)`} fill="none" stroke="#8fdcf2" strokeWidth={4.4} style={sw(4.4)} />
      ))}
      <circle cx={60} cy={50} r={17} fill="#d4f4fc" {...line} />
      <Shine d="M49 44 Q51 38 57 36" />
      <Face cx={60} cy={51} s={0.85} />
      <circle cx={106} cy={50} r={3.6} fill={YELLOW} stroke={OUT} strokeWidth={1.8} />
      <circle cx={83} cy={10.2} r={3.6} fill={CHEEK} stroke={OUT} strokeWidth={1.8} />
      <Sparkle x={16} y={14} />
      <Sparkle x={104} y={86} s={5} color={LILAC} />
    </g>
  );
};

export const TypeScriptArt: React.FC = () => (
  <g>
    <rect x={26} y={16} width={68} height={68} rx={17} fill="#8cb8f2" {...line} />
    <Shine d="M34 30 Q35 23 42 22" />
    <text
      x={60}
      y={45}
      textAnchor="middle"
      fontFamily="Sniglet, Nunito, sans-serif"
      fontWeight={800}
      fontSize={17}
      fill="#fff"
      stroke={OUT}
      strokeWidth={2.4}
      paintOrder="stroke"
      style={sw(2.4)}
    >
      {'</>'}
    </text>
    <Face cx={60} cy={63} />
    <Sparkle x={15} y={24} />
    <Sparkle x={106} y={70} s={5} color={LILAC} />
    <Sparkle x={100} y={14} s={3.5} />
  </g>
);

export const NodeArt: React.FC = () => (
  <g>
    <path d="M30 48 L15 44 M89 36 L104 27 M89 64 L104 73" fill="none" stroke={OUT} strokeWidth={2.4} strokeLinecap="round" />
    <path d="M60 15 L90 32.5 L90 67.5 L60 85 L30 67.5 L30 32.5 Z" fill="#a8e39c" {...line} strokeWidth={2.8} />
    <path d="M60 23 L83 36.5 L83 63.5 L60 77 L37 63.5 L37 36.5 Z" fill="none" stroke="#fff" strokeWidth={1.8} opacity={0.5} />
    <Face cx={60} cy={52} />
    <circle cx={13} cy={44} r={5} fill={YELLOW} stroke={OUT} strokeWidth={2} />
    <circle cx={106} cy={26} r={5} fill={CHEEK} stroke={OUT} strokeWidth={2} />
    <circle cx={106} cy={74} r={5} fill={LILAC} stroke={OUT} strokeWidth={2} />
    <Sparkle x={20} y={80} s={4.5} color={LILAC} />
  </g>
);

export const FastApiArt: React.FC = () => (
  <g>
    <path d="M64 8 L28 55 L53 55 L45 93 L92 38 L67 38 L77 8 Z" fill="#8fe3cf" {...line} strokeWidth={2.8} />
    <Shine d="M58 20 L46 36" />
    <Face cx={58} cy={48} s={0.85} />
    <path d="M6 74 H22 M17 69 L22 74 L17 79" fill="none" stroke={OUT} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M96 22 H112 M107 17 L112 22 L107 27" fill="none" stroke={OUT} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
    <Sparkle x={20} y={18} />
    <Sparkle x={104} y={80} s={4.5} color={LILAC} />
  </g>
);

export const PythonArt: React.FC = () => {
  const blue = '#8cc3ef';
  return (
    <g>
      {/* back half of the coil, behind the code block */}
      <Tube d="M22 72 A38 15 0 0 1 98 72" w={11} color={blue} />
      <rect x={43} y={46} width={34} height={25} rx={7} fill="#fff3c4" {...line} strokeWidth={2.2} />
      <text x={60} y={63.5} textAnchor="middle" fontFamily="Sniglet, Nunito, sans-serif" fontWeight={800} fontSize={13} fill={OUT}>
        {'{ }'}
      </text>
      <Tube d="M98 72 C108 56 98 40 84 32" w={11} color={blue} />
      <Tube d="M98 72 A38 15 0 0 1 22 72 C15 72 11 67 13 61" w={11} color={blue} />
      <circle cx={40} cy={84} r={2.4} fill={YELLOW} />
      <circle cx={60} cy={87} r={2.4} fill={YELLOW} />
      <circle cx={80} cy={84} r={2.4} fill={YELLOW} />
      <ellipse cx={74} cy={25} rx={18} ry={15} fill={blue} {...line} />
      <path d="M57 32 L50 34 M50 34 L46.5 31.5 M50 34 L46.5 36.5" fill="none" stroke="#f07a8a" strokeWidth={2} strokeLinecap="round" />
      <Face cx={74} cy={24} s={0.85} />
      <Sparkle x={106} y={14} />
      <Sparkle x={14} y={34} s={4.5} color={LILAC} />
    </g>
  );
};

export const PostgresArt: React.FC = () => {
  const skin = '#9db4e3';
  return (
    <g>
      {/* database the elephant is resting its trunk on */}
      <path d="M81 52 V80 A13 5 0 0 0 107 80 V52" fill="#cbb9f5" {...line} strokeWidth={2.4} />
      <path d="M81 66 A13 5 0 0 0 107 66" fill="none" stroke={OUT} strokeWidth={1.8} />
      <ellipse cx={94} cy={52} rx={13} ry={5} fill="#e5dbfb" {...line} strokeWidth={2.4} />
      <rect x={24} y={70} width={12} height={16} rx={5} fill={skin} {...line} strokeWidth={2.4} />
      <rect x={48} y={70} width={12} height={16} rx={5} fill={skin} {...line} strokeWidth={2.4} />
      <ellipse cx={42} cy={64} rx={27} ry={18} fill={skin} {...line} />
      <path d="M16 60 Q10 60 11 66" fill="none" stroke={OUT} strokeWidth={2.2} strokeLinecap="round" />
      <Tube d="M70 50 C78 54 82 50 84 44" w={7} color={skin} />
      <circle cx={60} cy={40} r={19} fill={skin} {...line} />
      <ellipse cx={45} cy={42} rx={11} ry={14} fill="#bccdf0" {...line} strokeWidth={2.4} />
      <path d="M68 52 Q72 56 75 53" fill="#fff" stroke={OUT} strokeWidth={1.6} strokeLinejoin="round" />
      <Face cx={63} cy={38} s={0.75} />
      <Sparkle x={16} y={20} />
      <Sparkle x={104} y={26} s={4.5} color={LILAC} />
    </g>
  );
};

export const DockerArt: React.FC = () => {
  const boxes = [
    { x: 26, y: 24, c: '#f59a8f' },
    { x: 44, y: 24, c: YELLOW },
    { x: 62, y: 24, c: '#a8e39c' },
    { x: 35, y: 7, c: '#8fdcf2' },
    { x: 53, y: 7, c: LILAC },
  ];
  return (
    <g>
      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={18} height={17} rx={3} fill={b.c} stroke={OUT} strokeWidth={2.2} strokeLinejoin="round" />
          <path d={`M${b.x + 6} ${b.y + 4} V${b.y + 13} M${b.x + 12} ${b.y + 4} V${b.y + 13}`} stroke={OUT} strokeWidth={1.3} opacity={0.6} />
        </g>
      ))}
      <path d="M95 56 Q103 46 104 33 Q109 41 118 41 Q111 54 99 60 Z" fill="#7fb3ea" {...line} />
      <path d="M12 62 C12 46 28 41 48 41 L86 41 C98 41 102 50 98 59 C92 76 74 86 50 86 C26 86 12 78 12 62 Z" fill="#7fb3ea" {...line} />
      <path d="M18 70 C30 82 62 84 82 74 C64 80 36 80 18 70 Z" fill="#c4e0fa" stroke={OUT} strokeWidth={1.6} strokeLinejoin="round" />
      <Shine d="M24 52 Q30 46 40 45" />
      <Face cx={36} cy={60} s={0.9} />
      <Sparkle x={100} y={16} />
      <Sparkle x={12} y={30} s={4.5} color={LILAC} />
    </g>
  );
};

export const AwsArt: React.FC = () => (
  <g>
    <path
      d="M26 78 C11 78 9 57 24 55 C22 41 38 33 48 41 C52 26 75 24 81 39 C95 35 107 47 101 59 C111 63 109 78 96 78 Z"
      fill="#ffc48f"
      {...line}
      strokeWidth={2.8}
    />
    <Shine d="M30 55 Q32 47 40 46" />
    <Face cx={60} cy={60} wink />
    {[
      { x: 14, y: 30, s: 16 },
      { x: 104, y: 26, s: 13 },
    ].map((l) => (
      <text
        key={l.x}
        x={l.x}
        y={l.y}
        textAnchor="middle"
        fontFamily="Sniglet, Nunito, sans-serif"
        fontWeight={800}
        fontSize={l.s}
        fill="#f59a4d"
        stroke={OUT}
        strokeWidth={2}
        paintOrder="stroke"
        style={sw(2)}
      >
        λ
      </text>
    ))}
    <Sparkle x={60} y={14} s={5} />
    <Sparkle x={110} y={84} s={4} color={LILAC} />
  </g>
);

export const PyTorchArt: React.FC = () => (
  <g>
    <path d="M96 20 L107 32 L99 45" fill="none" stroke={OUT} strokeWidth={1.6} />
    <path
      d="M60 8 C70 22 88 30 90 56 C92 76 78 90 60 90 C42 90 28 78 30 58 C31 46 38 40 42 31 C44 41 48 46 52 46 C50 32 54 18 60 8 Z"
      fill="#f7907a"
      {...line}
      strokeWidth={2.8}
    />
    <path
      d="M60 36 C66 46 78 52 78 66 C78 78 70 84 60 84 C50 84 42 78 42 68 C42 58 50 54 52 48 C55 54 58 56 60 56 C58 50 58 42 60 36 Z"
      fill="#ffd27a"
      stroke={OUT}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
    <Face cx={60} cy={68} s={0.95} />
    <circle cx={96} cy={20} r={3.2} fill={LILAC} stroke={OUT} strokeWidth={1.5} />
    <circle cx={107} cy={32} r={3.2} fill="#8fdcf2" stroke={OUT} strokeWidth={1.5} />
    <circle cx={99} cy={45} r={3.2} fill={YELLOW} stroke={OUT} strokeWidth={1.5} />
    <Sparkle x={18} y={22} />
  </g>
);

export const LlmArt: React.FC = () => (
  <g>
    <path d="M12 28 L22 15 M98 15 L108 28" fill="none" stroke={OUT} strokeWidth={1.6} />
    <circle cx={12} cy={28} r={3.2} fill="#8fdcf2" stroke={OUT} strokeWidth={1.5} />
    <circle cx={22} cy={15} r={3.2} fill={CHEEK} stroke={OUT} strokeWidth={1.5} />
    <circle cx={98} cy={15} r={3.2} fill={YELLOW} stroke={OUT} strokeWidth={1.5} />
    <circle cx={108} cy={28} r={3.2} fill="#a8e39c" stroke={OUT} strokeWidth={1.5} />
    <path d="M60 21 V11" stroke={OUT} strokeWidth={2.4} strokeLinecap="round" />
    <circle cx={60} cy={8} r={4.2} fill={YELLOW} stroke={OUT} strokeWidth={2} />
    <rect x={17} y={40} width={10} height={20} rx={4} fill="#a893ea" {...line} strokeWidth={2.2} />
    <rect x={93} y={40} width={10} height={20} rx={4} fill="#a893ea" {...line} strokeWidth={2.2} />
    <rect x={26} y={20} width={68} height={60} rx={19} fill="#cbbcf6" {...line} strokeWidth={2.8} />
    <rect x={34} y={32} width={52} height={36} rx={11} fill={OUT} />
    <path d="M43 50 Q47.5 44.5 52 50 M68 50 Q72.5 44.5 77 50 M55 57 Q60 61.5 65 57" fill="none" stroke="#8ff0e0" strokeWidth={2.6} strokeLinecap="round" />
    <ellipse cx={42} cy={60} rx={3.6} ry={2.2} fill={CHEEK} opacity={0.75} />
    <ellipse cx={78} cy={60} rx={3.6} ry={2.2} fill={CHEEK} opacity={0.75} />
    <Shine d="M33 26 Q38 23 46 23" />
    {/* chat bubble */}
    <path d="M88 70 h18 a8 8 0 0 1 8 8 v2 a8 8 0 0 1 -8 8 h-12 l-6 5 v-5 a8 8 0 0 1 -8 -8 v-2 a8 8 0 0 1 8 -8 Z" fill="#fff" {...line} strokeWidth={2.2} />
    <circle cx={92} cy={79} r={1.6} fill={OUT} />
    <circle cx={98} cy={79} r={1.6} fill={OUT} />
    <circle cx={104} cy={79} r={1.6} fill={OUT} />
  </g>
);

export const TensorFlowArt: React.FC = () => (
  <g>
    <path d="M60 14 L94 32 L60 50 L26 32 Z" fill="#ffd09a" {...line} />
    <path d="M26 32 L60 50 L60 90 L26 72 Z" fill="#ffad5c" {...line} />
    <path d="M94 32 L60 50 L60 90 L94 72 Z" fill="#f08a3a" {...line} />
    <path d="M77 41 V81 M60 70 L94 52 M43 23 L77 41 M77 23 L43 41" fill="none" stroke={OUT} strokeWidth={1.3} opacity={0.35} />
    <Face cx={43} cy={63} s={0.8} />
    <Sparkle x={104} y={16} />
    <Sparkle x={14} y={86} s={4.5} color={LILAC} />
    <Sparkle x={12} y={20} s={3.5} />
  </g>
);

export const VisionArt: React.FC = () => {
  const corner = '#b79be6';
  return (
    <g>
      <Tube d="M10 24 V10 H24 M96 10 H110 V24 M110 76 V90 H96 M24 90 H10 V76" w={3.4} color={corner} />
      <rect x={39} y={23} width={20} height={12} rx={4} fill="#f7b6d2" {...line} strokeWidth={2.4} />
      <rect x={24} y={31} width={72} height={50} rx={15} fill="#f7b6d2" {...line} />
      <Shine d="M31 44 Q32 38 38 37" />
      <circle cx={60} cy={56} r={18} fill="#fff" {...line} />
      <circle cx={60} cy={56} r={10} fill="#7fd8ee" stroke={OUT} strokeWidth={2} />
      <circle cx={60} cy={56} r={4.6} fill={OUT} />
      <circle cx={63.5} cy={52.5} r={2.1} fill="#fff" />
      <circle cx={86} cy={39} r={3} fill="#ff8f8f" stroke={OUT} strokeWidth={1.4} />
      <ellipse cx={35} cy={66} rx={3.6} ry={2.3} fill={CHEEK} opacity={0.9} />
      <ellipse cx={85} cy={66} rx={3.6} ry={2.3} fill={CHEEK} opacity={0.9} />
      <Sparkle x={104} y={48} s={4.5} color={YELLOW} />
    </g>
  );
};

export const RagArt: React.FC = () => (
  <g>
    <path d="M28 18 L60 30 L92 18 M60 9 L60 30 M60 30 L60 45" fill="none" stroke={OUT} strokeWidth={1.8} strokeLinecap="round" />
    <path d="M14 49 V89 C32 85 48 85 60 91 C72 85 88 85 106 89 V49 Z" fill="#f4b860" {...line} />
    <path d="M60 47 C48 41 32 41 18 45 V84 C32 80 48 80 60 86 Z" fill="#fff1c9" {...line} />
    <path d="M60 47 C72 41 88 41 102 45 V84 C88 80 72 80 60 86 Z" fill="#fff1c9" {...line} />
    <path d="M26 55 Q37 52 50 55 M26 63 Q37 60 50 63 M26 71 Q35 69 44 71" fill="none" stroke="#d9b877" strokeWidth={2} strokeLinecap="round" />
    <Face cx={81} cy={62} s={0.8} />
    <circle cx={28} cy={18} r={4.6} fill="#8fdcf2" stroke={OUT} strokeWidth={1.8} />
    <circle cx={60} cy={9} r={4.6} fill={YELLOW} stroke={OUT} strokeWidth={1.8} />
    <circle cx={92} cy={18} r={4.6} fill={CHEEK} stroke={OUT} strokeWidth={1.8} />
    <circle cx={60} cy={30} r={4.6} fill={LILAC} stroke={OUT} strokeWidth={1.8} />
    <Sparkle x={106} y={36} s={4.5} />
    <Sparkle x={12} y={36} s={3.5} color={LILAC} />
  </g>
);

export const K8sArt: React.FC = () => {
  const blue = '#8fb4f0';
  const spokes = Array.from({ length: 7 }, (_, i) => {
    const a = ((-90 + (i * 360) / 7) * Math.PI) / 180;
    const p = (r: number) => `${(60 + Math.cos(a) * r).toFixed(2)} ${(50 + Math.sin(a) * r).toFixed(2)}`;
    return { inner: `M${p(14)} L${p(30)}`, handle: `M${p(31)} L${p(40)}`, knob: p(42).split(' ').map(Number) };
  });
  return (
    <g>
      {spokes.map((s, i) => (
        <path key={`s${i}`} d={s.inner} stroke={OUT} strokeWidth={2.4} strokeLinecap="round" />
      ))}
      {spokes.map((s, i) => (
        <Tube key={`h${i}`} d={s.handle} w={5} color={blue} />
      ))}
      {spokes.map((s, i) => (
        <circle key={`k${i}`} cx={s.knob[0]} cy={s.knob[1]} r={4.4} fill={blue} stroke={OUT} strokeWidth={2} />
      ))}
      <circle cx={60} cy={50} r={30} fill="none" stroke={OUT} strokeWidth={11} style={sw(11)} />
      <circle cx={60} cy={50} r={30} fill="none" stroke={blue} strokeWidth={6.5} style={sw(6.5)} />
      <circle cx={60} cy={50} r={16} fill="#d6e4fc" {...line} />
      <Face cx={60} cy={51} s={0.75} />
      <rect x={14} y={76} width={14} height={12} rx={2.5} fill={YELLOW} stroke={OUT} strokeWidth={1.8} />
      <rect x={93} y={76} width={14} height={12} rx={2.5} fill="#a8e39c" stroke={OUT} strokeWidth={1.8} />
      <Sparkle x={106} y={14} s={4.5} />
    </g>
  );
};
