import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { SiReact, SiNodedotjs, SiPostgresql } from 'react-icons/si';
import { FaToolbox } from 'react-icons/fa6';

const items = [
  {
    title: 'Cross-Platform Mobile & Web Apps',
    desc: 'Build responsive web apps and cross-platform mobile apps (React, PWA, React Native) focused on performance, accessibility and conversions for businesses.',
    icon: SiReact,
  },
  {
    title: 'Serverless, Scalable Backends',
    desc: 'Design cost-effective, serverless backend architectures (AWS Lambda, Cloud Functions) with auto-scaling, observability and CI/CD for rapid growth.',
    icon: SiNodedotjs,
  },
  {
    title: 'Database & Cloud Infrastructure',
    desc: 'Robust data design with Postgres/NoSQL, caching and cloud-native patterns to ensure reliability, low latency and cost-efficiency.',
    icon: SiPostgresql,
  },
  {
    title: 'Dev Tools & Launch Readiness',
    desc: 'Proficiency in Git, CI/CD, Docker, monitoring and SEO-friendly frontend patterns to launch business-ready web platforms.',
    icon: FaToolbox,
  },
];

const ExpertiseCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section id="expertise" className="py-20">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-panda-bamboo">Spotlight</p>
        <h2 className="mt-2 text-3xl font-extrabold text-[#483b5a]">Core Expertise</h2>
      </div>

      <div className="mx-auto max-w-6xl px-2">
        {/* Small screens: horizontal scroll */}
        <div
          ref={containerRef}
          className="lg:hidden flex gap-4 overflow-x-auto no-scrollbar py-2"
          aria-label="Core expertise carousel"
        >
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <article
                key={it.title}
                className="min-w-[18rem] shrink-0 rounded-2xl border border-white/70 bg-gradient-to-br from-white to-[#fff8fb] p-5 shadow-[0_10px_30px_rgba(234,180,200,0.06)]"
              >
                <div className="flex flex-col items-start gap-4">
                  <div className="rounded-xl p-3 bg-white/90 text-[#483b5a] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#483b5a]">{it.title}</h3>
                    <p className="mt-1 text-sm text-[#6b5b72]">{it.desc}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Large screens: four-column grid */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8 lg:py-6">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <motion.article
                key={it.title}
                className="rounded-2xl border border-white/70 bg-gradient-to-br from-white to-[#fff8fb] p-8 text-center shadow-[0_10px_30px_rgba(234,180,200,0.06)]"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 280 }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-full p-4 bg-white/95 text-[#483b5a] shadow-sm">
                    <Icon className="h-12 w-12" />
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-[#483b5a]">{it.title}</h3>
                  <p className="mt-2 text-sm text-[#6b5b72] leading-relaxed">{it.desc}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseCarousel;
