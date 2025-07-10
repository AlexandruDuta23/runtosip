import React from 'react';
import { Calendar, Clock, MapPin, Users, Coffee } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import EventGrid from './EventGrid';

const Schedule = () => {
  const { t } = useLanguage();

  return (
    <section id="schedule" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('weeklySchedule')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('scheduleDescription')}
          </p>
        </div>

        <EventGrid />

        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-center text-black">
          <h3 className="text-3xl font-bold mb-4">{t('readyToStart')}</h3>
          <p className="text-xl mb-8 opacity-90">
            {t('newToRunning')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.instagram.com/runtosip/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-secondary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              {t('messageInstagram')}
            </a>
            <button className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
              {t('learnMore')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;