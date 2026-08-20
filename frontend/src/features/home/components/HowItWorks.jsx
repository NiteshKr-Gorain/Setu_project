import React from 'react';
import { motion } from 'framer-motion';
import { User, Search, MessageSquare, BookOpen, Heart, ArrowRight } from 'lucide-react';
import StepCard from './StepCard';

export default function HowItWorks() {
  const stepsList = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Join Setu and create your profile. Tell us about your interests, skills, and what you love to share.',
      icon: User
    },
    {
      number: '02',
      title: 'Discover & Explore',
      description: 'Explore stories, knowledge, and experiences shared by people from different backgrounds.',
      icon: Search
    },
    {
      number: '03',
      title: 'Connect & Communicate',
      description: 'Connect with like-minded people, start conversations, and exchange ideas and experiences.',
      icon: MessageSquare
    },
    {
      number: '04',
      title: 'Share & Learn',
      description: 'Share your knowledge, experiences, and skills. Learn from others and grow together.',
      icon: BookOpen
    },
    {
      number: '05',
      title: 'Build Lasting Legacy',
      description: 'Your contributions become part of a lasting legacy that inspires and benefits future generations.',
      icon: Heart
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
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 95, damping: 16 },
    },
  };

  return (
    <section
      id="how-setup-works-section"
      style={{ background: '#FFFFFF' }}
      className="py-20 bg-[#FFFFFF] border-y border-[#E5E7EB] relative overflow-hidden w-full"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 space-y-16 relative z-10">
        
        {/* 1. Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#EA580C] bg-orange-100/70 px-4.5 py-1.5 rounded-full border border-orange-200/40">
            Platform Connection Cycle
          </span>
          <h2 className="text-3xl md:text-[52px] font-bold text-[#172033] tracking-tight leading-none" style={{ fontSize: 'clamp(36px, 5vw, 58px)' }}>
            How <span className="text-[#F97316]">Setu</span> Works
          </h2>
          <p className="text-[#64748B] text-base md:text-lg font-medium max-w-xl leading-relaxed">
            A simple 5-step journey to bridge generations, share wisdom, and build lasting connections.
          </p>
        </div>

        {/* 2. Timeline Grid Container */}
        <div className="relative pt-6">
          
          {/* Subtle Horizontal Curved/Wavy Connection Line (Desktop only) */}
          <div className="absolute top-[44px] left-[10%] right-[10%] h-12 pointer-events-none hidden md:block -z-10">
            <svg className="w-full h-full text-[#F97316]" viewBox="0 0 1000 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Dotted curve at the start */}
              <path d="M 20,40 C 40,40 50,15 90,15" stroke="#F97316" strokeWidth="1.5" strokeDasharray="3 3" />
              {/* Solid wavy line between steps */}
              <path d="M 90,15 C 140,15 160,45 210,45 C 260,45 280,15 330,15 C 380,15 400,45 450,45 C 500,45 520,15 570,15 C 620,15 640,45 690,45 C 740,45 760,15 810,15 C 860,15 880,45 930,45" stroke="#F97316" strokeWidth="1.5" />
              {/* Dotted curve at the end */}
              <path d="M 930,45 C 960,45 970,25 990,25" stroke="#F97316" strokeWidth="1.5" strokeDasharray="3 3" />
              
              {/* Small orange circular markers at the valleys */}
              <circle cx="210" cy="45" r="3.5" fill="#F97316" />
              <circle cx="450" cy="45" r="3.5" fill="#F97316" />
              <circle cx="690" cy="45" r="3.5" fill="#F97316" />
              <circle cx="930" cy="45" r="3.5" fill="#F97316" />
            </svg>
          </div>

          {/* Mobile vertical line */}
          <div className="absolute top-4 bottom-6 left-[44px] w-0.5 bg-[#E5E7EB] -translate-x-1/2 block md:hidden -z-10"></div>

          {/* Steps Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-4 relative z-10"
          >
            {stepsList.map((step, idx) => (
              <motion.div key={idx} variants={itemVariants} className="relative flex flex-col h-full pl-24 md:pl-0">
                {/* On mobile, align the step dot/number indicator on the left side line */}
                <div className="absolute top-6 left-6 -translate-x-1/2 md:hidden w-[36px] h-[36px] rounded-full bg-[#F97316] text-white font-semibold text-xs flex items-center justify-center shadow-sm z-20 shrink-0">
                  {step.number}
                </div>
                
                {/* Step Content */}
                <StepCard step={step} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 3. Bridge / Generation Connection Visual */}
        <div className="pt-12 border-t border-slate-100 max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 relative">
          
          {/* Left Side: Older Generation Block */}
          <div className="flex items-center space-x-4 w-full lg:w-auto justify-center lg:justify-end">
            <div className="text-right">
              <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider block">Share</span>
              <span className="text-sm font-bold text-[#172033] block mt-0.5">Wisdom & Experience</span>
              <div className="w-8 h-[2px] bg-[#F97316] ml-auto mt-1.5"></div>
            </div>
            <div className="relative shrink-0">
              {/* Outer decorative arcs */}
              <div className="absolute -inset-2.5 rounded-full border border-dashed border-[#FDBA74]/40 animate-spin-slow pointer-events-none"></div>
              <div className="w-[100px] h-[100px] sm:w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-[#FFF7ED] shadow-[0_8px_30px_rgba(249,115,22,0.1)] relative z-10">
                <img src="/elderly_man.jpg" alt="Older Generation - Share Wisdom & Experience" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Central Connecting Suspension Bridge Visual (Desktop only) */}
          <div className="hidden lg:flex flex-col items-center flex-grow relative mx-6">
            <div className="text-center space-y-1.5 mb-2 relative z-20">
              <span className="text-[10px] font-bold text-[#F97316] tracking-widest block uppercase">Setu</span>
              <h4 className="text-base font-extrabold text-[#172033] tracking-wide block uppercase">BRIDGING GENERATIONS</h4>
              <p className="text-[11px] text-[#64748B] max-w-xs leading-relaxed mx-auto">
                Together, we create a stronger, wiser, and more connected future.
              </p>
            </div>
            
            {/* Elegant Suspension Bridge SVG */}
            <div className="w-full h-16 relative z-10">
              <svg className="w-full h-full text-orange-200" viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main curved suspension cable */}
                <path d="M 0,20 Q 150,55 300,20" stroke="#FDBA74" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Main deck line */}
                <path d="M 0,45 Q 150,40 300,45" stroke="#FB923C" strokeWidth="2.5" />
                {/* Side pillars/Towers */}
                <line x1="40" y1="10" x2="40" y2="46" stroke="#F97316" strokeWidth="2" />
                <line x1="260" y1="10" x2="260" y2="46" stroke="#F97316" strokeWidth="2" />
                {/* Support vertical deck cables */}
                <line x1="80" y1="34" x2="80" y2="45" stroke="#FB923C" strokeWidth="1" />
                <line x1="120" y1="41" x2="120" y2="44" stroke="#FB923C" strokeWidth="1" />
                <line x1="150" y1="43" x2="150" y2="44" stroke="#FB923C" strokeWidth="1" />
                <line x1="180" y1="41" x2="180" y2="44" stroke="#FB923C" strokeWidth="1" />
                <line x1="220" y1="34" x2="220" y2="45" stroke="#FB923C" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* Mobile representation of Central Text */}
          <div className="flex lg:hidden flex-col items-center text-center space-y-1 my-2">
            <span className="text-[10px] font-bold text-[#F97316] tracking-widest uppercase">Setu</span>
            <h4 className="text-sm font-extrabold text-[#172033] tracking-wide uppercase">BRIDGING GENERATIONS</h4>
            <p className="text-[11px] text-[#64748B] max-w-xs leading-relaxed">
              Together, we create a stronger, wiser, and more connected future.
            </p>
          </div>

          {/* Right Side: Younger Generation Block */}
          <div className="flex items-center space-x-4 w-full lg:w-auto justify-center lg:justify-start">
            <div className="relative shrink-0">
              {/* Outer decorative arcs */}
              <div className="absolute -inset-2.5 rounded-full border border-dashed border-[#93C5FD]/40 animate-spin-reverse pointer-events-none"></div>
              <div className="w-[100px] h-[100px] sm:w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-[#EFF6FF] shadow-[0_8px_30px_rgba(59,130,246,0.1)] relative z-10">
                <img src="/young_man.jpg" alt="Younger Generation - Gain Knowledge & Inspiration" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider block">Gain</span>
              <span className="text-sm font-bold text-[#172033] block mt-0.5">Knowledge & Inspiration</span>
              <div className="w-8 h-[2px] bg-[#3B82F6] mr-auto mt-1.5"></div>
            </div>
          </div>

        </div>

        {/* 4. Centered Call-To-Action Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={() => window.location.hash = '#/signup'}
            className="w-[220px] h-[56px] bg-[#F97316] hover:bg-[#EA580C] text-white text-[15px] font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer group"
            aria-label="Join Setu Today"
          >
            <span>Join Setu Today</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.2} />
          </button>
        </div>

      </div>
    </section>
  );
}
