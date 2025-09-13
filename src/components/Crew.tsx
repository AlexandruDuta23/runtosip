import React, { useEffect, useState } from 'react';
import { Instagram, Mail, Camera, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Crew = () => {
  const { t, language } = useLanguage();

  const [members, setMembers] = useState<Array<{ id: number; firstName: string; lastName: string; age: number | null; profession: string; description: string; image: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/crew');
        if (res.ok) setMembers(await res.json());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading crew...</div>
        ) : members.length === 0 ? (
          <div className="text-center py-16 text-gray-600">No crew members yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map(m => (
              <div key={m.id} className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="h-56 bg-gray-100">
                  <img src={m.image} alt={`${m.firstName} ${m.lastName}`} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{m.firstName} {m.lastName}</h3>
                  <p className="text-sm text-gray-500 mb-2">{m.profession}{m.age ? ` • ${m.age}` : ''}</p>
                  <p className="text-gray-700 text-sm">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

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