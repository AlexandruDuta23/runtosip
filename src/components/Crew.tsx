import React from 'react';
import { Instagram, Mail, Camera, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Crew = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-primary to-secondary w-16 h-16 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('meetOurCrew')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('crewDescription')}
          </p>
        </div>

        {/* Placeholder message since crew members are no longer available */}
        <div className="text-center py-16">
          <div className="bg-white rounded-3xl shadow-lg p-12 max-w-2xl mx-auto">
            <div className="text-6xl mb-6">👥</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Crew Section Coming Soon!' : 'Secțiunea Echipă în Curând!'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'en' 
                ? 'Our amazing crew members will be featured here soon. Stay tuned for updates!' 
                : 'Membrii minunați ai echipei noastre vor fi prezenți aici în curând. Rămâneți conectați pentru actualizări!'
              }
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.instagram.com/runtosip/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors duration-300 flex items-center space-x-2"
              >
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-center text-black">
          <h3 className="text-3xl font-bold mb-4">{t('joinOurTeam')}</h3>
          <p className="text-xl mb-8 opacity-90">
            {t('joinTeamDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.instagram.com/runtosip/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-secondary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              {t('getInTouch')}
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

export default Crew;