import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, MapPin } from 'lucide-react';

export default function Stats() {
  const statsList = [
    { value: '1,200+', label: 'Stories Preserved', icon: BookOpen, color: 'text-orange-500', bg: 'bg-orange-50/80 border-orange-100/50' },
    { value: '850+', label: 'Active Mentors', icon: Users, color: 'text-amber-500', bg: 'bg-amber-50/80 border-amber-100/50' },
    { value: '98%', label: 'Trust Rating', icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-50/80 border-emerald-100/50' },
    { value: '45+', label: 'Regions Covered', icon: MapPin, color: 'text-blue-500', bg: 'bg-blue-50/80 border-blue-100/50' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 14 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-gradient-to-b from-[#FCFAF7] via-[#FFFDFB] to-[#FCFAF7] rounded-[48px] border border-orange-100/30 relative overflow-hidden"
    >
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-brand-light/20 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Stats introduction */}
        <div className="lg:col-span-5 text-left space-y-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary bg-brand-light/60 px-4.5 py-1.5 rounded-full border border-brand-primary/10">
            Platform Metrics
          </span>
          <h2 className="text-3.5xl md:text-[44px] font-black tracking-tight leading-[1.1] text-slate-900">
            Preserving History,<br />
            <span className="heading-serif italic font-normal text-gradient-saffron">One Story at a Time.</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed font-semibold">
            Every bridge built is a legacy preserved. Through community dedication and intelligent tools, we are capturing wisdom before it fades away.
          </p>
        </div>

        {/* Right Side: 2x2 Grid of clean professional cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-100px' }}
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {statsList.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="bg-white p-8 rounded-[32px] border border-slate-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_40px_rgba(255,159,67,0.05)] hover:border-brand-primary/20 transition-all duration-350 hover:-translate-y-1 flex flex-col justify-between h-[180px] group cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className={`w-11 h-11 rounded-2xl ${stat.bg} border flex items-center justify-center ${stat.color} transition-transform duration-300 group-hover:scale-105`}>
                    <IconComponent className="w-5.5 h-5.5" strokeWidth={2.2} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-300 group-hover:text-brand-primary/45 transition-colors">↳</span>
                </div>
                <div className="space-y-1 text-left">
                  <p className="text-3xl md:text-[36px] font-black tracking-tight text-slate-900 leading-none">{stat.value}</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </motion.section>
  );
}
