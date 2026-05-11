import React from 'react';

const socials = [
  { href: 'https://github.com/aimansiddiqui', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/aimansiddiqui', label: 'LinkedIn' },
  { href: 'mailto:hello@example.com', label: 'Email' },
];

const TailwindFooter: React.FC = () => {
  return (
    <footer className="border-t border-[#f1dbe4] mt-16 py-8 bg-white/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 text-center text-[#6b5b72]">
        <div className="flex items-center justify-center gap-6 mb-4">
          {socials.map(s => (
            <a key={s.href} href={s.href} className="hover:underline hover:text-[#d96b9d]">{s.label}</a>
          ))}
        </div>
        <div className="text-sm">© {new Date().getFullYear()} Aiman Siddiqui</div>
      </div>
    </footer>
  );
};

export default TailwindFooter;
