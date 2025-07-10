import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Crew from '../components/Crew';
import Footer from '../components/Footer';
import AdminPanel from '../components/AdminPanel';

const defaultCrewMembers = [
  {
    id: 1,
    name: 'Alexandra',
    role: 'Founder',
    roleRo: 'Fondator',
    description: 'The visionary behind Run To Sip, passionate about building community through running.',
    descriptionRo: 'Vizionara din spatele Run To Sip, pasionată de construirea comunității prin alergare.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    instagram: '@alexandra_runtosip'
  },
  {
    id: 2,
    name: 'Nemir',
    role: 'Co-Founder',
    roleRo: 'Co-Fondator',
    description: 'Bringing energy and enthusiasm to every run, ensuring everyone feels welcome.',
    descriptionRo: 'Aducând energie și entuziasm la fiecare alergare, asigurându-se că toată lumea se simte binevenită.',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    instagram: '@nemir_runs'
  },
  {
    id: 3,
    name: 'Tudor',
    role: 'Photographer',
    roleRo: 'Fotograf',
    description: 'Capturing the beautiful moments and memories from our running adventures.',
    descriptionRo: 'Surprinzând momentele frumoase și amintirile din aventurile noastre de alergare.',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    instagram: '@tudor_photos'
  },
  {
    id: 4,
    name: 'Ionut',
    role: 'Pacer',
    roleRo: 'Pacer',
    description: 'Keeping the group together and ensuring everyone maintains their perfect pace.',
    descriptionRo: 'Menținând grupul unit și asigurându-se că toată lumea își păstrează ritmul perfect.',
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    instagram: '@ionut_pacer'
  }
];

const CrewPage = () => {
  const [crewMembers, setCrewMembers] = useState(defaultCrewMembers);

  useEffect(() => {
    // Listen for admin updates and update crewMembers state
    const handleAdminUpdate = (e: any) => {
      if (e.detail && e.detail.crewMembers) {
        setCrewMembers(e.detail.crewMembers);
      }
    };
    window.addEventListener('adminUpdate', handleAdminUpdate);
    return () => window.removeEventListener('adminUpdate', handleAdminUpdate);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <Header />
      <div className="pt-20"> {/* Add padding to account for fixed header */}
        <Crew crewMembers={crewMembers} />
      </div>
      <Footer />
      {/* Optionally render AdminPanel here if needed */}
    </>
  );
};

export default CrewPage;