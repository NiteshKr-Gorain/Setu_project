import React from 'react';
import heroGraphic from '../../../assets/hero.png';

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 bg-white text-slate-900 overflow-hidden transition-colors duration-300">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/40 to-orange-100/30 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-100/30 via-orange-100/20 to-blue-50/40 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text Content (7 grid width) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8 max-w-2xl">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-200/80 rounded-full px-4 py-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
                Intergenerational Knowledge Exchange
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-950">
              Preserving <span className="bg-gradient-to-r from-brand-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">Traditional Wisdom</span> Across Generations.
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-xl">
              Connecting elders and youth to share life experiences, preserve cultural heritage, and build meaningful mentorships backed by intelligent verification.
            </p>

            {/* Call To Action Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto pt-2">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-brand-primary hover:bg-brand-hover text-white text-sm font-bold rounded-full shadow-lg shadow-brand-primary/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Explore Wisdom</span>
                <span>→</span>
              </button>
              <a
                href="#features"
                className="px-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-sm font-bold rounded-full transition-all duration-200 text-center cursor-pointer"
              >
                Learn More
              </a>
            </div>

            {/* Quick Metrics Indicator */}
            <div className="pt-8 border-t border-slate-100/80 w-full grid grid-cols-3 gap-6 text-left">
              <div>
                <p className="text-2xl font-black text-slate-900">1,200+</p>
                <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Stories Shared</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">850+</p>
                <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Mentors Connected</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">98%</p>
                <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Verified Trust</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Artwork / Visual Mockup (5 grid width) */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[480px]">
              {/* Decorative Circle Background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-light/60 via-orange-100/40 to-blue-100/50 rounded-full blur-2xl transform scale-95 -z-10"></div>
              
              {/* Main Graphic Illustration */}
              <div className="w-full h-full rounded-3xl overflow-hidden border border-slate-100 shadow-2xl bg-white p-4 flex items-center justify-center">
                <img
                  src={heroGraphic}
                  alt="Intergenerational Knowledge Exchange Illustration"
                  className="w-full h-full object-cover rounded-2xl transform hover:scale-102 transition-transform duration-500"
                />
              </div>

              {/* Floating Badge Card 1: Senior Storyteller */}
              <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-100 shadow-xl flex items-center space-x-3 text-left animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-sm border border-amber-200">
                  👵
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Senior Storyteller</p>
                  <p className="text-[10px] text-slate-400 font-medium">Shared 14 Heritage Tales</p>
                </div>
              </div>

              {/* Floating Badge Card 2: AI Verified */}
              <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-100 shadow-xl flex items-center space-x-3 text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm border border-emerald-200">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Verified Knowledge</p>
                  <p className="text-[10px] text-emerald-600 font-bold">100% Authenticated</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
