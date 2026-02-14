import React from 'react';
import Preloader from '../components/Preloader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import TechStack from '../components/TechStack';
import UseCases from '../components/UseCases';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <TechStack />
      <UseCases />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
