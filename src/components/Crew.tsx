import React from 'react';
import { Instagram, Mail, Camera, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';

interface CrewMember {
  id: number;
  name: string;
  role: string;
  roleRo: string;
  description: string;
  descriptionRo: string;
  image: string;
  instagram?: string;
  email?: string;
}

const Crew = () => {
  const { t, language } = useLanguage();
  const { crewMembers } = useData();

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {crewMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-center space-x-3">
                      {member.instagram && (
                        <a
                          href={`https://instagram.com/${member.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {language === 'en' ? member.role : member.roleRo}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {member.name}
                </h3>
                <p className="text-secondary font-semibold text-center mb-3">
                  {language === 'en' ? member.role : member.roleRo}
                </p>
                <p className="text-gray-600 text-center leading-relaxed text-sm">
                  {language === 'en' ? member.description : member.descriptionRo}
                </p>
                {member.instagram && (
                  <div className="mt-4 text-center">
                    <span className="text-xs text-gray-500">{member.instagram}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
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