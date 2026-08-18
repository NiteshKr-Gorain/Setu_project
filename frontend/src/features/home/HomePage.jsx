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
    <div className="w-full flex flex-col items-center overflow-hidden bg-[#FFF7ED]">
      <div className="w-full">
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
