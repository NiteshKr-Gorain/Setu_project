import React from 'react';

export default function SettingsView({
  selectedLanguage,
  onLanguageChange,
  verifiedFilter,
  onVerifiedFilterToggle,
}) {
  return (
    <div className="flex-1 overflow-y-auto p-6 text-left space-y-6 max-w-xl mx-auto w-full">
      <div className="space-y-1 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-extrabold text-slate-900">AI Assistant Settings</h2>
        <p className="text-xs text-slate-400 font-normal">Customize language preferences and verification filters.</p>
      </div>

      <div className="space-y-4 text-xs">
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-3xs flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-bold text-slate-800">Primary Language</h4>
            <p className="text-[11px] text-slate-400">Set the default response language for AI outputs.</p>
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="en">English (EN)</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
            <option value="gu">ગુજરાતી (Gujarati)</option>
            <option value="ta">தமிழ் (Tamil)</option>
          </select>
        </div>

        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-3xs flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-bold text-slate-800">Verified Knowledge Only</h4>
            <p className="text-[11px] text-slate-400">Restrict AI answers strictly to scientific verified entries.</p>
          </div>
          <button
            onClick={onVerifiedFilterToggle}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${verifiedFilter ? 'bg-emerald-500' : 'bg-slate-200'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${verifiedFilter ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
