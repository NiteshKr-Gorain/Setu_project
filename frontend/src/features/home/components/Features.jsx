import React from 'react';
import FeatureCard from './FeatureCard';

export default function Features({ onViewChange }) {
  const featuresList = [
    {
      icon: '🧠',
      title: 'Preserve Wisdom',
      description: 'Document and safeguard traditional practices, oral histories, and cultural heritage for future generations before they are lost.',
      targetView: 'legacy'
    },
    {
      icon: '🌱',
      title: 'Intergenerational Learning',
      description: 'Connect youth with experienced elders to learn traditional skills, local farming methods, and valuable life lessons.',
      targetView: 'community'
    },
    {
      icon: '🤖',
      title: 'AI Verification',
      description: 'Use AI algorithms to analyze, summarize, and cross-check traditional knowledge with modern scientific understanding.',
      targetView: 'library'
    },
    {
      icon: '👥',
      title: 'Community Building',
      description: 'Foster meaningful connections, mentorships, and active discussions between young learners and senior storytellers.',
      targetView: 'schemes'
    }
  ];

  return (
    <section className="py-24 bg-slate-50/50 border-y border-slate-100/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Core Values
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Bridging the Past &amp; Present
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal">
            Setu combines community storytelling with intelligent knowledge management to keep ancestral wisdom vibrant and accessible.
          </p>
        </div>

        {/* Features 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresList.map((feat, index) => (
            <FeatureCard
              key={index}
              icon={feat.icon}
              title={feat.title}
              description={feat.description}
              onClick={() => onViewChange && onViewChange(feat.targetView)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
