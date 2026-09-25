import React from 'react';
import { Face, Shine, Sparkle, Tube } from './art';
import { CHEEK, LILAC, OUT, YELLOW, sw } from './palette';

// The rest of the sticker pack: one original character per skill in
// skills.json, same 120 × 100 art box and drawing rules as stickers.tsx.

const line = { stroke: OUT, strokeWidth: 2.6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
const thin = (w = 1.8) => ({ stroke: OUT, strokeWidth: w, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const });
const font = { fontFamily: 'Sniglet, Nunito, sans-serif', fontWeight: 800, textAnchor: 'middle' as const };

const MINT = '#a8e39c';
const SKY = '#8fdcf2';
const CORAL = '#f59a8f';
const PINK = '#f7a3c0';
const BLUE = '#8fb4f0';

const CLOUD = 'M26 78 C11 78 9 57 24 55 C22 41 38 33 48 41 C52 26 75 24 81 39 C95 35 107 47 101 59 C111 63 109 78 96 78 Z';

const Label: React.FC<{ x: number; y: number; size: number; children: string; fill?: string }> = ({ x, y, size, children, fill = '#fff' }) => (
  <text x={x} y={y} fontSize={size} fill={fill} stroke={OUT} strokeWidth={2.4} paintOrder="stroke" style={sw(2.4)} {...font}>
    {children}
  </text>
);

/* ── Frontend ─────────────────────────────────────────────────────────── */

export const ReactNativeArt: React.FC = () => (
  <g>
    <rect x={36} y={8} width={48} height={86} rx={13} fill={LILAC} {...line} />
    <rect x={42} y={19} width={36} height={62} rx={7} fill="#effbff" {...thin(2)} />
    <rect x={54} y={12.5} width={12} height={3} rx={1.5} fill={OUT} />
    {[0, 60, 120].map((r) => (
      <ellipse key={r} cx={60} cy={38} rx={14} ry={5} transform={`rotate(${r} 60 38)`} fill="none" stroke="#5cc3e6" strokeWidth={2.2} />
    ))}
    <circle cx={60} cy={38} r={3} fill="#5cc3e6" stroke={OUT} strokeWidth={1.2} />
    <Face cx={60} cy={62} s={0.7} />
    <circle cx={60} cy={87.5} r={2.6} fill="#fff" {...thin(1.4)} />
    <Sparkle x={20} y={22} />
    <Sparkle x={100} y={72} s={4.5} color={SKY} />
  </g>
);

export const JavaScriptArt: React.FC = () => (
  <g>
    <rect x={26} y={16} width={68} height={68} rx={17} fill="#ffe37a" {...line} />
    <Shine d="M34 30 Q35 23 42 22" />
    <Face cx={60} cy={42} />
    <Label x={60} y={76} size={20}>JS</Label>
    <Sparkle x={15} y={24} />
    <Sparkle x={106} y={70} s={5} color={LILAC} />
  </g>
);

export const HtmlArt: React.FC = () => (
  <g>
    <path d="M30 12 H78 L92 26 V90 H30 Z" fill="#ffb38a" {...line} />
    <path d="M78 12 V26 H92" fill="#ffd3b8" {...line} strokeWidth={2.2} />
    <Tube d="M52 34 L43 43 L52 52 M70 34 L79 43 L70 52" w={3.2} color="#fff" />
    <Face cx={61} cy={68} s={0.85} />
    <Sparkle x={16} y={24} />
    <Sparkle x={106} y={60} s={4.5} color={LILAC} />
  </g>
);

export const CssArt: React.FC = () => (
  <g>
    <path
      d="M60 16 C88 16 106 34 104 54 C102 70 88 72 80 68 C72 64 66 70 70 78 C74 88 64 92 56 90 C30 88 14 72 16 52 C18 32 36 16 60 16 Z"
      fill="#d6e6ff"
      {...line}
    />
    <circle cx={40} cy={38} r={6.5} fill={CORAL} {...thin()} />
    <circle cx={60} cy={30} r={6.5} fill={YELLOW} {...thin()} />
    <circle cx={80} cy={38} r={6.5} fill={SKY} {...thin()} />
    <circle cx={30} cy={58} r={6} fill={MINT} {...thin()} />
    <Face cx={52} cy={62} s={0.8} />
    <Sparkle x={104} y={18} />
  </g>
);

export const AngularArt: React.FC = () => (
  <g>
    <path d="M60 10 L98 24 L92 72 L60 92 L28 72 L22 24 Z" fill="#f58ca0" {...line} strokeWidth={2.8} />
    <path d="M60 19 L89 30 L84 67 L60 83" fill="none" stroke="#fff" strokeWidth={2.4} opacity={0.5} strokeLinecap="round" strokeLinejoin="round" />
    <Face cx={60} cy={52} />
    <Sparkle x={14} y={20} />
    <Sparkle x={106} y={78} s={4.5} color={LILAC} />
  </g>
);

export const ReduxArt: React.FC = () => (
  <g>
    <Tube d="M28 42 A34 34 0 0 1 84 24" w={4.5} color="#b79be6" />
    <Tube d="M92 62 A34 34 0 0 1 36 80" w={4.5} color="#b79be6" />
    <path d="M84 24 L74 22 M84 24 L81 33 M36 80 L46 82 M36 80 L39 71" fill="none" {...thin(2.6)} />
    <circle cx={60} cy={52} r={22} fill="#e2d4fb" {...line} />
    <Face cx={60} cy={53} s={0.85} />
    <Sparkle x={104} y={18} />
    <Sparkle x={16} y={86} s={4.5} color={SKY} />
  </g>
);

export const ContextApiArt: React.FC = () => (
  <g>
    <rect x={16} y={18} width={88} height={70} rx={17} fill="#c9f0e2" {...line} />
    <circle cx={27} cy={28} r={2.4} fill={CORAL} />
    <circle cx={35} cy={28} r={2.4} fill={YELLOW} />
    <circle cx={43} cy={28} r={2.4} fill={MINT} />
    <rect x={36} y={38} width={48} height={40} rx={11} fill="#fff" {...line} strokeWidth={2.2} />
    <Face cx={60} cy={57} s={0.8} />
    <Sparkle x={106} y={14} />
  </g>
);

export const ReactQueryArt: React.FC = () => (
  <g>
    <Tube d="M76 70 L100 92" w={7} color={PINK} />
    <circle cx={54} cy={46} r={30} fill="#ffe3ea" {...line} strokeWidth={3} />
    <circle cx={54} cy={46} r={22} fill="none" stroke="#fff" strokeWidth={2.4} opacity={0.7} />
    <Face cx={54} cy={48} />
    <Sparkle x={104} y={18} />
    <Sparkle x={14} y={86} s={4.5} color={LILAC} />
  </g>
);

/* ── Backend ──────────────────────────────────────────────────────────── */

export const NestJsArt: React.FC = () => (
  <g>
    <ellipse cx={60} cy={44} rx={20} ry={25} fill="#ffd6e0" {...line} />
    <Shine d="M47 34 Q49 26 55 24" />
    <Face cx={60} cy={48} s={0.85} />
    <path d="M16 58 Q60 98 104 58 Q100 80 60 88 Q20 80 16 58 Z" fill="#e0a872" {...line} />
    <path d="M26 66 Q60 82 94 66 M34 75 Q60 86 86 75" fill="none" {...thin(1.4)} opacity={0.5} />
    <Sparkle x={16} y={24} />
    <Sparkle x={104} y={30} s={4.5} color={LILAC} />
  </g>
);

export const RestArt: React.FC = () => (
  <g>
    <rect x={45} y={14} width={7} height={22} rx={3.5} fill="#e8e8f0" {...line} strokeWidth={2.2} />
    <rect x={68} y={14} width={7} height={22} rx={3.5} fill="#e8e8f0" {...line} strokeWidth={2.2} />
    <Tube d="M60 76 C60 92 84 92 100 84" w={5} color={MINT} />
    <rect x={34} y={32} width={52} height={44} rx={13} fill={MINT} {...line} />
    <Face cx={60} cy={54} />
    <Sparkle x={16} y={26} />
    <Sparkle x={104} y={24} s={4.5} color={LILAC} />
  </g>
);

export const GraphqlArt: React.FC = () => {
  const pts = [[60, 14], [91, 32], [91, 68], [60, 86], [29, 68], [29, 32]];
  const hex = `M${pts.map((p) => p.join(' ')).join(' L')} Z`;
  return (
    <g>
      <Tube d={hex} w={4} color="#f59ad0" />
      <Tube d="M60 14 L91 68 L29 68 Z" w={3} color="#f59ad0" />
      {pts.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={6} fill="#ffc3e6" {...thin(2)} />
      ))}
      <circle cx={60} cy={51} r={13} fill="#ffe3f3" {...line} strokeWidth={2.2} />
      <Face cx={60} cy={51} s={0.62} />
      <Sparkle x={108} y={16} s={4.5} />
    </g>
  );
};

export const RabbitMqArt: React.FC = () => (
  <g>
    <ellipse cx={46} cy={26} rx={8.5} ry={20} transform="rotate(-12 46 26)" fill="#ffc69a" {...line} />
    <ellipse cx={46} cy={27} rx={4} ry={13} transform="rotate(-12 46 27)" fill="#ffd9e0" />
    <ellipse cx={74} cy={26} rx={8.5} ry={20} transform="rotate(12 74 26)" fill="#ffc69a" {...line} />
    <ellipse cx={74} cy={27} rx={4} ry={13} transform="rotate(12 74 27)" fill="#ffd9e0" />
    <circle cx={60} cy={60} r={26} fill="#ffc69a" {...line} />
    <Face cx={60} cy={62} />
    <rect x={82} y={68} width={26} height={18} rx={3} fill="#fff" {...line} strokeWidth={2.2} />
    <path d="M82 69 L95 79 L108 69" fill="none" {...thin(2)} />
    <Sparkle x={16} y={24} />
  </g>
);

export const LambdaArt: React.FC = () => (
  <g>
    <circle cx={58} cy={52} r={36} fill="#ffc48f" {...line} strokeWidth={2.8} />
    <Shine d="M32 40 Q36 26 48 22" />
    <Label x={58} y={68} size={46}>λ</Label>
    <ellipse cx={34} cy={66} rx={4} ry={2.5} fill={CHEEK} opacity={0.85} />
    <ellipse cx={82} cy={66} rx={4} ry={2.5} fill={CHEEK} opacity={0.85} />
    <path d="M100 14 L92 28 L99 28 L94 40 L106 24 L99 24 L104 14 Z" fill={YELLOW} {...thin(1.8)} />
    <Sparkle x={14} y={20} s={4.5} color={LILAC} />
  </g>
);

export const GcfArt: React.FC = () => (
  <g>
    <path d={CLOUD} fill="#bfe0ff" {...line} strokeWidth={2.8} />
    <Shine d="M30 55 Q32 47 40 46" />
    <Face cx={60} cy={60} />
    <rect x={78} y={10} width={36} height={20} rx={10} fill={YELLOW} {...line} strokeWidth={2.2} />
    <text x={96} y={25} fontSize={12} fill={OUT} {...font}>
      f(x)
    </text>
    <Sparkle x={14} y={26} s={4.5} color={LILAC} />
  </g>
);

export const WebSocketsArt: React.FC = () => (
  <g>
    <path d="M47 58 L57 48 L63 58 L73 48" fill="none" {...thin(2.6)} />
    <path d="M47 58 L47 51 M47 58 L54 58 M73 48 L73 55 M73 48 L66 48" fill="none" {...thin(2.6)} />
    <circle cx={28} cy={62} r={19} fill={SKY} {...line} />
    <Face cx={28} cy={63} s={0.6} />
    <circle cx={92} cy={42} r={19} fill={LILAC} {...line} />
    <Face cx={92} cy={43} s={0.6} />
    <Sparkle x={60} y={20} />
    <Sparkle x={100} y={82} s={4.5} color={PINK} />
  </g>
);

export const OAuthArt: React.FC = () => (
  <g>
    <rect x={84} y={50} width={8} height={14} rx={2.5} fill={YELLOW} {...line} strokeWidth={2.2} />
    <rect x={95} y={50} width={8} height={10} rx={2.5} fill={YELLOW} {...line} strokeWidth={2.2} />
    <rect x={54} y={40} width={52} height={12} rx={6} fill={YELLOW} {...line} />
    <circle cx={38} cy={46} r={22} fill={YELLOW} {...line} />
    <Shine d="M24 40 Q26 30 34 28" />
    <Face cx={38} cy={47} s={0.85} />
    <Sparkle x={100} y={20} />
    <Sparkle x={16} y={86} s={4.5} color={LILAC} />
  </g>
);

export const JwtArt: React.FC = () => (
  <g>
    <rect x={14} y={26} width={92} height={50} rx={13} fill="#fff" {...line} />
    <rect x={20} y={32} width={26} height={38} rx={8} fill={PINK} {...thin(1.8)} />
    <rect x={47} y={32} width={26} height={38} rx={8} fill={LILAC} {...thin(1.8)} />
    <rect x={74} y={32} width={26} height={38} rx={8} fill={SKY} {...thin(1.8)} />
    <Face cx={60} cy={50} s={0.6} />
    <Sparkle x={18} y={14} />
    <Sparkle x={104} y={88} s={4.5} color={LILAC} />
  </g>
);

export const MicroservicesArt: React.FC = () => {
  const boxes = [
    { x: 12, y: 12, c: SKY },
    { x: 80, y: 10, c: PINK },
    { x: 12, y: 64, c: MINT },
    { x: 80, y: 66, c: LILAC },
  ];
  return (
    <g>
      <path d="M26 26 L60 50 L94 24 M26 78 L60 50 L94 80" fill="none" {...thin(2.2)} />
      {boxes.map((b) => (
        <rect key={`${b.x}-${b.y}`} x={b.x} y={b.y} width={28} height={26} rx={7} fill={b.c} {...line} strokeWidth={2.2} />
      ))}
      <circle cx={60} cy={50} r={17} fill={YELLOW} {...line} />
      <Face cx={60} cy={50} s={0.7} />
    </g>
  );
};

/* ── Databases ────────────────────────────────────────────────────────── */

export const SqlArt: React.FC = () => {
  const layers = [
    { y: 66, body: LILAC, top: '#e2d4fb' },
    { y: 46, body: SKY, top: '#cdf1fa' },
    { y: 26, body: '#ffd66b', top: '#ffe9a8' },
  ];
  return (
    <g>
      {layers.map((l) => (
        <g key={l.y}>
          <path d={`M28 ${l.y} V${l.y + 14} A32 9 0 0 0 92 ${l.y + 14} V${l.y} Z`} fill={l.body} {...line} />
          <ellipse cx={60} cy={l.y} rx={32} ry={9} fill={l.top} {...line} />
          <circle cx={37} cy={l.y + 11} r={2} fill={OUT} />
        </g>
      ))}
      <Face cx={60} cy={37} s={0.75} />
      <Sparkle x={104} y={16} />
    </g>
  );
};

export const MongoArt: React.FC = () => (
  <g>
    <path d="M60 8 C84 26 88 58 62 92 C34 60 38 26 60 8 Z" fill="#9fdc9a" {...line} strokeWidth={2.8} />
    <path d="M60 20 V32 M60 68 V86" fill="none" {...thin(1.6)} opacity={0.45} />
    <Shine d="M50 28 Q46 38 46 46" />
    <Face cx={60} cy={50} s={0.85} />
    <Sparkle x={24} y={20} />
    <Sparkle x={98} y={74} s={4.5} color={LILAC} />
  </g>
);

export const RedisArt: React.FC = () => (
  <g>
    {[36, 20, 4].map((dy, i) => (
      <g key={dy} transform={`translate(0 ${dy})`}>
        <path d="M24 34 V44 L60 60 L96 44 V34 L60 50 Z" fill="#f07f72" {...line} strokeWidth={2.4} />
        <path d="M60 18 L96 34 L60 50 L24 34 Z" fill={i === 2 ? '#ffb3a8' : '#ff9a8f'} {...line} strokeWidth={2.4} />
      </g>
    ))}
    <Face cx={60} cy={37} s={0.72} />
    <path d="M6 58 H16 M2 68 H14" fill="none" {...thin(2.2)} />
    <Sparkle x={104} y={14} />
  </g>
);

/* ── Tools ────────────────────────────────────────────────────────────── */

export const GitLabArt: React.FC = () => (
  <g>
    <path d="M26 16 L46 38 L22 48 Z" fill="#fc9d5c" {...line} />
    <path d="M94 16 L98 48 L74 38 Z" fill="#fc9d5c" {...line} />
    <path d="M30 22 L40 36 L28 40 Z M90 22 L92 40 L80 36 Z" fill="#ffd3b8" />
    <path d="M22 46 C22 30 98 30 98 46 L86 80 Q60 96 34 80 Z" fill="#fc9d5c" {...line} />
    <path d="M42 68 Q60 90 78 68 Q60 74 42 68 Z" fill="#fff3e6" {...thin(1.6)} />
    <Face cx={60} cy={58} s={0.85} />
    <Sparkle x={108} y={70} s={4.5} color={LILAC} />
  </g>
);

export const BitbucketArt: React.FC = () => (
  <g>
    <Tube d="M30 32 C30 4 90 4 90 32" w={3.5} color={BLUE} />
    <path d="M28 32 L92 32 L84 86 Q60 93 36 86 Z" fill={BLUE} {...line} />
    <ellipse cx={60} cy={32} rx={32} ry={8} fill="#cfe1fb" {...line} />
    <Face cx={60} cy={60} />
    <Sparkle x={104} y={18} />
    <Sparkle x={14} y={70} s={4.5} color={LILAC} />
  </g>
);

export const AgileArt: React.FC = () => (
  <g>
    <rect x={12} y={16} width={96} height={70} rx={13} fill="#fff" {...line} />
    <path d="M44 22 V80 M76 22 V80" fill="none" {...thin(1.4)} opacity={0.35} />
    <rect x={19} y={26} width={19} height={17} rx={3} fill={YELLOW} {...thin(1.6)} />
    <rect x={19} y={50} width={19} height={17} rx={3} fill={SKY} {...thin(1.6)} />
    <rect x={51} y={36} width={19} height={17} rx={3} fill={PINK} {...thin(1.6)} />
    <rect x={80} y={44} width={23} height={27} rx={4} fill={LILAC} {...thin(2)} />
    <Face cx={91.5} cy={56} s={0.55} />
    <Sparkle x={106} y={14} />
  </g>
);

export const DebugArt: React.FC = () => (
  <g>
    <path d="M34 50 L18 44 M32 64 L16 66 M36 78 L24 88 M86 50 L102 44 M88 64 L104 66 M84 78 L96 88" fill="none" {...thin(2.4)} />
    <path d="M52 22 Q46 10 40 12 M68 22 Q74 10 80 12" fill="none" {...thin(2.2)} />
    <circle cx={40} cy={12} r={2.6} fill={OUT} />
    <circle cx={80} cy={12} r={2.6} fill={OUT} />
    <ellipse cx={60} cy={60} rx={30} ry={28} fill="#ff8f8f" {...line} />
    <path d="M60 40 V87" fill="none" {...thin(2)} />
    <circle cx={45} cy={56} r={4.5} fill={OUT} />
    <circle cx={75} cy={56} r={4.5} fill={OUT} />
    <circle cx={46} cy={74} r={4} fill={OUT} />
    <circle cx={74} cy={74} r={4} fill={OUT} />
    <ellipse cx={60} cy={32} rx={16} ry={12} fill="#ffd9d9" {...line} />
    <Face cx={60} cy={31} s={0.65} />
  </g>
);

export const JupyterArt: React.FC = () => (
  <g>
    <rect x={20} y={12} width={62} height={78} rx={8} fill="#fff3dc" {...line} />
    <path d="M36 28 H70 M36 38 H64 M36 48 H56" fill="none" stroke="#e6c79a" strokeWidth={2.2} strokeLinecap="round" />
    {[24, 38, 52, 66, 80].map((y) => (
      <circle key={y} cx={20} cy={y} r={3.6} fill="#fff" {...thin(1.8)} />
    ))}
    <circle cx={82} cy={62} r={18} fill="#ffb36b" {...line} />
    <ellipse cx={82} cy={68} rx={29} ry={6.5} transform="rotate(-14 82 68)" fill="none" stroke={OUT} strokeWidth={6} style={sw(6)} />
    <ellipse cx={82} cy={68} rx={29} ry={6.5} transform="rotate(-14 82 68)" fill="none" stroke={YELLOW} strokeWidth={3} style={sw(3)} />
    <Face cx={82} cy={57} s={0.6} />
    <Sparkle x={104} y={24} s={4.5} />
  </g>
);

/* ── Cloud & DevOps ───────────────────────────────────────────────────── */

export const GcpArt: React.FC = () => (
  <g>
    <path d={CLOUD} fill="#dbe9ff" {...line} strokeWidth={2.8} />
    <Shine d="M30 55 Q32 47 40 46" />
    <Face cx={60} cy={56} />
    <circle cx={44} cy={70} r={3.6} fill="#6fa8f7" {...thin(1.3)} />
    <circle cx={54} cy={72} r={3.6} fill="#f58a80" {...thin(1.3)} />
    <circle cx={66} cy={72} r={3.6} fill={YELLOW} {...thin(1.3)} />
    <circle cx={76} cy={70} r={3.6} fill="#8fd89a" {...thin(1.3)} />
    <Sparkle x={16} y={26} />
    <Sparkle x={104} y={24} s={4.5} color={LILAC} />
  </g>
);

export const ServerlessArt: React.FC = () => (
  <g>
    <path d="M64 58 L50 78 L60 78 L54 96 L76 70 L64 70 L71 58 Z" fill={YELLOW} {...line} strokeWidth={2.4} />
    <g transform="translate(0 -18)">
      <path d={CLOUD} fill="#d9ccfa" {...line} strokeWidth={2.8} />
      <Shine d="M30 55 Q32 47 40 46" />
      <Face cx={60} cy={60} />
    </g>
    <Sparkle x={16} y={84} s={4.5} color={SKY} />
    <Sparkle x={104} y={84} s={4.5} />
  </g>
);

export const CicdArt: React.FC = () => (
  <g>
    <ellipse cx={38} cy={50} rx={15} ry={13} fill="#e8f0ff" />
    <ellipse cx={82} cy={50} rx={15} ry={13} fill="#fde8f0" />
    <Tube d="M60 50 C48 28 20 28 20 50 C20 72 48 72 60 50 C72 28 100 28 100 50 C100 72 72 72 60 50" w={8} color={BLUE} />
    <path d="M86 31 L94 34 L88 40" fill="none" {...thin(2.6)} />
    <Face cx={38} cy={50} s={0.55} />
    <Face cx={82} cy={50} s={0.55} />
    <Sparkle x={60} y={14} />
    <Sparkle x={60} y={86} s={4.5} color={LILAC} />
  </g>
);

export const JenkinsArt: React.FC = () => (
  <g>
    <path d="M26 100 Q28 76 60 74 Q92 76 94 100 Z" fill="#6b5a8e" {...line} />
    <path d="M52 76 L60 90 L68 76 Z" fill="#fff" {...thin(1.6)} />
    <circle cx={60} cy={46} r={26} fill="#ffe0c8" {...line} />
    <path d="M34 42 Q34 16 60 18 Q86 16 86 42 Q76 30 60 32 Q44 30 34 42 Z" fill="#6b5a8e" {...line} />
    <Face cx={60} cy={50} s={0.85} />
    <path d="M47 71 L60 77 L47 83 Z M73 71 L60 77 L73 83 Z" fill={CORAL} {...thin(2)} />
    <circle cx={60} cy={77} r={3.4} fill={CORAL} {...thin(1.6)} />
    <Sparkle x={104} y={20} />
  </g>
);

export const GithubActionsArt: React.FC = () => (
  <g>
    <path d="M50 72 Q60 100 70 72 Z" fill={YELLOW} {...line} strokeWidth={2.2} />
    <path d="M46 56 L30 78 L47 73 Z M74 56 L90 78 L73 73 Z" fill={CORAL} {...line} strokeWidth={2.2} />
    <path d="M60 8 C77 22 81 48 74 74 L46 74 C39 48 43 22 60 8 Z" fill="#e3ecff" {...line} />
    <circle cx={60} cy={32} r={7} fill={SKY} {...thin(2)} />
    <Face cx={60} cy={54} s={0.75} />
    <Sparkle x={20} y={24} />
    <Sparkle x={100} y={30} s={4.5} color={LILAC} />
    <Sparkle x={96} y={86} s={3.5} />
  </g>
);

/* ── Testing ──────────────────────────────────────────────────────────── */

export const JestArt: React.FC = () => (
  <g>
    <path
      d="M24 70 C20 44 26 30 12 22 C34 22 44 36 48 48 C48 30 56 18 60 10 C64 18 72 30 72 48 C76 36 86 22 108 22 C94 30 100 44 96 70 Z"
      fill="#f58ca0"
      {...line}
    />
    <circle cx={12} cy={22} r={5} fill={YELLOW} {...thin(2)} />
    <circle cx={60} cy={10} r={5} fill={YELLOW} {...thin(2)} />
    <circle cx={108} cy={22} r={5} fill={YELLOW} {...thin(2)} />
    <rect x={20} y={66} width={80} height={16} rx={8} fill={LILAC} {...line} />
    <Face cx={60} cy={52} s={0.8} />
  </g>
);

export const IntegrationTestArt: React.FC = () => (
  <g>
    <path d="M50 14 H70 V38 L94 80 Q98 90 88 90 H32 Q22 90 26 80 L50 38 Z" fill="#e8f7ff" {...line} />
    <path d="M37 62 H83 L92 80 Q94 86 88 86 H32 Q26 86 28 80 Z" fill={MINT} />
    <circle cx={54} cy={50} r={3} fill="#fff" {...thin(1.4)} />
    <circle cx={64} cy={42} r={2.2} fill="#fff" {...thin(1.4)} />
    <rect x={46} y={9} width={28} height={8} rx={4} fill="#fff" {...line} strokeWidth={2.2} />
    <Face cx={60} cy={73} s={0.75} />
    <Sparkle x={100} y={26} />
    <Sparkle x={18} y={40} s={4.5} color={LILAC} />
  </g>
);

/* ── AI / ML ──────────────────────────────────────────────────────────── */

export const AiModelsArt: React.FC = () => (
  <g>
    <path
      d="M60 18 C48 10 32 16 32 28 C18 30 16 48 24 54 C16 64 24 80 38 78 C44 90 58 88 60 82 C62 88 76 90 82 78 C96 80 104 64 96 54 C104 48 102 30 88 28 C88 16 72 10 60 18 Z"
      fill="#ffb8c6"
      {...line}
    />
    <path d="M60 20 V36 M60 68 V82" fill="none" {...thin(1.6)} opacity={0.5} />
    <path d="M50 34 V38 M60 34 V38 M70 34 V38 M50 66 V70 M60 66 V70 M70 66 V70" fill="none" {...thin(1.8)} />
    <rect x={43} y={38} width={34} height={28} rx={6} fill={YELLOW} {...line} strokeWidth={2.2} />
    <Face cx={60} cy={51} s={0.72} />
    <Sparkle x={106} y={16} s={4.5} />
  </g>
);

export const DeepLearningArt: React.FC = () => {
  const layers = [
    [24, [32, 68]],
    [60, [22, 50, 78]],
    [96, [36, 64]],
  ] as const;
  const links: string[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    const [x1, ys1] = layers[l];
    const [x2, ys2] = layers[l + 1];
    ys1.forEach((a) => ys2.forEach((b) => links.push(`M${x1} ${a} L${x2} ${b}`)));
  }
  const fills = [SKY, PINK, MINT, LILAC, YELLOW];
  let n = 0;
  return (
    <g>
      <path d={links.join(' ')} fill="none" {...thin(1.5)} opacity={0.55} />
      {layers.map(([x, ys]) =>
        ys.map((y) =>
          x === 60 && y === 50 ? null : <circle key={`${x}-${y}`} cx={x} cy={y} r={8} fill={fills[n++ % fills.length]} {...thin(2)} />,
        ),
      )}
      <circle cx={60} cy={50} r={13} fill={YELLOW} {...line} />
      <Face cx={60} cy={50} s={0.62} />
      <Sparkle x={104} y={88} s={4.5} color={LILAC} />
    </g>
  );
};

export const GanArt: React.FC = () => (
  <g>
    <rect x={52} y={10} width={18} height={15} rx={3} fill={YELLOW} {...thin(2)} />
    <path d="M55 21 L60 15 L64 19 L67 16" fill="none" {...thin(1.4)} />
    <circle cx={36} cy={60} r={24} fill="#ffc3e6" {...line} />
    <Face cx={36} cy={61} s={0.75} />
    <circle cx={88} cy={54} r={19} fill="#bfe0ff" {...line} />
    <Face cx={88} cy={55} s={0.62} wink />
    <Sparkle x={62} y={40} s={5} />
    <Sparkle x={106} y={86} s={4} color={LILAC} />
  </g>
);

export const FeaturesArt: React.FC = () => (
  <g>
    <rect x={12} y={16} width={72} height={58} rx={9} fill="#dff3ff" {...line} />
    <path d="M16 70 L38 44 L52 60 L62 50 L80 70 Z" fill={MINT} {...thin(1.6)} />
    <circle cx={66} cy={32} r={6} fill={YELLOW} {...thin(1.6)} />
    <Tube d="M92 78 L106 92" w={6} color={LILAC} />
    <circle cx={82} cy={66} r={18} fill="#fff" {...line} />
    <Face cx={82} cy={66} s={0.6} />
    <Sparkle x={104} y={20} />
  </g>
);

export const OpenCvArt: React.FC = () => {
  const rings = [
    { x: 60, y: 30, c: '#ff9a8f' },
    { x: 37, y: 68, c: MINT },
    { x: 83, y: 68, c: BLUE },
  ];
  return (
    <g>
      {rings.map((r) => (
        <circle key={`o${r.x}`} cx={r.x} cy={r.y} r={16} fill="none" stroke={OUT} strokeWidth={13} style={sw(13)} />
      ))}
      {rings.map((r) => (
        <circle key={`c${r.x}`} cx={r.x} cy={r.y} r={16} fill="none" stroke={r.c} strokeWidth={8} style={sw(8)} />
      ))}
      <Face cx={60} cy={30} s={0.5} />
      <Sparkle x={100} y={18} />
      <Sparkle x={18} y={24} s={4.5} color={LILAC} />
    </g>
  );
};

export const KerasArt: React.FC = () => (
  <g>
    <rect x={26} y={16} width={68} height={68} rx={17} fill="#ff9aa2" {...line} />
    <Shine d="M34 30 Q35 23 42 22" />
    <Tube d="M51 30 V54 M51 43 L67 30 M55 40 L68 54" w={3.2} color="#fff" />
    <Face cx={60} cy={66} s={0.85} />
    <Sparkle x={15} y={24} />
    <Sparkle x={106} y={70} s={5} color={LILAC} />
  </g>
);

export const SklearnArt: React.FC = () => (
  <g>
    <path d="M16 10 V86 H108" fill="none" {...thin(2.6)} />
    <Tube d="M26 80 C50 72 58 40 100 26" w={3} color={LILAC} />
    {[
      [34, 30],
      [44, 24],
      [42, 40],
      [30, 44],
    ].map(([x, y]) => (
      <circle key={`o${x}${y}`} cx={x} cy={y} r={5} fill="#ffb36b" {...thin(1.5)} />
    ))}
    {[
      [76, 62],
      [88, 56],
      [86, 72],
      [98, 66],
    ].map(([x, y]) => (
      <circle key={`b${x}${y}`} cx={x} cy={y} r={5} fill={BLUE} {...thin(1.5)} />
    ))}
    <circle cx={58} cy={56} r={11} fill={YELLOW} {...line} strokeWidth={2.2} />
    <Face cx={58} cy={56} s={0.52} />
    <Sparkle x={100} y={14} s={4.5} />
  </g>
);

export const NumpyArt: React.FC = () => {
  const fills = [SKY, YELLOW, LILAC];
  return (
    <g>
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={26 + c * 23}
            y={16 + r * 23}
            width={21}
            height={21}
            rx={5}
            fill={fills[(r + c) % 3]}
            {...line}
            strokeWidth={2.2}
          />
        )),
      )}
      <Face cx={60.5} cy={50} s={0.5} />
      <Sparkle x={14} y={20} />
      <Sparkle x={106} y={82} s={4.5} color={PINK} />
    </g>
  );
};

export const PandasArt: React.FC = () => (
  <g>
    <circle cx={34} cy={28} r={12} fill={OUT} />
    <circle cx={86} cy={28} r={12} fill={OUT} />
    <ellipse cx={60} cy={56} rx={36} ry={31} fill="#fff" {...line} />
    <ellipse cx={46} cy={54} rx={8} ry={11} transform="rotate(-25 46 54)" fill={OUT} />
    <ellipse cx={74} cy={54} rx={8} ry={11} transform="rotate(25 74 54)" fill={OUT} />
    <circle cx={47.5} cy={52.5} r={2.6} fill="#fff" />
    <circle cx={72.5} cy={52.5} r={2.6} fill="#fff" />
    <ellipse cx={60} cy={64} rx={4.5} ry={3.2} fill={OUT} />
    <path d="M55 68.5 Q60 73 65 68.5" fill="none" {...thin(1.9)} />
    <ellipse cx={37} cy={68} rx={4.5} ry={2.8} fill={CHEEK} opacity={0.85} />
    <ellipse cx={83} cy={68} rx={4.5} ry={2.8} fill={CHEEK} opacity={0.85} />
    <path d="M100 86 Q106 70 104 58" fill="none" stroke="#7fcf8a" strokeWidth={4} strokeLinecap="round" />
    <path d="M104 64 Q112 60 114 66 Q108 70 104 64 Z" fill={MINT} {...thin(1.4)} />
    <Sparkle x={16} y={84} s={4.5} color={LILAC} />
  </g>
);

export const MaskRcnnArt: React.FC = () => (
  <g>
    <rect x={12} y={14} width={96} height={74} rx={11} fill="#f3f0ff" {...line} />
    <path
      d="M38 78 C36 58 40 48 46 44 L44 32 L55 40 Q60 39 65 40 L76 32 L74 44 C80 48 84 58 82 78 Z"
      fill="#ffc3e6"
      {...thin(2.2)}
    />
    <rect x={30} y={26} width={60} height={56} rx={4} fill="none" stroke="#f36fa0" strokeWidth={2.4} strokeDasharray="6 4" />
    <rect x={30} y={18} width={22} height={9} rx={3} fill="#f36fa0" />
    <Face cx={60} cy={60} s={0.7} />
    <Sparkle x={104} y={10} s={4.5} />
  </g>
);

export const TransferArt: React.FC = () => (
  <g>
    <Tube d="M34 38 Q60 6 86 38" w={3} color={YELLOW} />
    <path d="M86 38 L84 29 M86 38 L77 37" fill="none" {...thin(2.6)} />
    <circle cx={28} cy={62} r={20} fill={LILAC} {...line} />
    <Face cx={28} cy={63} s={0.6} />
    <circle cx={92} cy={62} r={20} fill={MINT} {...line} />
    <Face cx={92} cy={63} s={0.6} />
    <Sparkle x={60} y={20} s={7} />
    <Sparkle x={60} y={86} s={4} color={PINK} />
  </g>
);

export const CnnArt: React.FC = () => (
  <g>
    <rect x={46} y={10} width={46} height={46} rx={9} fill={LILAC} {...line} />
    <rect x={35} y={22} width={46} height={46} rx={9} fill={SKY} {...line} />
    <rect x={24} y={34} width={46} height={46} rx={9} fill={YELLOW} {...line} />
    <Face cx={47} cy={57} s={0.75} />
    <Tube d="M80 72 H96" w={3} color={PINK} />
    <circle cx={103} cy={72} r={5.5} fill={PINK} {...thin(1.8)} />
    <Sparkle x={104} y={18} s={4.5} />
  </g>
);
