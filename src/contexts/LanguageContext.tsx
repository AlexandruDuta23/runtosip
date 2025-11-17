import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ro';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    about: 'About',
    schedule: 'Schedule',
    crew: 'Crew',
    articles: 'Articles',
    gallery: 'Gallery',
    shop: 'Shop',
    contact: 'Contact',
    
    // Hero
    heroTitle: 'Chasing Endorphins & Kudos',
    heroSubtitle: 'Join Bucharest\'s favorite running community every Sunday.\nWe run together, we sip together.',
    everySunday: 'Every Sunday',
    allOverBucharest: 'All Over Bucharest',
    growingCommunity: 'Growing Community',
    joinNextRun: 'Join Next Run',
    followInstagram: 'Follow on Instagram',
    
    // About
    moreThanRunning: 'More Than Just Running',
    aboutDescription: 'Chasing Endorphins & Kudos is Bucharest\'s most welcoming running community. We combine the joy of running with the warmth of coffee culture, creating lasting friendships one Sunday at a time.',
    communityFirst: 'Community First',
    communityFirstDesc: 'We believe running is better together. Join a supportive community that celebrates every step.',
    coffeeCulture: 'Coffee Culture',
    coffeeCultureDesc: 'Every run ends at a carefully selected coffee spot where we share stories and build friendships.',
    exploreBucharest: 'Explore Bucharest',
    exploreBucharestDesc: 'Discover new neighborhoods, parks, and hidden gems while staying active and healthy.',
    flexiblePace: 'Flexible Pace',
    flexiblePaceDesc: 'Whether you are a beginner or experienced runner, we accommodate all fitness levels.',
    ourStory: 'Our Story',
    storyPart1: 'What started as a small group of friends who loved running and coffee has grown into Bucharest\'s most vibrant running community. Every Sunday, we gather to explore different parts of our beautiful city, one run at a time.',
    storyPart2: 'Our routes take us through Bucharest\'s most scenic areas – from Herastrau Park to the Old Town, from Cismigiu Gardens to the trendy Amzei district. Each run is an adventure, and each coffee stop is a celebration.',
    members: 'Members',
    runs: 'Runs',
    year: 'Year',
    
    // Schedule
    weeklySchedule: 'Weekly Schedule',
    scheduleDescription: 'Join us every Sunday morning for our signature coffee runs. All fitness levels welcome!',
    allLevels: 'All Levels',
    beginnerFriendly: 'Beginner Friendly',
    joinThisRun: 'Join This Run',
    readyToStart: 'Ready to Start Your Journey?',
    newToRunning: 'New to running? No problem! We have experienced runners who are happy to help beginners.',
    messageInstagram: 'Message Us on Instagram',
    learnMore: 'Learn More',
    
    // WhatsApp
    joinWhatsApp: 'Join Our WhatsApp Community',
    whatsappDescription: 'Stay connected with the Chasing Endorphins & Kudos family! Get real-time updates about our Sunday runs, weather alerts, route changes, and exclusive community events.',
    instantUpdates: 'Instant Updates',
    instantUpdatesDesc: 'Get notified about upcoming runs, weather changes, and last-minute updates',
    eventDetails: 'Event Details',
    eventDetailsDesc: 'Receive detailed information about meeting points, routes, and coffee stops',
    communityChat: 'Community Chat',
    communityChatDesc: 'Connect with fellow runners, share experiences, and make new friends',
    readyToJoin: 'Ready to Join the Conversation?',
    joinConversation: 'Be the first to know about our next adventure! Join over 50+ runners who stay connected through our active WhatsApp community.',
    activeMembers: 'Active Members',
    dailyUpdates: 'Daily Updates',
    instantNotifications: 'Instant Notifications',
    joinWhatsAppGroup: 'Join WhatsApp Group',
    noSpam: 'Click to join instantly • No spam, just running updates',
    whatYouGet: 'What You\'ll Get in Our WhatsApp Group',
    weeklyAnnouncements: 'Weekly Run Announcements',
    weeklyAnnouncementsDesc: 'Detailed info about Sunday\'s meeting point, route, and coffee destination',
    weatherUpdates: 'Weather & Route Updates',
    weatherUpdatesDesc: 'Real-time changes due to weather or special events in the city',
    communityDiscussions: 'Community Discussions',
    communityDiscussionsDesc: 'Share running tips, coffee recommendations, and celebrate achievements',
    specialEvents: 'Special Events',
    specialEventsDesc: 'Exclusive invites to running workshops, social events, and group challenges',
    
    // Articles
    latestArticles: 'Latest Articles',
    articlesDescription: 'Discover running tips, training advice, and stories from our community.',
    readMore: 'Read More',
    
    // Gallery
    memoriesInMotion: 'Memories in Motion',
    galleryDescription: 'Check out highlights from our recent runs and coffee adventures around Bucharest.',
    followUs: 'Follow @runtosip',
    followDescription: 'Follow us on Instagram for daily updates, run photos, and coffee recommendations!',
    
    // Footer
    footerDescription: 'Bucharest\'s premier running community that combines fitness with coffee culture. Join us every Sunday for unforgettable adventures around the city.',
    quickLinks: 'Quick Links',
    getInTouch: 'Get in Touch',
    bucharest: 'Bucharest, Romania',
    sundays: 'Sundays, 10:00 AM',
    dmInstagram: 'DM us on Instagram',
    weeklyRunningSchedule: 'Weekly Running Schedule',
    startTime: '10:00 AM Start',
    differentLocations: 'Different locations across Bucharest • All fitness levels welcome',
    madeWith: 'Made with ❤️ and ☕ in Bucharest.',
    tagline: 'Running together, sipping together, growing together.',
    fueledBy: 'FUELED BY YOPRO',
    
    // Crew
    meetOurCrew: 'Meet Our Crew',
    crewDescription: 'The passionate team behind Run To Sip who make every Sunday adventure possible. From organizing routes to capturing memories, each member brings their unique energy to our community.',
    joinOurTeam: 'Want to Join Our Team?',
    joinTeamDescription: 'We\'re always looking for passionate individuals who want to help grow our running community.',
  },
  ro: {
    // Header
    about: 'Despre',
    schedule: 'Program',
    crew: 'Echipă',
    articles: 'Articole',
    gallery: 'Galerie',
    shop: 'Magazin',
    contact: 'Contact',
    
    // Hero
    heroTitle: 'Chasing Endorphins & Kudos',
    heroSubtitle: 'Alătură-te comunității de alergare favorite din București în fiecare duminică.\nAlergăm împreună, bem cafeaua împreună.',
    everySunday: 'În fiecare duminică',
    allOverBucharest: 'În tot Bucureștiul',
    growingCommunity: 'Comunitate în creștere',
    joinNextRun: 'Alătură-te următoarei alergări',
    followInstagram: 'Urmărește pe Instagram',
    
    // About
    moreThanRunning: 'Mai mult decât alergare',
    aboutDescription: 'Chasing Endorphins & Kudos este cea mai primitoare comunitate de alergare din București. Combinăm bucuria alergării cu căldura culturii cafelei, creând prietenii de durată duminică de duminică.',
    communityFirst: 'Comunitatea pe primul loc',
    communityFirstDesc: 'Credem că alergarea este mai bună împreună. Alătură-te unei comunități care sărbătorește fiecare pas.',
    coffeeCulture: 'Cultura cafelei',
    coffeeCultureDesc: 'Fiecare alergare se termină la o cafenea selectată cu grijă unde împărtășim povești și construim prietenii.',
    exploreBucharest: 'Explorează Bucureștiul',
    exploreBucharestDesc: 'Descoperă cartiere noi, parcuri și comori ascunse în timp ce rămâi activ și sănătos.',
    flexiblePace: 'Ritm flexibil',
    flexiblePaceDesc: 'Indiferent dacă ești începător sau alergător experimentat, ne adaptăm la toate nivelurile de fitness.',
    ourStory: 'Povestea noastră',
    storyPart1: 'Ce a început ca un grup mic de prieteni care iubeau alergarea și cafeaua a crescut în cea mai vibrantă comunitate de alergare din București. În fiecare duminică, ne adunăm să explorăm diferite părți ale frumoasului nostru oraș, o alergare la un timp.',
    storyPart2: 'Rutele noastre ne duc prin cele mai pitorești zone ale Bucureștiului – de la Parcul Herăstrău la Centrul Vechi, de la Grădina Cișmigiu la trendy-ul cartier Amzei. Fiecare alergare este o aventură, iar fiecare oprire la cafea este o sărbătoare.',
    members: 'Membri',
    runs: 'Alergări',
    year: 'An',
    
    // Schedule
    weeklySchedule: 'Program săptămânal',
    scheduleDescription: 'Alătură-te nouă în fiecare duminică dimineața pentru alergările noastre cu cafea! Toate nivelurile de fitness sunt binevenite!',
    allLevels: 'Toate nivelurile',
    beginnerFriendly: 'Prietenos cu începătorii',
    joinThisRun: 'Alătură-te acestei alergări',
    readyToStart: 'Gata să îți începi călătoria?',
    newToRunning: 'Nou în alergare? Nicio problemă! Avem alergători experimentați care sunt fericiți să ajute începătorii.',
    messageInstagram: 'Trimite-ne mesaj pe Instagram',
    learnMore: 'Află mai multe',
    
    // WhatsApp
    joinWhatsApp: 'Alătură-te comunității noastre WhatsApp',
    whatsappDescription: 'Rămâi conectat cu familia Chasing Endorphins & Kudos! Primește actualizări în timp real despre alergările noastre de duminică, alerte meteo, schimbări de traseu și evenimente exclusive ale comunității.',
    instantUpdates: 'Actualizări instantanee',
    instantUpdatesDesc: 'Fii notificat despre alergările viitoare, schimbările meteo și actualizările de ultimă oră',
    eventDetails: 'Detalii evenimente',
    eventDetailsDesc: 'Primește informații detaliate despre punctele de întâlnire, trasee și opriri la cafea',
    communityChat: 'Chat comunitate',
    communityChatDesc: 'Conectează-te cu alți alergători, împărtășește experiențe și fă-ți prieteni noi',
    readyToJoin: 'Gata să te alături conversației?',
    joinConversation: 'Fii primul care află despre următoarea noastră aventură! Alătură-te celor peste 50+ de alergători care rămân conectați prin comunitatea noastră activă WhatsApp.',
    activeMembers: 'Membri activi',
    dailyUpdates: 'Actualizări zilnice',
    instantNotifications: 'Notificări instantanee',
    joinWhatsAppGroup: 'Alătură-te grupului WhatsApp',
    noSpam: 'Click pentru a te alătura instant • Fără spam, doar actualizări despre alergare',
    whatYouGet: 'Ce vei primi în grupul nostru WhatsApp',
    weeklyAnnouncements: 'Anunțuri săptămânale de alergare',
    weeklyAnnouncementsDesc: 'Informații detaliate despre punctul de întâlnire de duminică, traseu și destinația cafelei',
    weatherUpdates: 'Actualizări meteo și traseu',
    weatherUpdatesDesc: 'Schimbări în timp real din cauza vremii sau evenimentelor speciale din oraș',
    communityDiscussions: 'Discuții comunitate',
    communityDiscussionsDesc: 'Împărtășește sfaturi de alergare, recomandări de cafea și sărbătorește realizările',
    specialEvents: 'Evenimente speciale',
    specialEventsDesc: 'Invitații exclusive la workshop-uri de alergare, evenimente sociale și provocări de grup',
    
    // Articles
    latestArticles: 'Articole recente',
    articlesDescription: 'Descoperă sfaturi de alergare, sfaturi de antrenament și povești din comunitatea noastră.',
    readMore: 'Citește mai mult',
    
    // Gallery
    memoriesInMotion: 'Amintiri în mișcare',
    galleryDescription: 'Verifică momentele importante din alergările noastre recente și aventurile cu cafea prin București.',
    followUs: 'Urmărește @runtosip',
    followDescription: 'Urmărește-ne pe Instagram pentru actualizări zilnice, fotografii de alergare și recomandări de cafea!',
    
    // Footer
    footerDescription: 'Comunitatea de alergare de top din București care combină fitness-ul cu cultura cafelei. Alătură-te nouă în fiecare duminică pentru aventuri de neuitat prin oraș.',
    quickLinks: 'Link-uri rapide',
    getInTouch: 'Ia legătura',
    bucharest: 'București, România',
    sundays: 'Duminici, 10:00',
    dmInstagram: 'Trimite-ne DM pe Instagram',
    weeklyRunningSchedule: 'Program săptămânal de alergare',
    startTime: 'Start la 10:00',
    differentLocations: 'Locații diferite prin București • Toate nivelurile de fitness sunt binevenite',
    madeWith: 'Făcut cu ❤️ și ☕ în București.',
    tagline: 'Alergând împreună, bând împreună, crescând împreună.',
    fueledBy: 'ALIMENTAT DE YOPRO',
    
    // Crew
    meetOurCrew: 'Întâlnește echipa noastră',
    crewDescription: 'Echipa pasionată din spatele Run To Sip care face posibilă fiecare aventură de duminică. De la organizarea traseelor la surprinderea amintirilor, fiecare membru aduce energia sa unică în comunitatea noastră.',
    joinOurTeam: 'Vrei să te alături echipei noastre?',
    joinTeamDescription: 'Căutăm mereu persoane pasionate care vor să ajute la dezvoltarea comunității noastre de alergare.',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ro'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ro' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};