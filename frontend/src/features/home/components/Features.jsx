import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sprout, Cpu, Users } from 'lucide-react';
import FeatureCard from './FeatureCard';

export default function Features({ onViewChange }) {
  const featuresList = [
    {
      icon: Brain,
      title: 'Preserve Wisdom',
      description: 'Document and safeguard traditional practices, oral histories, and cultural heritage for future generations before they are lost.',
      targetView: 'legacy'
    },
    {
      icon: Sprout,
      title: 'Intergenerational Learning',
      description: 'Connect youth with experienced elders to learn traditional skills, local farming methods, and valuable life lessons.',
      targetView: 'community'
    },
    {
      icon: Cpu,
      title: 'AI Verification',
      description: 'Use AI algorithms to analyze, summarize, and cross-check traditional knowledge with modern scientific understanding.',
      targetView: 'library'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Foster meaningful connections, mentorships, and active discussions between young learners and senior storytellers.',
      targetView: 'community'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 15 },
    },
  };

  return (
    <section
      style={{ background: '#FFFFFF' }}
      className="py-24 bg-[#FFFFFF] border-y border-slate-100 shadow-[0_4px_20px_rgba(15,23,42,0.015)] relative overflow-hidden w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 relative z-10"
      >
        
        {/* Section header */}
        <div className="flex flex-col items-center text-center space-y-4.5 max-w-2xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary bg-brand-light/50 px-4.5 py-1.5 rounded-full border border-brand-primary/10">
            Core Features
          </span>
          <h2 className="text-3xl md:text-[42px] font-black text-slate-900 tracking-tight leading-tight">
            Bridging the <span className="heading-serif italic font-normal text-brand-primary">Past &amp; Present</span>
          </h2>
          <p className="text-slate-555 text-sm md:text-[15px] leading-relaxed font-semibold max-w-xl">
            Setu combines community storytelling with intelligent knowledge management to keep ancestral wisdom vibrant and accessible.
          </p>
        </div>

        {/* Feature cards grid with staggered spring animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7"
        >
          {featuresList.map((feat, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <FeatureCard
                number={String(index + 1).padStart(2, '0')}
                icon={feat.icon}
                title={feat.title}
                description={feat.description}
                onClick={() => onViewChange && onViewChange(feat.targetView)}
              />
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}

