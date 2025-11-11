import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Schedule from '../components/Schedule';
import WhatsAppJoin from '../components/WhatsAppJoin';
import Articles from '../components/Articles';
import { Gallery } from '../components/Gallery';
import Footer from '../components/Footer';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const state: any = (location && (location as any).state) || {};
    const target = state?.scrollTo as string | undefined;
    if (target) {
      // Delay slightly to allow sections to mount
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        // clear state to avoid repeated scrolling when history back/forward
        try { window.history.replaceState({}, ''); } catch {}
      }, 80);
    }
  }, [location]);

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