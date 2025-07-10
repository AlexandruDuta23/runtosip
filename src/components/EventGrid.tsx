import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const EventGrid = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Herastrau Park Morning Run',
      date: 'Dec 15, 2024',
      time: '9:00 AM',
      location: 'Herastrau Park',
      distance: '5K - 8K',
      difficulty: 'All Levels',
      coffeeStop: 'Origo Coffee Shop',
      description: 'Beautiful lakeside run through Bucharest\'s largest park',
      image: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'Old Town Historic Circuit',
      date: 'Dec 22, 2024',
      time: '9:00 AM',
      location: 'Old Town Circuit',
      distance: '4K - 6K',
      difficulty: 'Beginner Friendly',
      coffeeStop: 'Cafea Specialty',
      description: 'Historic route through cobblestone streets and landmarks',
      image: 'https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      title: 'New Year Preparation Run',
      date: 'Dec 29, 2024',
      time: '9:00 AM',
      location: 'Cismigiu Gardens',
      distance: '3K - 7K',
      difficulty: 'All Levels',
      coffeeStop: 'The Ark Coffee',
      description: 'New Year preparation run in the heart of the city',
      image: 'https://images.pexels.com/photos/2402846/pexels-photo-2402846.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ]);

  // Listen for admin updates
  useEffect(() => {
    const handleAdminUpdate = () => {
      // In a real app, this would fetch updated data from an API
      // For now, we'll trigger a page refresh to show changes
      window.location.reload();
    };

    window.addEventListener('adminUpdate', handleAdminUpdate);
    return () => window.removeEventListener('adminUpdate', handleAdminUpdate);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {events.map((event, idx) => {
        // Determine background color: 0 = past (red), 1 = present (green), 2 = future (yellow)
        let bgColor = '';
        if (idx === 0) bgColor = 'bg-red-500';
        else if (idx === 1) bgColor = 'bg-green-500';
        else bgColor = 'bg-primary';
        return (
          <div
            key={event.id}
            className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative h-48">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className={`${bgColor} text-black px-3 py-1 rounded-full text-sm font-semibold`}>
                  {event.date}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className={`h-4 w-4 ${bgColor} text-black rounded-full p-1`} />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className={`h-4 w-4 ${bgColor} text-black rounded-full p-1`} />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className={`h-4 w-4 ${bgColor} text-black rounded-full p-1`} />
                  <span className="text-sm">{event.distance} • {event.difficulty}</span>
                </div>
              </div>
              
              <button className={`w-full ${bgColor} text-black py-3 rounded-full font-semibold hover:opacity-90 transition-colors duration-300`}>
                Join This Run
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventGrid;