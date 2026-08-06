import React from 'react';
import { useNavigate } from 'react-router-dom';
import AboutUs from '../components/AboutUs';

export default function About() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return <AboutUs onSignUpClick={handleSignUpClick} />;
}
