import React from 'react';

export default function StepCard({ number, title, description }) {
  return (
    <div className="relative bg-white/70 p-8 rounded-[32px] border border-slate-200/50 shadow-3xs premium-card-hover flex flex-col justify-between text-left group transition-all duration-350 cursor-pointer">
      <div className="space-y-5">
        {/* Step Number Badge - Swaps theme on card hover */}
        <div className="w-12 h-12 rounded-full bg-brand-light text-brand-primary font-black text-[13px] flex items-center justify-center border border-brand-primary/10 group-hover:scale-105 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shadow-2xs">
          {number}
        </div>

        {/* Title */}
        <h3 className="text-[17px] font-extrabold text-slate-800 group-hover:text-brand-primary transition-colors duration-250 tracking-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-550 text-[13.5px] font-semibold leading-relaxed">
          {description}
        </p>
      </div>

      {/* Interactive progress bar indicator at bottom */}
      <div className="w-8 h-1 bg-slate-200 group-hover:bg-brand-primary group-hover:w-14 transition-all duration-350 mt-6 rounded-full"></div>
    </div>
  );
}

