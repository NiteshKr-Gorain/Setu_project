import React, { useState, useEffect } from 'react';

export default function Navbar({ currentView, onViewChange, currentUser, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for dynamic styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (viewId) => {
    onViewChange(viewId);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', viewId: 'home', id: 'nav-link-home' },
    { label: 'Library', viewId: 'library', id: 'nav-link-library' },
    { label: 'Community', viewId: 'community', id: 'nav-link-community' },
    { label: 'Legacy', viewId: 'legacy', id: 'nav-link-legacy' },
    { label: 'Govt Schemes', viewId: 'govt schemes', id: 'nav-link-schemes' },
    { label: 'About Us', viewId: 'about us', id: 'nav-link-about' },
  ];

  return (
    <>
      <header
        id="app-header-navigation"
        className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/75 backdrop-blur-xl rounded-b-2xl md:rounded-b-3xl border-b border-slate-200/80 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.08)] py-2 md:py-2.5'
            : 'bg-white/30 backdrop-blur-md rounded-b-none border-b border-slate-200/20 py-3.5 md:py-4'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex items-center justify-between h-12">
          {/* 1. Brand Logo */}
          <button
            id="nav-brand-button"
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-full p-1"
            aria-label="Setu Home"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300 flex items-center justify-center bg-brand-light p-1">
              <img src="/Setu_logo.png" alt="Setu Logo" loading="lazy" className="w-full h-full object-contain" />
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-lg font-extrabold text-slate-900 tracking-tight block leading-none">Setu</span>
              <span className="text-[8px] font-black text-brand-primary uppercase tracking-widest leading-none mt-1 block">AI Bridge</span>
            </div>
          </button>

          {/* 2. Desktop Navigation Links */}
          <nav id="desktop-main-nav" aria-label="Main Navigation" className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = currentView === link.viewId;
              return (
                <button
                  key={link.viewId}
                  id={link.id}
                  onClick={() => handleNavClick(link.viewId)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative group px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                    isActive
                      ? 'text-brand-primary font-bold'
                      : 'text-slate-600 hover:text-brand-primary hover:bg-brand-light/40'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-1.5 left-4 right-4 h-[2px] bg-brand-primary rounded-full transition-transform duration-300 origin-center ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}></span>
                </button>
              );
            })}
          </nav>

          {/* 3. Action Controls / CTAs */}
          <div id="desktop-auth-actions" className="hidden lg:flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-2.5">
                <button
                  id="nav-action-contribute"
                  onClick={() => handleNavClick('contribute')}
                  className="px-4.5 py-2 bg-brand-light hover:bg-brand-primary/15 text-brand-hover text-[13px] font-bold rounded-full transition-all duration-300 cursor-pointer flex items-center space-x-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary border border-brand-primary/10"
                >
                  <span>✍️</span>
                  <span>Share Knowledge</span>
                </button>
                <button
                  id="nav-action-profile"
                  onClick={() => handleNavClick('profile')}
                  aria-label="View Profile"
                  className={`flex items-center space-x-2 p-1 pl-3 rounded-full border transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                    currentView === 'profile'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-350 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[13px] font-bold">{currentUser.name || 'Profile'}</span>
                  <img
                    id="nav-user-avatar"
                    src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                    alt={currentUser.name || "User Avatar"}
                    loading="lazy"
                    className="w-7 h-7 rounded-full object-cover border border-slate-100"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100";
                    }}
                  />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  id="nav-auth-signin"
                  onClick={() => handleNavClick('signin')}
                  className="px-4 py-2 text-slate-700 hover:text-brand-primary text-[13px] font-bold rounded-full transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  Sign In
                </button>
                <button
                  id="nav-auth-signup"
                  onClick={() => handleNavClick('signup')}
                  className="px-5 py-2 bg-brand-primary hover:bg-brand-hover text-white text-[13px] font-bold rounded-full transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* 4. Mobile Menu Button */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer"
            aria-label="Toggle Mobile Navigation"
          >
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* 5. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="fixed inset-x-4 top-20 z-35 bg-white/95 backdrop-blur-xl border border-slate-200/80 p-5 rounded-3xl shadow-xl lg:hidden animate-in slide-in-from-top-4 duration-300">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.viewId}
                id={`mobile-${link.id}`}
                onClick={() => handleNavClick(link.viewId)}
                aria-current={currentView === link.viewId ? 'page' : undefined}
                className={`px-4 py-2.5 rounded-xl text-[13px] font-bold text-left transition-all duration-300 cursor-pointer ${
                  currentView === link.viewId
                    ? 'bg-brand-light text-brand-primary'
                    : 'text-slate-700 hover:text-brand-primary hover:bg-brand-light/30'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col space-y-1.5">
              {currentUser ? (
                <>
                  <button
                    id="mobile-action-contribute"
                    onClick={() => handleNavClick('contribute')}
                    className="w-full py-2.5 bg-brand-light text-brand-hover text-xs font-bold rounded-xl text-center cursor-pointer border border-brand-primary/10"
                  >
                    ✍️ Share Knowledge
                  </button>
                  <button
                    id="mobile-action-profile"
                    onClick={() => handleNavClick('profile')}
                    className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl text-center cursor-pointer"
                  >
                    My Profile ({currentUser.name})
                  </button>
                  <button
                    id="mobile-action-logout"
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl text-center cursor-pointer hover:bg-slate-50"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    id="mobile-auth-signin"
                    onClick={() => handleNavClick('signin')}
                    className="w-full py-2.5 border border-slate-200 text-slate-700 hover:text-emerald-600 text-xs font-bold rounded-xl text-center cursor-pointer hover:bg-slate-50"
                  >
                    Sign In
                  </button>
                  <button
                    id="mobile-auth-signup"
                    onClick={() => handleNavClick('signup')}
                    className="w-full py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl text-center cursor-pointer hover:bg-brand-hover"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
