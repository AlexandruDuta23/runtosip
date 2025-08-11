import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Schedule from '../components/Schedule';
import WhatsAppJoin from '../components/WhatsAppJoin';
import Articles from '../components/Articles';
import { Gallery } from '../components/Gallery';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Schedule />
      <WhatsAppJoin />
      <Articles />
      <Footer />
    </>
  );
};

export default HomePage;