import React from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Sharing my zero-budget organic farming techniques with young agriculture students through Setu gave me a renewed sense of purpose.",
      name: "Ramesh Kumar",
      role: "Farmer & Elder (Bihar)",
      avatar: "https://images.unsplash.com/photo-1609010604666-615582c553fc?auto=format&fit=crop&w=150&h=150&q=80"
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
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="py-24 bg-gradient-to-b from-[#FCFAF7] via-[#FFFBF7] to-[#FCFAF7] rounded-[48px] border border-orange-100/30 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background glow spark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-light/20 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 relative z-10">
        
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

      </div>
    </motion.section>
  );
}
