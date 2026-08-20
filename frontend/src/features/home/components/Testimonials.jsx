import React from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Sharing my zero-budget organic farming techniques with young agriculture students through Setu gave me a renewed sense of purpose.",
      name: "Ramesh Kumar",
      role: "Farmer & Elder (Bihar)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "I learned ancient pottery methods directly from Sita Devi. Her patience and guidance helped me preserve a craft that was almost extinct in our district.",
      name: "Neha Patel",
      role: "Artisan Learner (Gujarat)",
      avatar: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Setu's AI verification makes it easy to understand the scientific reasons behind age-old Ayurvedic remedies.",
      name: "Dr. Amit Sharma",
      role: "Ayurvedic Researcher (Kerala)",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 14 },
    },
  };

  return (
    <section
      style={{ background: '#FFFFFF' }}
      className="py-24 bg-[#FFFFFF] border-y border-slate-100 shadow-[0_4px_20px_rgba(15,23,42,0.015)] relative overflow-hidden w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 relative z-10"
      >
        
        {/* Section header */}
        <div className="flex flex-col items-center text-center space-y-4.5 max-w-2xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary bg-brand-light/60 px-4 py-1.5 rounded-full border border-brand-primary/10">
            Community Voices
          </span>
          <h2 className="text-3xl md:text-[44px] font-black text-slate-900 tracking-tight leading-tight">
            Stories of <span className="heading-serif italic font-normal text-gradient-saffron">Connection</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed font-semibold">
            Read how Setu is transforming lives by linking wisdom keepers with eager learners.
          </p>
        </div>

        {/* Testimonials cards grid with staggered animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-7"
        >
          {testimonials.map((t, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <TestimonialCard
                quote={t.quote}
                name={t.name}
                role={t.role}
                avatar={t.avatar}
              />
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}
