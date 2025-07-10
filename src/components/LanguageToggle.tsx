import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-full bg-primary text-black font-semibold hover:bg-yellow-300 transition-colors duration-200"
    >
      <Globe className="h-4 w-4" />
      <span>{language === 'en' ? 'RO' : 'EN'}</span>
    </button>
  );
};

export default LanguageToggle;