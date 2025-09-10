import React, { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, X, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Articles = () => {
  const { t, language } = useLanguage();
  const [items, setItems] = useState<Array<{ id: number; name: string; url: string; image: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/articles');
        if (res.ok) setItems(await res.json());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading articles...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-gray-600">No articles yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map(a => (
              <a key={a.id} href={a.url} target="_blank" rel="noreferrer" className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-44 bg-gray-100">
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{a.name}</h3>
                  <p className="text-sm text-blue-600 underline truncate">{a.url}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Articles;