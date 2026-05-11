import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import experiences from '../../data/experience.json';

const ExperienceSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24">
      <div className="mb-8 text-center px-4 sm:px-0">
        <p className="text-sm uppercase tracking-[0.24em] text-[#d96b9d]">Checkpoint</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#483b5a]">Experience</h2>
      </div>

      <div className="mt-12 space-y-4">
        {experiences.map((exp, index) => (
          <motion.div
            key={`${exp.role}-${exp.company}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group"
          >
            <button
              type="button"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full text-left"
            >
              <div className={`relative overflow-hidden rounded-3xl border p-4 sm:p-6 backdrop-blur-sm transition-all duration-300 ${
                expandedIndex === index
                  ? 'border-[#efb2c7] bg-gradient-to-br from-white to-[#fff2f7] shadow-[0_0_0_1px_rgba(233,118,162,0.16),0_0_30px_rgba(233,118,162,0.12)]'
                  : 'border-white/70 bg-gradient-to-br from-white to-[#fff8fb] hover:border-[#efb2c7] hover:shadow-[0_0_0_1px_rgba(233,118,162,0.12),0_0_24px_rgba(233,118,162,0.08)]'
              }`}>
                {/* Animated background gradient on hover */}
                <div className={`absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 ${
                  expandedIndex === index
                    ? 'bg-gradient-to-br from-[#efb2c7]/45 to-[#c6e9ff]/25 opacity-100'
                    : 'bg-gradient-to-br from-[#f3d3df]/30 to-transparent opacity-0 group-hover:opacity-100'
                }`} />
                
                {/* Content */}
                <div className="relative">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    {/* Left: Company */}
                    <div className="flex flex-shrink-0 flex-col gap-1 sm:min-w-[8rem]">
                      <p className={`text-sm font-semibold ${
                        expandedIndex === index ? 'text-[#d96b9d]' : 'text-[#5f4d7d]/85'
                      }`}>{exp.company}</p>
                    </div>

                    {/* Center: Position/Role */}
                    <div className="flex-1 sm:mx-6 text-left sm:text-center">
                      <h3 className={`text-lg font-bold ${
                        expandedIndex === index ? 'text-[#483b5a]' : 'text-[#483b5a]/90'
                      }`}>{exp.role}</h3>
                    </div>

                    {/* Right: Duration Badge */}
                    <div className="flex flex-shrink-0 items-center gap-2 self-start sm:self-auto">
                      <div className={`h-8 inline-flex items-center justify-center rounded-lg  transition-all duration-300 
                      `}>
                          <span className="text-xs font-bold text-[#d96b9d]">{exp.period}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Expanded content */}
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 rounded-3xl border border-white/70 bg-gradient-to-br from-white to-[#fff8fb] p-4 sm:p-6 backdrop-blur-sm">
                    {/* Full description */}
                    {exp.description && (
                      <div className="mb-6 pb-6 border-b border-white/10">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d96b9d]/90">
                          Overview
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-[#5f4d7d]/90">
                          {exp.description}
                        </p>
                      </div>
                    )}

                    {/* Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-panda-bamboo/90">
                          Key Achievements
                        </h4>
                        <ul className="mt-4 space-y-3">
                          {exp.achievements.map((achievement, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex gap-3 text-sm text-[#5f4d7d]/85"
                            >
                              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-[#d96b9d] to-[#8b6dd6]" />
                              <span className="leading-relaxed">{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;