import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AiButton from './AiButton';

export default function Layout() {
  const location = useLocation();
  
  // Hide footer on Sign In and Sign Up pages
  const hideFooterPaths = ['/signin', '/signup'];
  const showFooter = !hideFooterPaths.includes(location.pathname.toLowerCase());

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer Section */}
      {showFooter && <Footer />}

      {/* Floating AI Assistant Button */}
      <AiButton />
    </div>
  );
}
