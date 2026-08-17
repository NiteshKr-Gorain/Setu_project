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
    <div className="w-full flex flex-col items-center overflow-hidden bg-[#FCFAF7]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-36 pb-24">
        <Hero
          onGetStarted={() => onViewChange(currentUser ? 'contribute' : 'signup')}
          onLearnMore={() => onViewChange('library')}
        />

        {/* Features grid */}
        <Features onViewChange={onViewChange} />

        {/* How it works */}
        <HowItWorks onViewChange={onViewChange} />

        {/* Statistics banner */}
        <Stats />

        {/* Testimonials section */}
        <Testimonials />
      </div>
    </div>
  );
}
