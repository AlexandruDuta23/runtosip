import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first using client-side routing
    if (location.pathname !== '/') {
      // pass the desired section in navigation state; HomePage will handle scrolling after mount
      navigate('/', { state: { scrollTo: sectionId } });
      setIsMenuOpen(false);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/Logo RunToSip (1).png" 
              alt="Chasing Endorphins & Kudos Logo" 
              className="h-16 w-auto"
            />
            <span className={`text-2xl font-racing font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            <span className={`text-2xl font-racing font-bold ${isScrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-white'}`}>
              Run To Sip
            </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["about", "schedule", "articles", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`font-medium transition-colors duration-200 hover:text-primary ${
                  isScrolled || location.pathname !== '/' ? 'text-gray-700' : 'text-white'
                }`}
              >
                {t(item)}
              </button>
            ))}
            <Link
              to="/crew"
              className={`font-medium transition-colors duration-200 hover:text-primary ${
                isScrolled || location.pathname !== '/' ? 'text-gray-700' : 'text-white'
              } ${location.pathname === '/crew' ? 'text-primary' : ''}`}
            >
              {t('crew')}
            </Link>
            <Link
              to="/gallery"
              className={`font-medium transition-colors duration-200 hover:text-primary ${
                isScrolled || location.pathname !== '/' ? 'text-gray-700' : 'text-white'
              } ${location.pathname === '/gallery' ? 'text-primary' : ''}`}
            >
              Gallery
            </Link>
            <a
              href={import.meta.env.VITE_SHOP_URL || 'http://localhost:3000'}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-medium transition-colors duration-200 hover:text-primary ${
                isScrolled || location.pathname !== '/' ? 'text-gray-700' : 'text-white'
              }`}
            >
              {t('shop')}
            </a>
            <LanguageToggle />
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 ${isScrolled || location.pathname !== '/' ? 'text-gray-700' : 'text-white'}`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {["about", "schedule", "articles", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block px-3 py-2 text-gray-700 font-medium hover:text-primary transition-colors duration-200"
              >
                {t(item)}
              </button>
            ))}
            <Link
              to="/crew"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 font-medium hover:text-primary transition-colors duration-200"
            >
              {t('crew')}
            </Link>
            <Link
              to="/gallery"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 font-medium hover:text-primary transition-colors duration-200"
            >
              Gallery
            </Link>
            <a
              href={import.meta.env.VITE_SHOP_URL || 'http://localhost:3000'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 font-medium hover:text-primary transition-colors duration-200"
            >
              {t('shop')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;