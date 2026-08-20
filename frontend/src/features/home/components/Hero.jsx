import React from 'react';
import { motion } from 'framer-motion';
import CardSwap, { Card } from '@/components/ui/CardSwap';

export default function Hero({ onGetStarted, onLearnMore }) {
  // Animation variants for staggered load
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
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
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 text-slate-900 overflow-hidden min-h-[92vh] flex items-center bg-[#FFF7ED]">

      {/* 1. Blended Full-Bleed Background Atmosphere & Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 select-none">
        {/* Desktop Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF7ED] via-[#FFF7ED]/85 to-[#FFF7ED]/30 z-10 lg:block hidden" />
        {/* Mobile Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF7ED] via-[#FFF7ED]/90 to-[#FFF7ED]/40 z-10 lg:hidden block" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-[70%_center] sm:object-center opacity-70"
        >
          <source src="/Setu_Video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. Soft Background Glowing Nebulas */}
      <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-orange-500/10 via-amber-300/5 to-transparent rounded-full blur-[130px] -z-20 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-orange-100/10 to-transparent rounded-full blur-[140px] -z-20 pointer-events-none" />

      {/* 3. Main Hero Two-Column Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ========================================================================= */}
          {/* Left Column: Content & Typography (45% on desktop) */}
          {/* ========================================================================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left space-y-7"
          >
            {/* Small Premium Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2.5 bg-white/90 backdrop-blur-md border border-orange-200/60 rounded-full px-4 py-1.5 shadow-[0_2px_10px_rgba(249,115,22,0.06)]"
            >
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-[11px] font-black text-slate-800 tracking-wider uppercase">
                Bridging Generations
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl xl:text-[54px] font-black tracking-[-0.03em] leading-[1.08] text-slate-900"
            >
              Bridging Generations,<br />
              <span className="heading-serif italic font-normal text-gradient-saffron block mt-1">
                {typedText || fullText}
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              variants={itemVariants}
              className="text-slate-600 text-[15px] sm:text-[16px] font-medium leading-[1.7] max-w-lg"
            >
              Connecting generations through stories, skills, traditions and wisdom that deserve to live forever.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto pt-2"
            >
              <button
                type="button"
                onClick={onGetStarted}
                className="px-6 py-3.5 bg-brand-primary hover:bg-brand-hover text-white text-[14px] font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center space-x-2 shadow-sm hover:shadow-md hover:shadow-orange-500/20"
              >
                <span>Get Started</span>
                <span className="text-base">→</span>
              </button>
              <button
                type="button"
                onClick={onLearnMore}
                className="px-6 py-3.5 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300 text-[14px] font-bold rounded-2xl transition-all duration-300 text-center cursor-pointer shadow-xs hover:-translate-y-0.5 hover:shadow-sm"
              >
                Explore Stories
              </button>
            </motion.div>
          </motion.div>

          {/* ========================================================================= */}
          {/* Right Column: Editorial GSAP CardSwap 3D Deck (55% on desktop) */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center items-center py-6 lg:py-0 w-full"
          >
            {/* 3D CardSwap Container */}
            <div className="w-full max-w-[430px] sm:max-w-[450px] lg:max-w-[460px]">
              <CardSwap
                width={430}
                height={320}
                cardDistance={45}
                verticalDistance={55}
                delay={4000}
                pauseOnHover={true}
                skewAmount={4}
                easing="elastic"
              >
                {/* Card 01 — Stories */}
                <Card
                  category="STORIES & MEMORIES"
                  heading="Every story carries a piece of history."
                  description="Listen to experiences, memories and lessons passed down through generations."
                  number="01 / 05"
                  actionLabel="Preserve Stories"
                  ambientGradient="linear-gradient(135deg, #FFFDF9 0%, #FFF7ED 100%)"
                  glowColor="rgba(249, 115, 22, 0.16)"
                  categoryAccent="#EA580C"
                  onActionClick={onLearnMore}
                />

                {/* Card 02 — Traditional Skills */}
                <Card
                  category="TRADITIONAL SKILLS"
                  heading="Skills that should never be forgotten."
                  description="Discover craftsmanship, techniques and practical wisdom shared by experienced hands."
                  number="02 / 05"
                  actionLabel="Learn Skills"
                  ambientGradient="linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)"
                  glowColor="rgba(59, 130, 246, 0.14)"
                  categoryAccent="#2563EB"
                  onActionClick={onLearnMore}
                />

                {/* Card 03 — Agriculture */}
                <Card
                  category="AGRICULTURE"
                  heading="Generations of knowledge, rooted in the soil."
                  description="Explore traditional farming practices, seasonal wisdom and sustainable ways of growing."
                  number="03 / 05"
                  actionLabel="Explore Knowledge"
                  ambientGradient="linear-gradient(135deg, #FCFDF9 0%, #F4F7EE 100%)"
                  glowColor="rgba(34, 197, 94, 0.14)"
                  categoryAccent="#16A34A"
                  onActionClick={onLearnMore}
                />

                {/* Card 04 — Culture */}
                <Card
                  category="CULTURE & HERITAGE"
                  heading="Culture lives when we share it."
                  description="Discover regional traditions, festivals, languages and customs that shape our identity."
                  number="04 / 05"
                  actionLabel="Discover Heritage"
                  ambientGradient="linear-gradient(135deg, #FFFCF7 0%, #FFF4E5 100%)"
                  glowColor="rgba(245, 158, 11, 0.16)"
                  categoryAccent="#D97706"
                  onActionClick={onLearnMore}
                />

                {/* Card 05 — Recipes */}
                <Card
                  category="FOOD & RECIPES"
                  heading="Some recipes carry generations of memories."
                  description="Preserve family recipes, regional flavors and the stories behind every dish."
                  number="05 / 05"
                  actionLabel="Revive Recipes"
                  ambientGradient="linear-gradient(135deg, #FFFBF9 0%, #FFEFE8 100%)"
                  glowColor="rgba(249, 115, 22, 0.16)"
                  categoryAccent="#F97316"
                  onActionClick={onLearnMore}
                />
              </CardSwap>
            </div>

            {/* Minimal Deck Sub-label */}
            <div className="mt-8 flex items-center space-x-2 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <span>5 knowledge categories · 1 shared bridge</span>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}


