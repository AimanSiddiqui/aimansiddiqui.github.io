import React from 'react';
import ContactForm from './ContactForm';

const ContactSection: React.FC = () => {
  return (
    <footer id="contact" className="py-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.24em] text-panda-bamboo">Finish Line</p>
          <h2 className="mt-2 text-4xl font-extrabold text-[#483b5a] mb-4">Let's Build Together</h2>
          <p className="text-[#6b5b72]">Have a project in mind? Reach out and let's create something amazing.</p>
        </div>

        {/* Contact Form */}
        <div className="mb-16">
          <ContactForm />
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center justify-center gap-6 mb-8">
          <div className="flex gap-6">
            <a href="https://github.com/aimansiddiqui" target="_blank" rel="noopener noreferrer" className="text-[#6b5b72] hover:text-[#d96b9d] transition-colors font-semibold">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/aimansiddiqui" target="_blank" rel="noopener noreferrer" className="text-[#6b5b72] hover:text-[#d96b9d] transition-colors font-semibold">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="text-center text-[#6b5b72]/70 text-sm">
          © {new Date().getFullYear()} Aiman Siddiqui. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
