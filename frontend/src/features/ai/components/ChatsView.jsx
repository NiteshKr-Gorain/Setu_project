import React from 'react';

export default function ChatsView({ chats, onSelectChat, onDeleteChat }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 text-left space-y-6">
      <div className="space-y-1 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-extrabold text-slate-900">Saved Conversations</h2>
        <p className="text-xs text-slate-400 font-normal">Review your past Q&amp;A sessions and traditional wisdom inquiries.</p>
      </div>

      {chats.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chats.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelectChat(c)}
              className="bg-white border border-slate-100 hover:border-brand-primary/40 rounded-2xl p-4 shadow-3xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-brand-primary transition-colors line-clamp-1">
                  {c.title}
                </h4>
                <p className="text-[10px] text-slate-400 font-semibold">{c.timestamp} • {c.messages?.length || 0} messages</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(c.id);
                }}
                className="text-slate-300 hover:text-rose-500 text-xs p-2 rounded-lg transition-colors cursor-pointer"
                title="Delete Chat"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-xs text-slate-400 italic">
          No saved conversations yet. Start a new chat to preserve discussions.
        </div>
      )}
    </div>
  );
}
