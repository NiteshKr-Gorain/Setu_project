import React from 'react';

export default function StepCard({ step }) {
  const { number, title, description, icon: Icon } = step;

  return (
    <div className="flex flex-col items-center text-center group cursor-pointer transition-all duration-300 w-full">
      {/* 1. Circular Icon Badge (88px x 88px) */}
      <div className="w-[88px] h-[88px] rounded-full bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center text-[#F97316] shadow-[0_4px_14px_rgba(249,115,22,0.06)] group-hover:bg-[#F97316] group-hover:text-white group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(249,115,22,0.15)] transition-all duration-300 z-10 shrink-0">
        {Icon && <Icon className="w-[30px] h-[30px]" strokeWidth={1.8} />}
      </div>

      {/* 2. Step Text Content (Offset below the icon) */}
      <div className="mt-6 space-y-2">
        {/* Step Number */}
        <span className="text-[14px] font-bold text-[#F97316] tracking-wide block">
          {number}
        </span>
        
        {/* Title */}
        <h3 className="text-[18px] sm:text-[19px] font-semibold text-[#172033] tracking-tight leading-snug group-hover:text-[#F97316] transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-[#64748B] text-[14px] sm:text-[14.5px] font-normal leading-[1.6] max-w-[240px] mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}
