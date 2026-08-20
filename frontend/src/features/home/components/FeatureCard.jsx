import React from 'react';

export default function FeatureCard({ number, icon: Icon, title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-8 rounded-[20px] border border-[#E5E7EB] shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.08)] hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between group text-left cursor-pointer relative overflow-hidden h-full z-10"
    >
      {/* Orange accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#EA580C] to-[#F97316] rounded-t-[20px] z-20"></div>

      <div className="space-y-6 pt-2 relative z-10">
        {/* Header Row: Icon and Number badge */}
        <div className="flex items-center justify-between">
          {/* Circular Icon Container */}
          <div className="w-[60px] h-[60px] rounded-full bg-[#FFF5E6] flex items-center justify-center text-[#F97316] shadow-3xs group-hover:scale-105 transition-transform duration-300 shrink-0">
            {Icon && <Icon className="w-7 h-7" strokeWidth={1.8} />}
          </div>
          
          {/* Step Number Badge */}
          {number && (
            <div className="w-9 h-9 rounded-full bg-[#FFF5E6] border border-[#FDBA74]/30 flex items-center justify-center text-xs font-bold text-[#F97316] shadow-3xs">
              {number}
            </div>
          )}
        </div>

        {/* Title and Horizontal Line */}
        <div className="space-y-3.5">
          <h3 className="text-[21px] font-bold tracking-tight text-[#172033] leading-snug group-hover:text-[#F97316] transition-colors duration-300">
            {title}
          </h3>
          {/* Short orange bar below title */}
          <div className="w-8 h-[3px] bg-[#F97316] rounded-full"></div>
        </div>

        {/* Description */}
        <p className="text-[#64748B] text-[14.5px] font-normal leading-[1.6]">
          {description}
        </p>
      </div>

      {/* Footer Link Area (with divider line) */}
      <div className="border-t border-[#F1F5F9] pt-4 mt-6 flex items-center text-[14px] font-semibold text-[#F97316] group-hover:text-[#EA580C] transition-colors duration-300 relative z-10">
        <span>Explore details</span>
        <span className="ml-1 transition-transform group-hover:translate-x-1 text-base font-semibold">→</span>
      </div>
    </div>
  );
}
