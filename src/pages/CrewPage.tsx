import React, { useEffect } from 'react';
import Header from '../components/Header';
import Crew from '../components/Crew';
import Footer from '../components/Footer';

const CrewPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <Header />
      <div className="pt-20"> {/* Add padding to account for fixed header */}
        <Crew />
      </div>
      <Footer />
    </>
  );
};

export default CrewPage;