import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import AdminPanel from '../components/AdminPanel';

const EventsPage = () => {
  // Optionally, you can add state for events if you want admin updates to be instant
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <Header />
      <div className="pt-20"> {/* Add padding to account for fixed header */}
        <Gallery />
      </div>
      <Footer />
      {/* Optionally render AdminPanel here if needed */}
    </>
  );
};

export default EventsPage; 