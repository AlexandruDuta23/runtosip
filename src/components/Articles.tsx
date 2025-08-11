import React from 'react';
import { Calendar, User, ArrowRight, X, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Articles = () => {
  const { t, language } = useLanguage();

  return (
    <section id="articles" className="py-20 bg-gradient-to-br from-gray-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('latestArticles')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('articlesDescription')}
          </p>
        </div>

        {/* Placeholder message since articles are no longer available */}
        <div className="text-center py-16">
          <div className="bg-white rounded-3xl shadow-lg p-12 max-w-2xl mx-auto">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Articles Section Coming Soon!' : 'Secțiunea Articole în Curând!'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'en' 
                ? 'Our latest articles and running tips will be featured here soon. Stay tuned for updates!' 
                : 'Cele mai recente articole și sfaturi de alergare vor fi prezenți aici în curând. Rămâneți conectați pentru actualizări!'
              }
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.instagram.com/runtosip/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors duration-300 flex items-center space-x-2"
              >
                <BookOpen className="h-5 w-5" />
                <span>{language === 'en' ? 'Follow Us' : 'Urmăriți-ne'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;