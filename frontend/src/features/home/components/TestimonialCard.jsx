import React from 'react';


export default function TestimonialCard({ quote, name, role, avatar }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 border-l-4 border-l-brand-primary shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_40px_rgba(255,159,67,0.06)] hover:border-brand-primary/20 transition-all duration-300 flex flex-col justify-between text-left space-y-6 transform hover:-translate-y-1 group cursor-pointer">
      <div className="relative">
        <p className="text-slate-600 text-[14.5px] font-semibold leading-relaxed relative z-10 pl-1">
          "{quote}"
        </p>
      </div>

      <div className="flex items-center space-x-3.5 pt-2">
        <img
          src={avatar}
          alt={name}
          loading="lazy"
          className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-2xs group-hover:scale-105 transition-transform duration-300"
        />
        <div>
          <h4 className="text-[13.5px] font-black text-slate-800 group-hover:text-brand-primary transition-colors duration-300">
            {name}
          </h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}


