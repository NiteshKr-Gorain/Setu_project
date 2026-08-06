import React, { useRef, useEffect } from 'react';

export default function ChatMessagesView({ messages, isStreaming, errorBanner }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
      {errorBanner && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-4 py-2.5 rounded-2xl flex items-center space-x-2">
          <span>⚡</span>
          <span>{errorBanner}</span>
        </div>
      )}

      {messages.map((msg) => {
        const isUser = msg.sender === 'user';
        return (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                isUser
                  ? 'bg-slate-900 text-white'
                  : 'bg-gradient-to-tr from-brand-primary to-amber-500 text-white shadow-sm'
              }`}
            >
              {isUser ? '👤' : '🤖'}
            </div>

            <div
              className={`max-w-[80%] p-4 rounded-3xl text-xs leading-relaxed font-normal shadow-3xs ${
                isUser
                  ? 'bg-brand-primary text-white rounded-tr-none font-semibold'
                  : 'bg-white text-slate-800 border border-slate-150/80 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text || (msg.isStreaming ? 'Thinking and retrieving wisdom...' : '')}</p>
              
              <span className={`text-[9px] block mt-1.5 font-semibold ${isUser ? 'text-white/70' : 'text-slate-400'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        );
      })}

      <div ref={messagesEndRef} />
    </div>
  );
}
