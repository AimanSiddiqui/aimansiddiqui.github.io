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
    <section id="expertise" className="py-16 sm:py-20">
      <div className="mb-8 text-center px-4">
        <p className="text-sm uppercase tracking-[0.24em] text-panda-bamboo">Spotlight</p>
        <h2 className="mt-2 text-3xl font-extrabold text-[#483b5a]">Core Expertise</h2>
      </div>

      {/* Mobile / tablet: snap carousel — full bleed so cards reach screen edges */}
      <div
        ref={containerRef}
        className="lg:hidden flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-2 px-4 sm:px-6"
        aria-label="Core expertise carousel"
      >
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <article
              key={it.title}
              className="w-[80vw] sm:w-[44vw] md:w-[36vw] shrink-0 snap-start rounded-2xl border border-white/70 bg-gradient-to-br from-white to-[#fff8fb] p-5 shadow-[0_10px_30px_rgba(234,180,200,0.06)]"
            >
              <div className="flex flex-col gap-4 h-full">
                <div className="rounded-xl p-3 bg-white/90 text-[#483b5a] shadow-sm self-start">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#483b5a] leading-snug">{it.title}</h3>
                  <p className="mt-2 text-sm text-[#6b5b72] leading-relaxed">{it.desc}</p>
                </div>
              </div>
            </article>
          );
        })}
        {/* trailing spacer so last card scrolls fully into view */}
        <div className="w-4 sm:w-6 shrink-0" aria-hidden="true" />
      </div>

      {/* Desktop: four-column grid */}
      <div className="hidden lg:block mx-auto max-w-6xl px-6 xl:px-0">
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8 py-4">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <motion.article
                key={it.title}
                className="rounded-2xl border border-white/70 bg-gradient-to-br from-white to-[#fff8fb] p-6 xl:p-8 text-center shadow-[0_10px_30px_rgba(234,180,200,0.06)]"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 280 }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-full p-4 bg-white/95 text-[#483b5a] shadow-sm">
                    <Icon className="h-10 w-10 xl:h-12 xl:w-12" />
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-[#483b5a] leading-snug">{it.title}</h3>
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
