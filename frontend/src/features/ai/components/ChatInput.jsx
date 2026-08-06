import React from 'react';

export default function ChatInput({ inputQuery, onInputChange, onSend, isStreaming, onStop }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isStreaming) {
      onSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-slate-100 flex flex-col space-y-2">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Ask Setu AI about traditional crafts, organic farming, or heritage recipes..."
          value={inputQuery}
          onChange={(e) => onInputChange(e.target.value)}
          disabled={isStreaming}
          className="flex-grow bg-slate-50 border border-slate-200 focus:border-brand-primary focus:bg-white rounded-2xl px-4 py-3 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-200"
        />

        {isStreaming ? (
          <button
            type="button"
            onClick={onStop}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-2xl transition-all cursor-pointer flex items-center space-x-1.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-sm bg-rose-400 animate-pulse"></span>
            <span>Stop</span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-2xl transition-all cursor-pointer shadow-md shadow-brand-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Ask AI
          </button>
        )}
      </form>
      <p className="text-[10px] text-slate-400 text-center font-normal">
        Setu AI combines traditional storytelling wisdom with benchmarked agricultural and healthcare knowledge.
      </p>
    </div>
  );
}
