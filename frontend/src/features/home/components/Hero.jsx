import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ onGetStarted, onLearnMore }) {
  // Animation variants for staggered load
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const [typedText, setTypedText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [typingSpeed, setTypingSpeed] = React.useState(650);
  const fullText = "Preserving Wisdom.";

  React.useEffect(() => {
    let timer;
    const handleType = () => {
      const isComplete = !isDeleting && typedText === fullText;
      const isDeleted = isDeleting && typedText === '';

      if (isComplete) {
        setTypingSpeed(2500);
        setIsDeleting(true);
      } else if (isDeleted) {
        setIsDeleting(false);
        setTypingSpeed(800);
      } else {
        setTypedText(prev =>
          isDeleting
            ? fullText.slice(0, prev.length - 1)
            : fullText.slice(0, prev.length + 1)
        );
        setTypingSpeed(isDeleting ? 60 : 100);
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, typingSpeed]);

  return (
    <section className="relative pt-40 pb-28 md:pt-48 md:pb-36 text-slate-900 overflow-hidden min-h-screen flex items-center">

      {/* 1. Blended Full-Bleed Background Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 select-none">
        {/* Desktop Gradient Mask (fades left to right) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FCFAF7]/95 via-[#FCFAF7]/75 to-[#FCFAF7]/20 z-10 lg:block hidden"></div>
        {/* Mobile Gradient Mask (fades bottom to top) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF7]/98 via-[#FCFAF7]/80 to-[#FCFAF7]/35 z-10 lg:hidden block"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-[70%_center] sm:object-center opacity-85"
        >
          <source src="/Setu_Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 2. Soft background glowing gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#FF9F43]/10 via-orange-300/5 to-transparent rounded-full blur-[120px] -z-25 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-blue-200/10 via-indigo-100/5 to-transparent rounded-full blur-[140px] -z-25"></div>

      {/* 3. Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl md:max-w-3xl flex flex-col items-start text-left space-y-9"
        >
          {/* Tagline Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2.5 bg-white/80 border border-orange-100/70 rounded-full px-4.5 py-1.5 shadow-[0_2px_8px_rgba(255,159,67,0.04)]"
          >
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase">
              ✨ Introducing Setu
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4.5xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.08] text-slate-900"
          >
            Bridging Generations,<br />
            <span className="heading-highlight">
              {typedText}
              <span className="animate-pulse ml-0.5" style={{ display: 'inline-block', opacity: 0.8 }}>|</span>
            </span>
          </motion.h1>

          {/* Supporting Description */}
          <motion.p
            variants={itemVariants}
            className="text-slate-600 text-base sm:text-[16px] font-semibold leading-relaxed max-w-xl"
          >
            Setu is a dedicated bridge connecting the vibrant youth of today with the rich experiences of older generations. Share life stories, pass on language dialects, collaborate on cultural traditions, and create lasting personal mentorships.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3.5 sm:space-y-0 sm:space-x-4.5 w-full sm:w-auto pt-2"
          >
            <button
              type="button"
              onClick={onGetStarted}
              className="px-9 py-4.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-black rounded-full shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Sign Up</span>
              <span className="text-base">→</span>
            </button>
            <button
              type="button"
              onClick={onLearnMore}
              className="px-9 py-4.5 bg-white hover:bg-slate-50 text-slate-850 hover:text-slate-900 border border-slate-200/80 text-[14px] font-black rounded-full transition-all duration-300 text-center cursor-pointer shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:-translate-y-0.5"
            >
              Explore Stories
            </button>
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
}
