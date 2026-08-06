import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/contribute');
    } else {
      navigate('/signup');
    }
  };

  return (
    <>
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
    </>
  );
}
