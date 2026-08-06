import React from 'react';
import StepCard from './StepCard';

export default function HowItWorks() {
  const stepsList = [
    {
      number: '01',
      title: 'Share Knowledge',
      description: 'Elders share their life experiences, recipes, sustainable farming tips, and traditional crafts via stories or voice recordings.'
    },
    {
      number: '02',
      title: 'AI Verification',
      description: 'Our intelligent dual-search AI analyzes traditional wisdom against modern science, generating structured summaries.'
    },
    {
      number: '03',
      title: 'Learn & Connect',
      description: 'Young learners browse verified entries, request mentorships, and exchange private messages with experienced elders.'
    }
  ];

  return (
    <section className="py-24 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-primary bg-brand-light px-3 py-1 rounded-full border border-brand-primary/10">
            Process Overview
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            How Setu Works
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal">
            Three simple steps to bridge generations and preserve cultural heritage seamlessly.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stepsList.map((step, idx) => (
            <StepCard
              key={idx}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
