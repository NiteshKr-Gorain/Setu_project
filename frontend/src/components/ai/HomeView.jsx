import React from 'react';
import ChatInput from './ChatInput';
import { Sparkles, Sprout, Scroll, Landmark, BookOpen } from 'lucide-react';

export default function HomeView({ onSendMessage, isLoading, selectedModel, setSelectedModel }) {
  const quickPrompts = [
    { icon: Sprout, label: 'Natural Farming', text: 'Explain sustainable zero-budget natural farming techniques and Jeevamrutha.' },
    { icon: Scroll, label: 'Traditional Knowledge', text: 'What ancient Indian traditional practices are documented for soil enrichment?' },
    { icon: Landmark, label: 'Govt Schemes', text: 'Which government schemes are available for sustainable agriculture and artisans?' },
    { icon: BookOpen, label: 'Heritage Crafts', text: 'Tell me about endangered Indian handicraft techniques like Dokra casting.' },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-0 text-slate-800 bg-[#f5f5f7] selection:bg-amber-500 selection:text-white">
      <div className="w-full max-w-5xl flex flex-col items-center gap-8 my-auto">
        {/* Brand Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Setu AI • Dual Search Knowledge Engine</span>
        </div>

        {/* Hero Greeting Text */}
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 text-center leading-tight">
          What would you like to <span className="bg-gradient-to-r from-[#FF9F43] to-[#E08A32] bg-clip-text text-transparent">explore</span> today?
        </h1>

        {/* Center Pill Input Bar */}
        <div className="w-full">
          <ChatInput
            onSendMessage={onSendMessage}
            isLoading={isLoading}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-4xl pt-2">
          {quickPrompts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => onSendMessage(item.text)}
                className="flex items-center gap-3 p-3.5 bg-white hover:bg-amber-50/70 border border-slate-200 hover:border-amber-300 rounded-2xl text-left transition-all group shadow-sm cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-800">{item.label}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{item.text}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
