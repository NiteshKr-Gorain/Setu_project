// Hero imports
import React from 'react';
import heroGraphic from '../../../assets/hero.png';

// Hero component
export default function Hero({ onGetStarted, onLearnMore }) {
  return (
    <section className="relative w-full pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-24 bg-white text-slate-900 overflow-hidden transition-colors duration-300">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 right-0 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-br from-blue-100/40 to-orange-100/30 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-amber-100/30 via-orange-100/20 to-blue-50/40 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left column - Content */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 sm:space-y-7 max-w-2xl mx-auto lg:mx-0">

            {/* Main headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15] sm:leading-[1.12] text-slate-950">
              Keeping <span className="bg-gradient-to-r from-brand-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">Traditional Wisdom</span> Alive.
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl">
              Connecting elders and youth to share life experiences, preserve cultural heritage, and build meaningful mentorships backed by intelligent verification.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-1 sm:pt-2">
              <button
                type="button"
                onClick={onGetStarted}
                className="px-7 sm:px-8 py-3.5 sm:py-4 bg-brand-primary hover:bg-brand-hover text-white text-sm sm:text-base font-bold rounded-full shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/35 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Explore Wisdom</span>
                <span>→</span>
              </button>
              <button
                type="button"
                onClick={onLearnMore}
                className="px-7 sm:px-8 py-3.5 sm:py-4 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-sm sm:text-base font-bold rounded-full transition-all duration-200 text-center cursor-pointer shadow-2xs hover:shadow-xs"
              >
                Learn More
              </button>
            </div>

            {/* Metrics indicator */}
            <div className="pt-6 sm:pt-8 border-t border-slate-100/90 w-full grid grid-cols-3 gap-3 sm:gap-6 text-center lg:text-left">
              <div>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">1,200+</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Stories Shared</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">850+</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Mentors Connected</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">98%</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Verified Trust</p>
              </div>
            </div>

          </div>

          {/* Right column - Image */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center px-2 sm:px-4 lg:px-0">
            <div className="relative w-full max-w-[290px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px] xl:max-w-[480px] aspect-square">
              
              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 via-orange-400/20 to-amber-300/25 rounded-3xl blur-2xl transform scale-95 -z-10 pointer-events-none"></div>
              
              {/* Illustration graphic container */}
              <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-xl sm:shadow-2xl bg-white p-2.5 sm:p-4 flex items-center justify-center">
                <img
                  src={heroGraphic}
                  alt="Hero Illustration"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl transform hover:scale-102 transition-transform duration-500"
                />
              </div>

              {/* Storyteller badge */}
              <div className="absolute -top-3 sm:-top-4 left-1 sm:-left-3 lg:-left-4 bg-white/95 backdrop-blur-md px-3 py-2 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-100/90 shadow-lg sm:shadow-xl flex items-center space-x-2.5 sm:space-x-3 text-left animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xs sm:text-sm border border-amber-200 shrink-0">
                  👵
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Senior Storyteller</p>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium">Shared 14 Heritage Tales</p>
                </div>
              </div>

              {/* Verified badge */}
              <div className="absolute -bottom-3 sm:-bottom-4 right-1 sm:-right-3 lg:-right-4 bg-white/95 backdrop-blur-md px-3 py-2 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-100/90 shadow-lg sm:shadow-xl flex items-center space-x-2.5 sm:space-x-3 text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs sm:text-sm border border-emerald-200 shrink-0">
                  ✓
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Verified Knowledge</p>
                  <p className="text-[9px] sm:text-[10px] text-emerald-600 font-bold">100% Authenticated</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
