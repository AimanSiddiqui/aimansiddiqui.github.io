import React from 'react';

const navItems = [
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const TailwindHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/6">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#" className="text-xl font-bold">Aiman Siddiqui</a>
        <nav>
          <ul className="flex items-center gap-4">
            {navItems.map((n) => (
              <li key={n.href}><a href={n.href} className="text-sm text-slate-200 hover:text-white transition">{n.label}</a></li>
            ))}
            <li>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-200 hover:underline">Resume</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default TailwindHeader;
