import React from 'react';
import { Heart, MessageCircle, Camera } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Gallery = () => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Placeholder message since photos are no longer available */}
      <div className="text-center py-16">
        <div className="bg-white rounded-3xl shadow-lg p-12 max-w-2xl mx-auto">
          <div className="text-6xl mb-6">📸</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Gallery Section Coming Soon!' : 'Secțiunea Galerie în Curând!'}
          </h3>
          <p className="text-gray-600 mb-6">
            {language === 'en' 
              ? 'Our amazing running photos and memories will be featured here soon. Stay tuned for updates!' 
              : 'Fotografiile minunate de alergare și amintirile vor fi prezenți aici în curând. Rămâneți conectați pentru actualizări!'
            }
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.instagram.com/runtosip/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors duration-300 flex items-center space-x-2"
            >
              <Camera className="h-5 w-5" />
              <span>{language === 'en' ? 'View Photos' : 'Vezi Fotografii'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;