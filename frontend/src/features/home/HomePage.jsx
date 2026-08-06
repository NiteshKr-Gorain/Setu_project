import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';

export default function HomePage({ onViewChange, currentUser }) {
  return (
    <>
      {/* Hero Section */}
      <Hero onGetStarted={() => onViewChange(currentUser ? 'contribute' : 'signup')} />

      {/* Features Grid Section */}
      <Features onViewChange={onViewChange} />

      {/* How It Works Section */}
      <HowItWorks onViewChange={onViewChange} />

      {/* Statistics Banner */}
      <Stats />

      {/* Testimonials Section */}
      <Testimonials />
    </>
  );
}
