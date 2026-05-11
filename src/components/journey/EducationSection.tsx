import React from 'react';
import { motion } from 'framer-motion';
import medalGif from '../../assets/medal.gif';
import education from '../../data/education.json';

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 text-center">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.24em] text-[#d96b9d]">Checkpoint</p>
        <h2 className="mt-2 text-4xl font-extrabold text-[#483b5a]">Education</h2>
      </div>

      <div className="grid gap-6">
        {education.map((item, index) => (
          <motion.article
            key={`${item.degree}-${item.school}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="glass rounded-3xl border border-white/70 p-6 bg-gradient-to-br from-white to-[#fff8fb]"
          >
            <div className="flex items-center justify-center gap-3">
              <h3 className="text-xl font-bold text-[#483b5a]">{item.degree}</h3>
              {(item.degree || '').toLowerCase().includes('bachelor') || (item.description || '').toLowerCase().includes('medal') ? (
                <img src={medalGif} alt="Medal" className="h-25 w-25 absolute -top-1 -right-1 " />
              ) : null}
            </div>
            <p className="mt-1 text-[#5f4d7d]/85">{item.school}</p>
            <p className="text-sm text-[#6b5b72]">{item.location}</p>
            <p className="mt-2 text-sm font-semibold text-[#d96b9d]">{item.period}</p>
            {item.description && <p className="mt-3 text-[#6b5b72]">{item.description}</p>}
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
