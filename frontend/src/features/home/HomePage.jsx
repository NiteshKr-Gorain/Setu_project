// Home page imports
import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';

// Home page component
export default function HomePage({ onViewChange, currentUser }) {
  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      {/* Hero section */}
      <Hero
        onGetStarted={() => onViewChange(currentUser ? 'contribute' : 'signup')}
        onLearnMore={() => onViewChange('library')}
      />

      {/* Features container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 mt-4 sm:mt-6">
        <Features onViewChange={onViewChange} />
      </div>

      {/* How it works - Full Width Section */}
      <div className="w-full my-8 sm:my-14">
        <HowItWorks onViewChange={onViewChange} />
      </div>

      {/* Bottom container for Stats and Testimonials */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 pb-16">
        {/* Statistics banner */}
        <Stats />

        {/* Testimonials section */}
        <Testimonials />
      </div>
    </div>
  );
}
