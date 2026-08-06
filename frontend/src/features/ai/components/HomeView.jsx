import React from 'react';

export default function HomeView({ onPromptSelect }) {
  const suggestedPrompts = [
    {
      icon: '🌱',
      title: 'Organic Pest Control',
      prompt: 'Explain natural neem leaf extract biopesticide preparation and its scientific mechanism.',
    },
    {
      icon: '🏺',
      title: 'Terracotta Water Cooling',
      prompt: 'Why do clay earthen matkas keep water cold in summer? How does micro-porosity work?',
    },
    {
      icon: '🥣',
      title: 'Sprouted Millet Benefits',
      prompt: 'What are the health and nutritional benefits of sprouted Ragi porridge for elderly energy?',
    },
    {
      icon: '🌾',
      title: 'Traditional Intercropping',
      prompt: 'How does leguminous intercropping enrich soil nitrogen without chemical urea fertilizers?',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 text-left space-y-6 flex flex-col justify-center max-w-3xl mx-auto w-full">
      <div className="space-y-2 text-center">
        <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-brand-primary via-orange-500 to-amber-500 flex items-center justify-center text-white text-2xl mx-auto shadow-md shadow-brand-primary/20">
          ✨
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          How can Setu AI help you today?
        </h2>
        <p className="text-xs text-slate-500 font-normal max-w-md mx-auto leading-relaxed">
          Ask questions about traditional farming techniques, natural remedies, ancestral recipes, or dialect preservation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
        {suggestedPrompts.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onPromptSelect(item.prompt)}
            className="p-4 bg-white border border-slate-150/80 hover:border-brand-primary/40 rounded-2xl shadow-3xs hover:shadow-xs text-left transition-all duration-200 group cursor-pointer space-y-1.5"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{item.icon}</span>
              <h4 className="text-xs font-bold text-slate-800 group-hover:text-brand-primary transition-colors">
                {item.title}
              </h4>
            </div>
            <p className="text-[11px] text-slate-500 font-normal line-clamp-2 leading-relaxed">
              "{item.prompt}"
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
