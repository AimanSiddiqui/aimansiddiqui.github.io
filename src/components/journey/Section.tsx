import React from 'react';

type Props = {
  id?: string;
  title?: string;
  children: React.ReactNode;
};

const Section: React.FC<Props> = ({ id, title, children }) => {
  return (
    <section id={id} className="py-16 sm:py-20 lg:py-24">
      {title && <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#5f4d7d] via-[#d96b9d] to-[#e8a85f]">{title}</h2>}
      <div>{children}</div>
    </section>
  );
};

export default Section;
