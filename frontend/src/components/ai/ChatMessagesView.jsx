import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, ArrowLeft, Copy, Check, Bot, Globe, Database, Tag, Shield } from 'lucide-react';

function StreamingMessageText({ text, speed = 20, isLatestAI }) {
  const [displayedText, setDisplayedText] = useState(isLatestAI ? '' : text);
  const [isTyping, setIsTyping] = useState(isLatestAI);

  useEffect(() => {
    if (!isLatestAI) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    let currentIndex = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      currentIndex += 2;
      if (currentIndex >= text.length) {
        setDisplayedText(text);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedText(text.slice(0, currentIndex));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, isLatestAI, speed]);

  return (
    <p className="whitespace-pre-wrap">
      {displayedText}
      {isTyping && (
        <span className="inline-block w-2 h-4 ml-1 bg-amber-500 animate-pulse font-bold align-middle rounded-xs" />
      )}
    </p>
  );
}

export default function ChatMessagesView({ messages, onBack, isLoading, title, userProfile }) {
  const messagesEndRef = useRef(null);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const getUserProfile = () => {
    if (userProfile && typeof userProfile === 'object') return userProfile;
    if (typeof window !== 'undefined' && window.SETU_USER) return window.SETU_USER;
    try {
      const stored = localStorage.getItem('setu_user_profile');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return { name: 'User' };
  };

  const user = getUserProfile();
  const userName = user.name || 'User';
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const userInitials = user.initials || getInitials(userName);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const lastAiIndex = messages.reduce((lastIdx, msg, idx) => msg.sender === 'ai' ? idx : lastIdx, -1);

  return (
    <div className="flex flex-col h-full bg-[#f5f5f7] text-slate-800 flex-1 overflow-hidden">
      {/* Sub Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#e2e8f0] bg-white/80 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg text-slate-500 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
            title="Back to home"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h3 className="font-semibold text-slate-900 text-sm truncate max-w-md sm:max-w-xl">
            {title || 'Chat'}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Setu AI Assistant</span>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-5xl mx-auto w-full custom-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 sm:gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF9F43] to-[#E08A32] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-amber-500/20 font-bold">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-3xl lg:max-w-4xl space-y-1.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`group relative p-5 rounded-3xl text-base sm:text-lg md:text-xl font-semibold leading-relaxed transition-all ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#FF9F43] to-[#E08A32] text-white border border-amber-600/50 shadow-md shadow-amber-500/20 rounded-tr-xs font-bold'
                    : msg.isError
                    ? 'bg-red-50 text-red-800 border-2 border-red-200 shadow-xs rounded-tl-xs'
                    : 'bg-white text-slate-900 border-2 border-[#e2e8f0] shadow-sm rounded-tl-xs'
                }`}
              >
                {/* Source & Keras metadata badges */}
                {msg.sender === 'ai' && (msg.sources || msg.kerasMetadata || msg.source) && (
                  <div className="mb-3 flex flex-wrap items-center gap-1.5 border-b border-slate-100 pb-2 text-[11px] font-medium text-slate-500">
                    {msg.source && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        <Globe className="w-3 h-3 text-amber-600" />
                        {msg.source}
                      </span>
                    )}
                    {msg.kerasMetadata && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        <Tag className="w-3 h-3 text-slate-500" />
                        {msg.kerasMetadata.category} (Conf: {(msg.kerasMetadata.confidence * 100).toFixed(0)}%)
                      </span>
                    )}
                  </div>
                )}

                {msg.sender === 'ai' && !msg.isError ? (
                  <StreamingMessageText
                    text={msg.text}
                    isLatestAI={idx === lastAiIndex}
                  />
                ) : (
                  <p className="whitespace-pre-wrap font-bold">{msg.text}</p>
                )}

                {/* Response Copy Button */}
                {msg.sender === 'ai' && !msg.isError && (
                  <div className="mt-3 flex items-center justify-end border-t border-slate-100 pt-2">
                    <button
                      onClick={() => handleCopy(msg.text, idx)}
                      className="p-1.5 text-slate-500 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                      title="Copy response"
                    >
                      {copiedIdx === idx ? (
                        <>
                          <Check className="w-4 h-4 text-amber-600 stroke-[3]" />
                          <span className="text-amber-600 font-extrabold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 stroke-[2.5]" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <span className="text-[10px] text-slate-400 px-1 block font-medium">
                {msg.timestamp || 'Just now'}
              </span>
            </div>

            {msg.sender === 'user' && (
              user.avatarUrl ? (
                <img 
                  src={user.avatarUrl} 
                  alt={userName} 
                  className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5 shadow-sm border border-amber-200" 
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 shadow-sm">
                  {userInitials}
                </div>
              )
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF9F43] to-[#E08A32] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-amber-500/20">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs border border-[#e2e8f0] flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="text-xs font-semibold text-amber-600">
                Thinking & Dual-Searching Knowledge Base...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
