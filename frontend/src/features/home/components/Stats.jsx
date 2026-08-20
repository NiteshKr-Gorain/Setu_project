import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, MapPin } from 'lucide-react';

export default function Stats() {
  const statsList = [
    { value: '1,200+', label: 'Stories Preserved', icon: BookOpen, color: 'text-orange-500', bg: 'bg-orange-50/90 border-orange-200/60' },
    { value: '850+', label: 'Active Mentors', icon: Users, color: 'text-amber-500', bg: 'bg-amber-50/90 border-amber-200/60' },
    { value: '98%', label: 'Trust Rating', icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-50/90 border-emerald-200/60' },
    { value: '45+', label: 'Regions Covered', icon: MapPin, color: 'text-blue-500', bg: 'bg-blue-50/90 border-blue-200/60' }
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 90, damping: 14 },
    },
  };

  // Radial positions for 4 stats around (280, 280) with radius R = 175px (w=180, h=180)
  // rotation = angle + 90deg so the narrow/needle bottom edge points inward to the center
  const radialPositions = [
    { left: '136px', top: '24px', rotation: 342 },  // Stat 1: North-West (252°) -> points down-right
    { left: '332px', top: '87px', rotation: 54 },   // Stat 2: North-East (324°) -> points down-left
    { left: '332px', top: '293px', rotation: 126 }, // Stat 3: South-East (36°)  -> points up-left
    { left: '136px', top: '356px', rotation: 198 }  // Stat 4: South-West (108°) -> points up-right
  ];

  return (
    <section
      className="py-24 bg-[#FFF7ED] border-y border-orange-100/30 relative overflow-hidden w-full text-slate-800"
    >
      {/* Warm Ambient Background Nebulas */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-500/5 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-amber-500/5 to-transparent blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10 w-full">
        
        {/* ========================================================================= */}
        {/* Mobile / Tablet View */}
        {/* ========================================================================= */}
        <div className="lg:hidden w-full flex flex-col space-y-12">
          {/* Text Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-left space-y-6"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary bg-brand-light/60 px-4.5 py-1.5 rounded-full border border-brand-primary/10 inline-block">
              Platform Metrics
            </span>
            <h2 className="text-3.5xl md:text-[44px] font-black tracking-tight leading-[1.1] text-slate-900">
              Preserving History,<br />
              <span className="heading-serif italic font-normal text-gradient-saffron">One Story at a Time.</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed font-semibold">
              Every bridge built is a legacy preserved. Through community dedication and intelligent tools, we are capturing wisdom before it fades away.
            </p>
          </motion.div>

          {/* 2x2 Grid on Mobile */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
            className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md mx-auto w-full"
          >
            {statsList.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="relative aspect-square w-full flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-105"
                >
                  <svg
                    viewBox="0 0 200 200"
                    className="absolute inset-0 w-full h-full drop-shadow-[0_8px_20px_rgba(249,115,22,0.06)] group-hover:drop-shadow-[0_16px_36px_rgba(249,115,22,0.2)] transition-all duration-300"
                  >
                    <defs>
                      <linearGradient id={`mobPaneGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
                        <stop offset="100%" stopColor="rgba(255, 247, 237, 0.85)" />
                      </linearGradient>
                      <linearGradient id={`mobPaneHoverGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.98)" />
                        <stop offset="100%" stopColor="rgba(255, 244, 229, 0.95)" />
                      </linearGradient>
                      <filter id={`mobBorderBlur-${idx}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                      </filter>
                    </defs>

                    {/* Blurred Glow Border on Hover */}
                    <path
                      d="M 55,10 L 145,10 Q 175,10 185,30 L 195,90 Q 198,110 185,130 L 150,182 Q 138,194 120,194 L 80,194 Q 62,194 50,182 L 15,130 Q 2,110 5,90 L 15,30 Q 25,10 55,10 Z"
                      fill="none"
                      stroke="rgba(249, 115, 22, 0.5)"
                      strokeWidth="5"
                      filter={`url(#mobBorderBlur-${idx})`}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    />

                    {/* Outer Cockpit Bezel with Soft Lite Color on Hover */}
                    <path
                      d="M 55,10 L 145,10 Q 175,10 185,30 L 195,90 Q 198,110 185,130 L 150,182 Q 138,194 120,194 L 80,194 Q 62,194 50,182 L 15,130 Q 2,110 5,90 L 15,30 Q 25,10 55,10 Z"
                      fill={`url(#mobPaneGrad-${idx})`}
                      stroke="#CBD5E1"
                      strokeWidth="2.5"
                      className="transition-all duration-300 group-hover:stroke-orange-400/80"
                    />

                    {/* Inner Glass Frame Highlight */}
                    <path
                      d="M 58,18 L 142,18 Q 168,18 177,35 L 186,90 Q 188,107 177,124 L 144,174 Q 133,184 118,184 L 82,184 Q 67,184 56,174 L 23,124 Q 12,107 14,90 L 23,35 Q 32,18 58,18 Z"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.9)"
                      strokeWidth="1.5"
                      className="transition-all duration-300 group-hover:stroke-orange-200/50"
                    />
                  </svg>

                  {/* Content Overlay */}
                  <div className="relative z-10 p-4 sm:p-6 flex flex-col items-center justify-center space-y-2.5 sm:space-y-3.5 text-center h-full w-full">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${stat.bg} border flex items-center justify-center ${stat.color} transition-all duration-300 group-hover:scale-110 shadow-sm`}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.2} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xl sm:text-2xl md:text-[28px] font-black tracking-tight text-slate-900 group-hover:text-gradient-saffron transition-all duration-300 leading-none">
                        {stat.value}
                      </p>
                      <p className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-500 leading-tight">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* Desktop View: Radial 5-Box Circular Cockpit Wheel */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Side: Stats introduction */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="col-span-5 text-left space-y-6"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary bg-brand-light/60 px-4.5 py-1.5 rounded-full border border-brand-primary/10 inline-block">
              Platform Metrics
            </span>
            <h2 className="text-3.5xl md:text-[44px] font-black tracking-tight leading-[1.1] text-slate-900">
              Preserving History,<br />
              <span className="heading-serif italic font-normal text-gradient-saffron">One Story at a Time.</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed font-semibold">
              Every bridge built is a legacy preserved. Through community dedication and intelligent tools, we are capturing wisdom before it fades away.
            </p>
          </motion.div>

          {/* Right Side: Circular 5-Box Radial Ring */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="col-span-7 flex justify-center items-center"
          >
            {/* 560x560 circular stage */}
            <div className="relative w-[560px] h-[560px] shrink-0">
              
              {/* Box 1 (West, 180°) - 5th Box: Transparent Empty Box facing the text */}
              <div
                className="absolute w-[180px] h-[180px] bg-transparent border-none shadow-none pointer-events-none"
                style={{
                  left: '15px',
                  top: '190px',
                  transform: 'rotate(270deg)'
                }}
              />

              {/* Boxes 2-5: The 4 Stats Cards, radially rotated so the needle/narrow bottom points to center */}
              {statsList.map((stat, idx) => {
                const IconComponent = stat.icon;
                const pos = radialPositions[idx];

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="absolute w-[180px] h-[180px] flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-105 z-10"
                    style={{
                      left: pos.left,
                      top: pos.top
                    }}
                  >
                    {/* Radially Rotated SVG Background Window Pane */}
                    <div
                      className="absolute inset-0 w-full h-full transition-transform duration-300"
                      style={{
                        transform: `rotate(${pos.rotation}deg)`
                      }}
                    >
                      <svg
                        viewBox="0 0 200 200"
                        className="w-full h-full drop-shadow-[0_8px_20px_rgba(249,115,22,0.06)] group-hover:drop-shadow-[0_16px_36px_rgba(249,115,22,0.2)] transition-all duration-300"
                      >
                        <defs>
                          <linearGradient id={`deskPaneGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
                            <stop offset="100%" stopColor="rgba(255, 247, 237, 0.85)" />
                          </linearGradient>
                          <linearGradient id={`deskPaneHoverGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.98)" />
                            <stop offset="100%" stopColor="rgba(255, 244, 229, 0.95)" />
                          </linearGradient>
                          <filter id={`deskBorderBlur-${idx}`} x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3.5" result="blur" />
                          </filter>
                        </defs>

                        {/* Blurred Glow Border Layer (Soft blurred aura on hover) */}
                        <path
                          d="M 55,10 L 145,10 Q 175,10 185,30 L 195,90 Q 198,110 185,130 L 150,182 Q 138,194 120,194 L 80,194 Q 62,194 50,182 L 15,130 Q 2,110 5,90 L 15,30 Q 25,10 55,10 Z"
                          fill="none"
                          stroke="rgba(249, 115, 22, 0.5)"
                          strokeWidth="5"
                          filter={`url(#deskBorderBlur-${idx})`}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        />

                        {/* Outer Cockpit Bezel with Soft Lite Color on Hover */}
                        <path
                          d="M 55,10 L 145,10 Q 175,10 185,30 L 195,90 Q 198,110 185,130 L 150,182 Q 138,194 120,194 L 80,194 Q 62,194 50,182 L 15,130 Q 2,110 5,90 L 15,30 Q 25,10 55,10 Z"
                          fill={`url(#deskPaneGrad-${idx})`}
                          stroke="#CBD5E1"
                          strokeWidth="2.5"
                          className="transition-all duration-300 group-hover:stroke-orange-400/80"
                        />

                        {/* Inner Glass Frame Highlight */}
                        <path
                          d="M 58,18 L 142,18 Q 168,18 177,35 L 186,90 Q 188,107 177,124 L 144,174 Q 133,184 118,184 L 82,184 Q 67,184 56,174 L 23,124 Q 12,107 14,90 L 23,35 Q 32,18 58,18 Z"
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.9)"
                          strokeWidth="1.5"
                          className="transition-all duration-300 group-hover:stroke-orange-200/50"
                        />
                      </svg>
                    </div>

                    {/* Upright Content Overlay (Readable & Horizontal) */}
                    <div className="relative z-10 p-5 flex flex-col items-center justify-center space-y-2.5 text-center h-full w-full">
                      <div
                        className={`w-11 h-11 rounded-2xl ${stat.bg} border flex items-center justify-center ${stat.color} transition-all duration-300 group-hover:scale-110 shadow-sm`}
                      >
                        <IconComponent className="w-5.5 h-5.5" strokeWidth={2.2} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-2xl md:text-[26px] font-black tracking-tight text-slate-900 group-hover:text-gradient-saffron transition-all duration-300 leading-none">
                          {stat.value}
                        </p>
                        <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500 leading-tight">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


