import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-20 md:py-24 border-t border-slate-900 transition-colors duration-300">
      {/* Reduced side gap (px-4 md:px-8) and wider layout container */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">

        {/* 1. Brand Info Column with Setu_logo.png */}
        <div className="space-y-4.5 md:col-span-1">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl overflow-hidden bg-transparent border-0 p-0 flex items-center justify-center">
              <img src="/Setu_logo.png" alt="Setu Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-white tracking-tight block leading-none">Setu</span>
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest leading-none mt-1 block">AI Knowledge Bridge</span>
            </div>
          </div>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-normal">
            Preserving ancestral wisdom and connecting youth with senior storytellers across generations.
          </p>
        </div>

        {/* 2. Quick Platform Links */}
        <div className="space-y-3.5">
          <h4 className="text-xs md:text-sm font-bold text-slate-200 uppercase tracking-widest">Platform</h4>
          <ul className="space-y-2.5 text-xs md:text-sm font-medium">
            <li><a href="#/library" className="hover:text-brand-primary transition-colors">Knowledge Library</a></li>
            <li><a href="#/community" className="hover:text-brand-primary transition-colors">Community Feed</a></li>
            <li><a href="#/schemes" className="hover:text-brand-primary transition-colors">Senior Schemes</a></li>
            <li><a href="#/legacy" className="hover:text-brand-primary transition-colors">Legacy Archives</a></li>
          </ul>
        </div>

        {/* 3. Community Resources */}
        <div className="space-y-3.5">
          <h4 className="text-xs md:text-sm font-bold text-slate-200 uppercase tracking-widest">Community</h4>
          <ul className="space-y-2.5 text-xs md:text-sm font-medium">
            <li><a href="#/community" className="hover:text-brand-primary transition-colors">Find a Mentor</a></li>
            <li><a href="#/contribute" className="hover:text-brand-primary transition-colors">Youth Volunteers</a></li>
            <li><a href="#/about" className="hover:text-brand-primary transition-colors">About Us</a></li>
            <li><a href="#/about" className="hover:text-brand-primary transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* 4. Newsletter & Contact */}
        <div className="space-y-3.5">
          <h4 className="text-xs md:text-sm font-bold text-slate-200 uppercase tracking-widest">Stay Connected</h4>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-normal">
            Subscribe for monthly stories and community highlights.
          </p>
          <div className="flex space-x-2 pt-1">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary flex-grow"
            />
            <button className="px-4.5 py-2.5 bg-brand-primary hover:bg-brand-hover text-white text-xs md:text-sm font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-brand-primary/20">
              Join
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-14 pt-8 border-t border-slate-900 text-center text-xs md:text-sm text-slate-500 font-medium">
        <p>© 2026 Setu Platform. All rights reserved. Preserving traditional knowledge for future generations.</p>
      </div>
    </footer>
  );
}
