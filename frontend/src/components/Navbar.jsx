import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Library', path: '/library' },
    { name: 'Community', path: '/community' },
    { name: 'Legacy', path: '/legacy' },
    { name: 'Govt Schemes', path: '/schemes' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-md' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo brand */}
        <Link
          to="/"
          className="flex items-center space-x-3 text-brand-primary hover:scale-[1.01] transition-transform duration-200"
        >
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 22C4 18 10 14 16 14C22 14 28 18 28 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M16 4C18.2091 4 20 5.79086 20 8C20 10.2091 18.2091 12 16 12C13.7909 12 12 10.2091 12 8C12 5.79086 13.7909 4 16 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M4 22H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="9" cy="18" r="1.5" fill="currentColor" />
            <circle cx="23" cy="18" r="1.5" fill="currentColor" />
            <path d="M16 14V22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
          <span className="text-2xl font-bold tracking-tight text-slate-800">
            Setu
          </span>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-semibold transition-all duration-200 relative py-1 ${
                  isActive ? 'text-brand-primary' : 'text-slate-655 hover:text-brand-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full animate-fade-in" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right side buttons / Profile (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/contribute"
                className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white font-bold text-xs rounded-full shadow-md shadow-brand-primary/10 transition-all duration-200 cursor-pointer"
              >
                + Share Knowledge
              </Link>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'border-brand-primary bg-brand-light text-brand-hover'
                      : 'border-slate-200 hover:border-brand-primary bg-white text-slate-700'
                  }`
                }
              >
                <img
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                  alt="Avatar"
                  className="w-6 h-6 rounded-full object-cover border border-slate-100"
                />
                <span className="text-xs font-bold">{currentUser.name}</span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-slate-500 hover:text-brand-primary transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/signin"
                className="px-5 py-2 border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-bold text-xs rounded-full transition-all duration-200 cursor-pointer"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-brand-primary hover:bg-brand-hover text-white font-bold text-xs rounded-full shadow-md shadow-brand-primary/10 hover:shadow-brand-hover/20 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-brand-primary focus:outline-none transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 border-t border-slate-100 shadow-xl transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
          }`}
      >
        <div className="glass px-6 py-6 flex flex-col space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-base font-semibold py-1 transition-colors ${
                  isActive ? 'text-brand-primary' : 'text-slate-700 hover:text-brand-primary'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Authentication inside Mobile Menu */}
          {currentUser ? (
            <div className="flex flex-col space-y-3 pt-4 border-t border-slate-100">
              <Link
                to="/contribute"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 bg-brand-primary hover:bg-brand-hover text-white font-semibold text-base rounded-full shadow-md transition-all cursor-pointer"
              >
                + Share Knowledge
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 text-slate-700 hover:text-brand-primary font-semibold text-base py-1.5 cursor-pointer text-left"
              >
                <img
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <span>Profile ({currentUser.name})</span>
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="text-left text-slate-500 hover:text-brand-primary font-semibold text-base py-1.5 cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3 pt-4 border-t border-slate-100">
              <Link
                to="/signin"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold text-base rounded-full transition-all cursor-pointer"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 bg-brand-primary hover:bg-brand-hover text-white font-semibold text-base rounded-full shadow-md transition-all cursor-pointer"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
