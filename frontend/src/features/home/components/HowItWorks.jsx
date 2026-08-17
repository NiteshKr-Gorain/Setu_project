import React from 'react';
import { motion } from 'framer-motion';
import StepCard from './StepCard';

export default function HowItWorks() {
  const stepsList = [
    {
      number: '01',
      title: '01 — Discover',
      description: 'Explore verified knowledge entries, language dialects, and cultural heritage curated through dual-source AI.'
    },
    {
      number: '02',
      title: '02 — Connect',
      description: 'Establish secure mentorships, send messages, and build deep relationships between young learners and experienced elders.'
    },
    {
      number: '03',
      title: '03 — Share & Preserve',
      description: 'Elders record folklore, sustainable farming methods, and artisan crafts, preserving them in a verified digital archive.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 85, damping: 14 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="py-24 bg-white rounded-[36px] border border-slate-100/80 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Subtle techy grid pattern bg accent inside the white container */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 relative z-10">
        
        {/* Section header */}
        <div className="flex flex-col items-center text-center space-y-4.5 max-w-2xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary bg-brand-light/60 px-4 py-1.5 rounded-full border border-brand-primary/10">
            Process Overview
          </span>
          <h2 className="text-3xl md:text-[42px] font-black text-slate-900 tracking-tight leading-tight">
            How Setu <span className="heading-serif italic font-normal text-brand-primary">Works</span>
          </h2>
          <p className="text-slate-555 text-sm md:text-[15px] leading-relaxed font-semibold max-w-xl">
            Three simple steps to bridge generations and preserve cultural heritage seamlessly.
          </p>
        </div>

        {/* Timeline connector track (visible on desktop) */}
        <div className="relative">
          <div className="absolute top-14 left-[15%] right-[15%] h-1 pointer-events-none hidden md:block -z-5">
            <svg className="w-full h-8" viewBox="0 0 800 32" fill="none">
              <path
                d="M 0 16 Q 200 32 400 16 T 800 16"
                stroke="#FF9F43"
                strokeWidth="2"
                strokeDasharray="8 8"
                className="opacity-35 animate-pulse"
              />
            </svg>
          </div>

          {/* Grid container with staggered motion load */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
          >
            {stepsList.map((step, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <StepCard
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
}

