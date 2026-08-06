import React from 'react';

export default function Sidebar({ activeView, onViewChange, onNewChat, savedChatsCount }) {
  const navItems = [
    { id: 'home', label: 'AI Home', icon: '✨' },
    { id: 'chat', label: 'Current Session', icon: '💬' },
    { id: 'chats', label: `Saved Chats (${savedChatsCount})`, icon: '📚' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="w-56 bg-slate-900 text-white flex flex-col justify-between p-4 shrink-0 hidden sm:flex">
      <div className="space-y-6">
        {/* Brand logo */}
        <div className="flex items-center space-x-2.5 px-2 pt-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-primary via-orange-500 to-amber-500 flex items-center justify-center font-bold text-white text-xs shadow-sm">
            🤖
          </div>
          <span className="font-extrabold text-sm tracking-tight">Setu AI</span>
        </div>

        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="w-full py-2.5 px-3 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-brand-primary/20 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>+</span>
          <span>New AI Inquiry</span>
        </button>

        {/* Menu Links */}
        <nav className="space-y-1 text-left">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                activeView === item.id
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/50 text-[10px] text-slate-400 text-left space-y-1">
        <p className="font-bold text-slate-300">Dual Search Verification</p>
        <p className="leading-normal font-normal">Cross-checking traditional wisdom against scientific literature.</p>
      </div>
    </div>
  );
}
