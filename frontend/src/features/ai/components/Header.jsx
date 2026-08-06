import React from 'react';

export default function Header({
  userProfile,
  selectedLanguage,
  onLanguageChange,
  verifiedFilter,
  onVerifiedFilterToggle,
  onClose,
}) {
  return (
    <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-3xs">
      <div className="flex items-center space-x-3 text-left">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-primary via-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-xs">
          🤖
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 leading-none">Setu AI Assistant</h3>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
            Verified Traditional Wisdom Engine
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Verified Knowledge Filter Toggle */}
        <button
          onClick={onVerifiedFilterToggle}
          className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
            verifiedFilter
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-3xs'
              : 'bg-slate-50 text-slate-500 border-slate-200/60 hover:bg-slate-100'
          }`}
        >
          {verifiedFilter ? '✓ Verified Only' : 'All Knowledge'}
        </button>

        {/* Language Selector */}
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-brand-primary"
        >
          <option value="en">English (EN)</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
          <option value="gu">ગુજરાતી (Gujarati)</option>
          <option value="ta">தமிழ் (Tamil)</option>
        </select>

        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
