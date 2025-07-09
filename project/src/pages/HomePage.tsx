import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import References from '../components/References';
import Stats from '../components/Stats';
import UseCases from '../components/UseCases';
import Expertise from '../components/Expertise';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />
      <main>
        <Hero />
        <References />
        <Stats />
        <UseCases />
        <Expertise />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
