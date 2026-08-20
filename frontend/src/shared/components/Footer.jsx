import React, { useState } from 'react';
import { Mail, Phone, ArrowRight } from 'lucide-react';

export default function Footer({ currentView, onViewChange }) {
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleNavClick = (viewId) => {
    if (onViewChange) {
      onViewChange(viewId);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer id="app-footer-navigation" style={{ background: '#E5E7EB' }} className="text-[#4B5563] pt-[30px] pb-[20px] px-[5%] relative overflow-visible transition-colors duration-300 border-t border-[#D1D5DB]">
      
      {/* 1. Bridge/Setu Arc Top Divider - Extends footer background upwards in a custom curve */}
      <div className="absolute top-0 inset-x-0 h-10 -translate-y-[99%] overflow-hidden pointer-events-none bg-transparent">
        <svg className="w-full h-full text-[#E5E7EB] fill-current" viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 Q720,0 1440,40 Z" />
        </svg>
      </div>

      {/* 2. Modern Grid Pattern Mask Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1.5px,transparent_1.5px),linear-gradient(to_bottom,#e2e8f0_1.5px,transparent_1.5px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-[0.25] pointer-events-none -z-10"></div>

      {/* 3. Soft Background Saffron Glow Accents */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-brand-light/30 rounded-full blur-[90px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-orange-350/10 rounded-full blur-[90px] -z-10 pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-start text-left relative z-10">

        {/* Brand Info Column */}
        <div className="space-y-4 md:col-span-4">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-full p-1 text-left"
            aria-label="Setu Home"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300 flex items-center justify-center bg-brand-light p-1">
              <img src="/Setu_logo.png" alt="Setu Logo" loading="lazy" className="w-full h-full object-contain" />
            </div>
            <div className="text-left">
              <span className="text-lg font-extrabold text-[#1F2937] tracking-tight block leading-none">Setu</span>
              <span className="text-[8px] font-black text-brand-primary uppercase tracking-widest leading-none mt-1 block">AI Bridge</span>
            </div>
          </button>
          <p className="text-[13px] text-[#4B5563] leading-relaxed font-semibold max-w-sm">
            Preserving ancestral wisdom and connecting youth with senior storytellers across generations. Built on trust and scientific authentication.
          </p>
        </div>

        {/* Platform Navigation */}
        <div className="space-y-3 md:col-span-2">
          <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-2 text-[13px] font-semibold">
            <li>
              <button
                onClick={() => handleNavClick('library')}
                className={`hover:text-[#F97316] transition-colors cursor-pointer text-left ${currentView === 'library' ? 'text-[#F97316] font-bold' : 'text-[#374151]'}`}
              >
                Library
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('community')}
                className={`hover:text-[#F97316] transition-colors cursor-pointer text-left ${currentView === 'community' ? 'text-[#F97316] font-bold' : 'text-[#374151]'}`}
              >
                Community
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('govt schemes')}
                className={`hover:text-[#F97316] transition-colors cursor-pointer text-left ${currentView === 'govt schemes' ? 'text-[#F97316] font-bold' : 'text-[#374151]'}`}
              >
                Govt Schemes
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('legacy')}
                className={`hover:text-[#F97316] transition-colors cursor-pointer text-left ${currentView === 'legacy' ? 'text-[#F97316] font-bold' : 'text-[#374151]'}`}
              >
                Legacy Archives
              </button>
            </li>
          </ul>
        </div>

        {/* Community Resources */}
        <div className="space-y-3 md:col-span-2">
          <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2 text-[13px] font-semibold text-[#4B5563]">
            <li>
              <button
                onClick={() => handleNavClick('community')}
                className="hover:text-[#F97316] transition-colors cursor-pointer text-left text-[#374151]"
              >
                Find a Mentor
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('contribute')}
                className={`hover:text-[#F97316] transition-colors cursor-pointer text-left ${currentView === 'contribute' ? 'text-[#F97316] font-bold' : 'text-[#374151]'}`}
              >
                Share Knowledge
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('about us')}
                className={`hover:text-[#F97316] transition-colors cursor-pointer text-left ${currentView === 'about us' ? 'text-[#F97316] font-bold' : 'text-[#374151]'}`}
              >
                About Us
              </button>
            </li>
          </ul>
        </div>

        {/* Stay Connected & Contact Details */}
        <div className="space-y-4 md:col-span-4">
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider">Stay Connected</h4>
            <p className="text-[13px] text-[#4B5563] leading-relaxed font-semibold">
              Subscribe for monthly heritage stories and community updates.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold rounded-xl animate-in fade-in duration-200">
                Thank you for subscribing to Setu!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex pt-1 w-full">
                <div className="flex items-center bg-white border border-slate-200 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10 rounded-2xl p-1 shadow-[0_2px_6px_rgba(0,0,0,0.015)] transition-all w-full">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Your email address"
                    className="bg-transparent border-0 px-4.5 py-2.5 text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none flex-grow font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-4.5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-[13px] font-bold rounded-xl transition-all duration-300 shadow-sm shadow-brand-primary/10 cursor-pointer flex items-center space-x-1.5 shrink-0"
                    aria-label="Subscribe"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
          
          <div className="pt-4 border-t border-[#D1D5DB] space-y-2">
            <h4 className="text-[10px] font-black text-[#1F2937] uppercase tracking-wider">Contact Channels</h4>
            <div className="text-[13px] space-y-2 font-semibold">
              <a href="mailto:support@setu.org" className="flex items-center space-x-3 text-[#374151] hover:text-[#F97316] transition-colors group">
                <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200/50 flex items-center justify-center text-[#4B5563] group-hover:bg-brand-light group-hover:text-brand-primary transition-all duration-300 shadow-3xs">
                  <Mail className="w-4 h-4" strokeWidth={2.2} />
                </div>
                <span>support@setu.org</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center space-x-3 text-[#374151] hover:text-[#F97316] transition-colors group">
                <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200/50 flex items-center justify-center text-[#4B5563] group-hover:bg-brand-light group-hover:text-brand-primary transition-all duration-300 shadow-3xs">
                  <Phone className="w-4 h-4" strokeWidth={2.2} />
                </div>
                <span>+91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 mt-10 pt-5 border-t border-[#D1D5DB] text-center text-xs text-[#4B5563] font-bold tracking-wide relative z-10">
        <p>© 2026 Setu Platform. All rights reserved. Preserving traditional knowledge for future generations.</p>
      </div>
    </footer>
  );
}
