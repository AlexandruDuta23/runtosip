import React from 'react';
import { MessageCircle, Users, Bell, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WhatsAppJoin = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Bell,
      title: t('instantUpdates'),
      description: t('instantUpdatesDesc')
    },
    {
      icon: Calendar,
      title: t('eventDetails'),
      description: t('eventDetailsDesc')
    },
    {
      icon: Users,
      title: t('communityChat'),
      description: t('communityChatDesc')
    }
  ];

  const handleJoinWhatsApp = () => {
    const whatsappGroupLink = 'https://chat.whatsapp.com/CZSlkMfLr97ITQNerWVXbq?fbclid=PAZXh0bgNhZW0CMTEAAaf765T6XlZeVKzD6BgVjQhjQBbQDphaOAR785iUsLtTDDOKzY9zrcwqC7UvsQ_aem_LRvVJzp_bID5CdKVpiICXQ';
    window.open(whatsappGroupLink, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-green-500 p-4 rounded-full">
              <MessageCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('joinWhatsApp')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('whatsappDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group text-center"
            >
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              {t('readyToJoin')}
            </h3>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              {t('joinConversation')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center space-x-2 text-green-100">
                <Users className="h-5 w-5" />
                <span className="font-semibold">50+ {t('activeMembers')}</span>
              </div>
              <div className="hidden sm:block w-2 h-2 bg-green-300 rounded-full"></div>
              <div className="flex items-center space-x-2 text-green-100">
                <MessageCircle className="h-5 w-5" />
                <span className="font-semibold">{t('dailyUpdates')}</span>
              </div>
              <div className="hidden sm:block w-2 h-2 bg-green-300 rounded-full"></div>
              <div className="flex items-center space-x-2 text-green-100">
                <Bell className="h-5 w-5" />
                <span className="font-semibold">{t('instantNotifications')}</span>
              </div>
            </div>

            <button
              onClick={handleJoinWhatsApp}
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center space-x-3"
            >
              <MessageCircle className="h-6 w-6" />
              <span>{t('joinWhatsAppGroup')}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <p className="text-green-100 mt-4 text-sm">
              {t('noSpam')}
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t('whatYouGet')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-1">{t('weeklyAnnouncements')}</h5>
                <p className="text-gray-600 text-sm">{t('weeklyAnnouncementsDesc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                <Bell className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-1">{t('weatherUpdates')}</h5>
                <p className="text-gray-600 text-sm">{t('weatherUpdatesDesc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-1">{t('communityDiscussions')}</h5>
                <p className="text-gray-600 text-sm">{t('communityDiscussionsDesc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-1">{t('specialEvents')}</h5>
                <p className="text-gray-600 text-sm">{t('specialEventsDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppJoin;