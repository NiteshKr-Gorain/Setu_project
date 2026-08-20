import React from 'react';
import { motion } from 'framer-motion';

export default function AboutUsPage({ onViewChange, onSignUpClick }) {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300">

      {/* 1. Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-amber-100/30 to-blue-100/30 rounded-full blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-6">
          <span className="inline-flex items-center space-x-1.5 bg-brand-light/60 border border-brand-primary/10 rounded-full px-4 py-1.5 text-xs font-semibold text-brand-hover tracking-wide uppercase">
            <span>✨ Introducing Setu</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Bridging Generations, <br />
            <span className="text-brand-primary">Preserving Wisdom</span>
          </h1>
          <p className="text-base text-slate-550 leading-relaxed font-normal max-w-2xl mx-auto">
            Setu is a digital bridge built to unite the curiosity of youth with the deep, lived experiences of our elders. By passing down life stories, language dialects, and ancestral crafts, we keep the torch of human wisdom lit for generations to come.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 space-y-20">

        {/* 2. Our Mission & Vision — Premium Redesign */}
        <section className="relative -mx-6 md:-mx-12 px-6 md:px-12 py-20 overflow-hidden">

          {/* Warm ambient background */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: [
                'radial-gradient(circle at 12% 18%, rgba(245,158,11,0.07), transparent 32%)',
                'radial-gradient(circle at 88% 82%, rgba(59,130,246,0.05), transparent 32%)',
                'radial-gradient(circle at 55% 50%, rgba(249,115,22,0.03), transparent 45%)',
                '#FAFAF9',
              ].join(', '),
            }}
          />
          {/* Decorative blurred circles */}
          <div className="absolute top-6 left-[8%] w-48 h-48 rounded-full bg-amber-300/10 blur-[60px] pointer-events-none" />
          <div className="absolute bottom-6 right-[6%] w-56 h-56 rounded-full bg-blue-300/10 blur-[70px] pointer-events-none" />

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="text-center mb-14 space-y-4"
          >
            <span className="inline-block text-[11px] font-bold uppercase tracking-[2px] text-amber-600">
              Our Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Building Bridges Between Generations
            </h2>
            <p className="text-[15px] text-slate-500 leading-[1.75] font-normal max-w-[660px] mx-auto">
              Setu brings generations together to share knowledge, preserve memories and keep timeless wisdom alive.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -3, borderColor: 'rgba(245,158,11,0.3)', boxShadow: '0 14px 40px rgba(15,23,42,0.07)' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05, hover: { duration: 0.28, ease: 'easeOut', delay: 0 } }}
              className="group relative bg-white border border-black/[0.06] rounded-[24px] p-9 overflow-hidden cursor-default"
              style={{ boxShadow: '0 8px 30px rgba(15,23,42,0.04)' }}
            >
              {/* Bridge decoration — faint curved SVG arc */}
              <svg
                aria-hidden="true"
                className="absolute bottom-4 right-4 opacity-[0.04] w-40 h-40 pointer-events-none"
                viewBox="0 0 160 160" fill="none"
              >
                <path d="M10 120 Q80 20 150 120" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
                <circle cx="10" cy="120" r="6" fill="#F59E0B" />
                <circle cx="150" cy="120" r="6" fill="#F59E0B" />
              </svg>

              {/* Icon */}
              <div className="w-11 h-11 rounded-[12px] bg-amber-50 flex items-center justify-center text-xl mb-6 group-hover:scale-105 transition-transform duration-300">
                🌉
              </div>

              {/* Label */}
              <span className="block text-[11px] font-bold uppercase tracking-[2px] text-amber-600 mb-3">
                Our Mission
              </span>

              {/* Heading */}
              <h3 className="text-2xl font-bold text-slate-900 leading-[1.25] mb-3">
                Connecting People Through Shared Wisdom
              </h3>

              {/* Accent line */}
              <div
                className="h-[2.5px] w-10 bg-amber-400 rounded-full mb-5 group-hover:w-16 transition-all duration-300"
              />

              {/* Description */}
              <p className="text-[15px] text-slate-500 leading-[1.75] font-normal">
                To empower seniors to share their priceless knowledge, traditions, and life lessons, while providing youth with authentic mentorship, cultural preservation, and intergenerational connection.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -3, borderColor: 'rgba(59,130,246,0.28)', boxShadow: '0 14px 40px rgba(15,23,42,0.07)' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12, hover: { duration: 0.28, ease: 'easeOut', delay: 0 } }}
              className="group relative bg-white border border-black/[0.06] rounded-[24px] p-9 overflow-hidden cursor-default"
              style={{ boxShadow: '0 8px 30px rgba(15,23,42,0.04)' }}
            >
              {/* Growth decoration — faint upward arc */}
              <svg
                aria-hidden="true"
                className="absolute bottom-4 right-4 opacity-[0.04] w-40 h-40 pointer-events-none"
                viewBox="0 0 160 160" fill="none"
              >
                <path d="M10 130 Q50 30 150 50" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
                <circle cx="150" cy="50" r="7" fill="#3B82F6" />
              </svg>

              {/* Icon */}
              <div className="w-11 h-11 rounded-[12px] bg-blue-50 flex items-center justify-center text-xl mb-6 group-hover:scale-105 transition-transform duration-300">
                🌱
              </div>

              {/* Label */}
              <span className="block text-[11px] font-bold uppercase tracking-[2px] text-blue-500 mb-3">
                Our Vision
              </span>

              {/* Heading */}
              <h3 className="text-2xl font-bold text-slate-900 leading-[1.25] mb-3">
                A Future Where Wisdom Never Gets Lost
              </h3>

              {/* Accent line */}
              <div
                className="h-[2.5px] w-10 bg-blue-400 rounded-full mb-5 group-hover:w-16 transition-all duration-300"
              />

              {/* Description */}
              <p className="text-[15px] text-slate-500 leading-[1.75] font-normal">
                A world where age is celebrated as a fountain of wisdom, where traditional knowledge thrives alongside modern innovation, and where no elder ever feels forgotten or isolated.
              </p>
            </motion.div>

          </div>
        </section>

        {/* 3. The Problem & Solution */}
        <section className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-xs text-left space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Why Setu Exists</h2>
            <p className="text-xs text-slate-400 font-normal">
              Addressing the growing gap between generations in a fast-paced digital era.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="text-2xl">⏳</span>
              <h4 className="font-bold text-sm text-slate-800">Fading Oral Traditions</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Centuries of agricultural wisdom, folk medicine, and artisanal crafts risk vanishing without structured digital documentation.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-2xl">💔</span>
              <h4 className="font-bold text-sm text-slate-800">Elderly Isolation</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Many seniors feel disconnected from society, despite holding priceless expertise that could enrich young minds and local communities.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-2xl">🌉</span>
              <h4 className="font-bold text-sm text-slate-800">The Setu Solution</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                An interactive AI-guided platform connecting young seekers with senior mentors, verifying traditional knowledge, and preserving heritage archives.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Core Values Section with Interactive Details Navigation */}
        <section className="text-left space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Our Core Values</h2>
            <p className="text-xs text-slate-400 font-normal">
              The ethical compass that guides every interaction on Setu. Click any core value to explore details.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => onViewChange && onViewChange('community')}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs space-y-3 flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer group"
            >
              <div className="space-y-3">
                <span className="text-xl">🤝</span>
                <h4 className="font-bold text-xs text-slate-800 group-hover:text-blue-600 transition-colors">Respect</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                  We approach our elders with deep respect for their lived histories, recognizing them as active custodians of wisdom.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>Explore details</span>
                <span className="ml-1 transition-transform group-hover:translate-x-1.5">→</span>
              </div>
            </div>

            <div
              onClick={() => onViewChange && onViewChange('community')}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs space-y-3 flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer group"
            >
              <div className="space-y-3">
                <span className="text-xl">💬</span>
                <h4 className="font-bold text-xs text-slate-800 group-hover:text-blue-600 transition-colors">Connection</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                  We believe that mutual storytelling breaks down isolation, nurturing empathy, dialogue, and cross-generational friendships.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>Explore details</span>
                <span className="ml-1 transition-transform group-hover:translate-x-1.5">→</span>
              </div>
            </div>

            <div
              onClick={() => onViewChange && onViewChange('legacy')}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs space-y-3 flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer group"
            >
              <div className="space-y-3">
                <span className="text-xl">🔖</span>
                <h4 className="font-bold text-xs text-slate-800 group-hover:text-blue-600 transition-colors">Preservation</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                  We actively capture traditional practices, dying dialects, and recipes, keeping heritage relevant in a digital age.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>Explore details</span>
                <span className="ml-1 transition-transform group-hover:translate-x-1.5">→</span>
              </div>
            </div>

            <div
              onClick={() => onViewChange && onViewChange('schemes')}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs space-y-3 flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer group"
            >
              <div className="space-y-3">
                <span className="text-xl">🏡</span>
                <h4 className="font-bold text-xs text-slate-800 group-hover:text-blue-600 transition-colors">Community</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                  We foster a safe, warm, and supportive village environment where knowledge is shared freely and every user finds belonging.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>Explore details</span>
                <span className="ml-1 transition-transform group-hover:translate-x-1.5">→</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Impact Section — Premium Redesign */}
        <section className="relative -mx-6 md:-mx-12 px-6 md:px-12 py-20 overflow-hidden">

          {/* Light warm ambient background */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: [
                'radial-gradient(circle at 10% 20%, rgba(245,158,11,0.07), transparent 30%)',
                'radial-gradient(circle at 90% 80%, rgba(59,130,246,0.05), transparent 30%)',
                'radial-gradient(circle at 50% 55%, rgba(249,115,22,0.025), transparent 40%)',
                '#FAFAF8',
              ].join(', '),
            }}
          />

          {/* Subtle top separator line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />

          {/* Decorative ambient orbs */}
          <div className="absolute top-8 left-[5%] w-52 h-52 rounded-full bg-amber-200/10 blur-[65px] pointer-events-none" />
          <div className="absolute bottom-8 right-[5%] w-60 h-60 rounded-full bg-blue-200/10 blur-[70px] pointer-events-none" />

          {/* Faint dot grid */}
          <div
            className="absolute inset-0 -z-10 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #94A3B8 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="text-center mb-14 space-y-4"
          >
            <span className="inline-block text-[11px] font-bold uppercase tracking-[2px] text-amber-600">
              Our Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Making Wisdom Reach Further
            </h2>
            <p className="text-[15px] text-slate-500 leading-[1.75] font-normal max-w-[600px] mx-auto">
              Whether you want to learn traditional crafts from senior masters or contribute your family's ancestral recipes, your journey starts here.
            </p>
          </motion.div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto mb-14">

            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
              whileHover={{ y: -3, boxShadow: '0 14px 36px rgba(15,23,42,0.08)', borderColor: 'rgba(245,158,11,0.28)' }}
              className="relative bg-white/85 border border-black/[0.06] rounded-[22px] px-7 py-8 text-center overflow-hidden"
              style={{ boxShadow: '0 8px 30px rgba(15,23,42,0.04)', transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
            >
              {/* Saffron top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[2.5px] bg-amber-400 rounded-full" />
              <div className="text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
                10K<span className="text-amber-500">+</span>
              </div>
              <div className="text-[13px] font-medium text-slate-500 tracking-wide">
                Stories Preserved
              </div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
              whileHover={{ y: -3, boxShadow: '0 14px 36px rgba(15,23,42,0.08)', borderColor: 'rgba(59,130,246,0.25)' }}
              className="relative bg-white/85 border border-black/[0.06] rounded-[22px] px-7 py-8 text-center overflow-hidden"
              style={{ boxShadow: '0 8px 30px rgba(15,23,42,0.04)', transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
            >
              {/* Blue top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[2.5px] bg-blue-400 rounded-full" />
              <div className="text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
                5K<span className="text-blue-500">+</span>
              </div>
              <div className="text-[13px] font-medium text-slate-500 tracking-wide">
                People Connected
              </div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
              whileHover={{ y: -3, boxShadow: '0 14px 36px rgba(15,23,42,0.08)', borderColor: 'rgba(245,158,11,0.28)' }}
              className="relative bg-white/85 border border-black/[0.06] rounded-[22px] px-7 py-8 text-center overflow-hidden"
              style={{ boxShadow: '0 8px 30px rgba(15,23,42,0.04)', transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
            >
              {/* Saffron top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[2.5px] bg-amber-400 rounded-full" />
              <div className="text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
                25<span className="text-amber-500">+</span>
              </div>
              <div className="text-[13px] font-medium text-slate-500 tracking-wide">
                Knowledge Categories
              </div>
            </motion.div>

          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
            className="flex justify-center"
          >
            <button
              onClick={onSignUpClick}
              className="h-[44px] px-8 bg-brand-primary hover:bg-brand-hover text-white text-[14px] font-semibold rounded-[11px] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              Join Setu Today
            </button>
          </motion.div>

        </section>

      </div>
    </div>
  );
}
