import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Define the Article type
interface Article {
  id: number;
  title: string;
  titleRo: string;
  excerpt: string;
  excerptRo: string;
  author: string;
  date: string;
  image: string;
  category: string;
  categoryRo: string;
  url?: string;
}

const Articles = () => {
  const { t, language, toggleLanguage } = useLanguage();

  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: 'The Perfect Pre-Run Breakfast',
      titleRo: 'Micul dejun perfect înainte de alergare',
      excerpt: 'Discover what to eat before your morning run to maximize performance and avoid digestive issues.',
      excerptRo: 'Descoperă ce să mănânci înainte de alergarea de dimineață pentru a maximiza performanța și a evita problemele digestive.',
      author: 'Maria Popescu',
      date: '2024-12-10',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Nutrition',
      categoryRo: 'Nutriție',
      url: ''
    },
    {
      id: 2,
      title: 'Running in Winter: Essential Tips',
      titleRo: 'Alergarea iarna: Sfaturi esențiale',
      excerpt: 'Stay motivated and safe during cold weather runs with our comprehensive winter running guide.',
      excerptRo: 'Rămâi motivat și în siguranță în timpul alergărilor pe vreme rece cu ghidul nostru complet pentru alergarea de iarnă.',
      author: 'Alexandru Ionescu',
      date: '2024-12-08',
      image: 'https://images.pexels.com/photos/2402846/pexels-photo-2402846.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Training',
      categoryRo: 'Antrenament',
      url: ''
    },
    {
      id: 3,
      title: 'Best Coffee Spots After Your Run',
      titleRo: 'Cele mai bune cafenele după alergare',
      excerpt: 'Our curated list of the best coffee shops in Bucharest perfect for post-run recovery.',
      excerptRo: 'Lista noastră selectată cu cele mai bune cafenele din București perfecte pentru recuperarea după alergare.',
      author: 'Ioana Marinescu',
      date: '2024-12-05',
      image: 'https://images.pexels.com/photos/1571939/pexels-photo-1571939.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Coffee',
      categoryRo: 'Cafea',
      url: ''
    }
  ]);

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [modalLang, setModalLang] = useState(language);

  // Listen for admin updates
  useEffect(() => {
    const handleAdminUpdate = () => {
      window.location.reload();
    };
    window.addEventListener('adminUpdate', handleAdminUpdate);
    return () => window.removeEventListener('adminUpdate', handleAdminUpdate);
  }, []);

  const openModal = (article: Article) => {
    setSelectedArticle(article);
    setModalLang(language);
  };

  const closeModal = () => setSelectedArticle(null);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {modalLang === 'ro' ? article.categoryRo : article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary transition-colors duration-200">
                  {modalLang === 'ro' ? article.titleRo : article.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {modalLang === 'ro' ? article.excerptRo : article.excerpt}
                </p>
                <button
                  className="inline-flex items-center space-x-2 text-secondary font-semibold hover:text-primary transition-colors duration-200"
                  onClick={() => openModal(article)}
                >
                  <span>{t('readMore')}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      {/* Modal Popup */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-10 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedArticle.image}
              alt={modalLang === 'ro' ? selectedArticle.titleRo : selectedArticle.title}
              className="w-full h-80 object-cover rounded-xl mb-6"
            />
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-3xl font-bold text-gray-900">
                {modalLang === 'ro' ? selectedArticle.titleRo : selectedArticle.title}
              </h3>
              <button
                className="px-4 py-2 rounded-full bg-primary text-black font-semibold hover:bg-yellow-300 transition-colors duration-200 ml-2"
                onClick={() => setModalLang(modalLang === 'en' ? 'ro' : 'en')}
              >
                {modalLang === 'en' ? 'RO' : 'EN'}
              </button>
            </div>
            <p className="text-gray-600 mb-8" style={{ fontSize: '1.15rem', lineHeight: '2' }}>
              {(modalLang === 'ro' ? selectedArticle.excerptRo : selectedArticle.excerpt) +
               ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.'}
            </p>
            {selectedArticle.url && selectedArticle.url !== '' && (
              <a
                href={selectedArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-secondary text-white px-4 py-2 rounded-full font-semibold hover:bg-primary transition-colors duration-200"
              >
                {t('readFullArticle') || 'Read Full Article'}
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Articles;