import React from 'react';

export default function FeatureCard({ icon, title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-8 rounded-[24px] border border-slate-100 border-t-4 border-t-brand-primary shadow-[0_10px_30px_-5px_rgba(15,23,42,0.015)] hover:shadow-[0_24px_50px_-10px_rgba(255,159,67,0.1)] hover:border-brand-primary/25 transition-all duration-400 ease-out flex flex-col justify-between group text-left cursor-pointer hover:-translate-y-1.5 transform"
    >
      <div className="space-y-5">
        {/* Squircle Icon wrapper with soft brand gradient background */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-light to-orange-50/50 border border-brand-primary/10 flex items-center justify-center text-xl text-brand-primary shadow-3xs group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-300">
          {icon}
        </div>

        {/* Text Content */}
        <div className="space-y-2.5">
          <h3 className="text-[17px] font-black text-slate-800 group-hover:text-brand-primary transition-colors duration-300 tracking-tight">
            {title}
          </h3>
          <p className="text-slate-550 text-[13.5px] font-semibold leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Explore Link */}
      <div className="pt-5 flex items-center text-[13px] font-bold text-slate-500 group-hover:text-brand-primary transition-colors duration-300">
        <span>Explore details</span>
        <span className="ml-1 transition-transform group-hover:translate-x-1.5 text-sm font-semibold">→</span>
      </div>
    </div>
  );
}




