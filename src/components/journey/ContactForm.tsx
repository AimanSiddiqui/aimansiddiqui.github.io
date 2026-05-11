import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  // Initialize EmailJS once
  React.useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          reply_to: formData.email,
        }
      );

      if (result.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Email send error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {/* Name */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-2xl border border-white/70 bg-gradient-to-br from-white to-[#fff8fb] text-[#483b5a] placeholder-[#6b5b72]/50 focus:outline-none focus:ring-2 focus:ring-[#d96b9d]/50 transition-all"
        />
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-2xl border border-white/70 bg-gradient-to-br from-white to-[#fff8fb] text-[#483b5a] placeholder-[#6b5b72]/50 focus:outline-none focus:ring-2 focus:ring-[#d96b9d]/50 transition-all"
        />
      </div>

      {/* Subject */}
      <div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-2xl border border-white/70 bg-gradient-to-br from-white to-[#fff8fb] text-[#483b5a] placeholder-[#6b5b72]/50 focus:outline-none focus:ring-2 focus:ring-[#d96b9d]/50 transition-all"
        />
      </div>

      {/* Message */}
      <div>
        <textarea
          name="message"
          placeholder="Your message..."
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-2xl border border-white/70 bg-gradient-to-br from-white to-[#fff8fb] text-[#483b5a] placeholder-[#6b5b72]/50 focus:outline-none focus:ring-2 focus:ring-[#d96b9d]/50 transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#d96b9d] to-[#8b6dd6] text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:scale-100"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </motion.button>

      {/* Status Messages */}
      {status === 'success' && (
        <motion.div
          className="p-4 rounded-2xl bg-green-100 text-green-700 text-center font-semibold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          ✓ Message sent successfully! I'll get back to you soon.
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          className="p-4 rounded-2xl bg-red-100 text-red-700 text-center font-semibold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          ✗ Failed to send message. Please try again or email directly.
        </motion.div>
      )}
    </motion.form>
  );
};

export default ContactForm;
