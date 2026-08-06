import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-36 bg-gradient-to-b from-blue-50/50 via-white to-white overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/40 to-orange-100/30 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-brand-light/35 to-blue-50/40 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-md mx-auto px-6 text-center space-y-8">
        {/* Floating Animated Error Graphic */}
        <div className="relative w-40 h-40 mx-auto bg-gradient-to-tr from-brand-light to-amber-100/50 rounded-full flex items-center justify-center border border-slate-100 shadow-md animate-pulse">
          <span className="text-7xl">🧭</span>
          <div className="absolute -top-1 -right-1 bg-brand-primary text-white p-2 rounded-full shadow-md">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <h1 className="text-6xl font-black text-slate-800">404</h1>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Lost in Connection?
          </h2>
          <p className="text-slate-500 text-sm font-semibold leading-relaxed">
            The page you are looking for might have been moved, deleted, or never existed in this generational timeline. Let's get you back on track!
          </p>
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-full shadow-md shadow-brand-primary/10 hover:shadow-brand-hover/20 hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <Link
            to="/library"
            className="w-full sm:w-auto px-6 py-3 border border-slate-200 bg-white hover:border-brand-primary text-slate-700 hover:text-brand-primary text-xs font-bold rounded-full shadow-sm hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Library</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
