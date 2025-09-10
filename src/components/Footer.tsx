import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src="/Logo RunToSip (1).png"
                alt="Chasing Endorphins & Kudos Logo"
                className="h-16 w-auto"
              />
              <span className="text-3xl font-racing font-bold">Run To Sip</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              {t('footerDescription')}
            </p>
            <a
              href="https://www.instagram.com/runtosip/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              <Instagram className="h-5 w-5" />
              <span>@runtosip</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              {['about', 'schedule', 'articles'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(link);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {t(link)}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/crew"
                  className="text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  {t('crew')}
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('getInTouch')}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-gray-300">{t('bucharest')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-gray-300">{t('sundays')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-gray-300">{t('dmInstagram')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Running Schedule */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">
            {t('weeklyRunningSchedule')}
          </h3>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {t('everySunday')}
              </div>
              <div className="text-xl text-gray-300 mb-2">{t('startTime')}</div>
              <div className="text-gray-400">
                {t('differentLocations')}
              </div>
            </div>
          </div>
        </div>

        {/* Sponsor Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">{t('fueledBy')}</h3>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img
              src="/Logo RunToSip (1).png"
              alt="Chasing Endorphins & Kudos Logo"
              className="h-8 w-auto"
            />
            <p className="text-gray-400">
              © 2025 Chasing Endorphins & Kudos. {t('madeWith')}
            </p>
          </div>
          <p className="text-gray-500 text-sm">
            {t('tagline')}
          </p>
        </div>
        
        {/* Admin Access */}
        <div className="mt-8 pt-4 border-t border-gray-800 text-center">
          <Link to="/admin" className="text-gray-600 hover:text-gray-400 text-xs transition-colors duration-200">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;