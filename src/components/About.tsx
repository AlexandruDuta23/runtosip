import React from 'react';
import { Heart, Coffee, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Heart,
      title: t('communityFirst'),
      description: t('communityFirstDesc'),
    },
    {
      icon: Coffee,
      title: t('coffeeCulture'),
      description: t('coffeeCultureDesc'),
    },
    {
      icon: MapPin,
      title: t('exploreBucharest'),
      description: t('exploreBucharestDesc'),
    },
    {
      icon: Clock,
      title: t('flexiblePace'),
      description: t('flexiblePaceDesc'),
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('moreThanRunning')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('aboutDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="bg-gradient-to-br from-primary to-secondary w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {t('ourStory')}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('storyPart1')}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {t('storyPart2')}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-primary px-4 py-2 rounded-full">
                  <span className="text-black font-semibold">
                    100+ {t('members')}
                  </span>
                </div>
                <div className="bg-secondary px-4 py-2 rounded-full">
                  <span className="text-white font-semibold">
                    20+ {t('runs')}
                  </span>
                </div>
                <div className="bg-gray-800 px-4 py-2 rounded-full">
                  <span className="text-white font-semibold">1 {t('year')}</span>
                </div>
              </div>
            </div>
            <div
              className="min-h-64 lg:min-h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  'url(https://images.pexels.com/photos/1671327/pexels-photo-1671327.jpeg?auto=compress&cs=tinysrgb&w=800)',
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;