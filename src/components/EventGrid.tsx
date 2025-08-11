import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const EventGrid = () => {
  const { events, joinEvent } = useData();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');

  const handleJoinRun = async (event: any) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    
    // Check if event date has passed
    if (eventDate < today) {
      setPopupMessage('This event has already passed. Join future events!');
      setPopupType('error');
      setShowPopup(true);
      return;
    }

    try {
      const result = await joinEvent(event.id);
      setPopupMessage(result.message);
      setPopupType(result.success ? 'success' : 'error');
      setShowPopup(true);
    } catch (error) {
      setPopupMessage('Failed to join event. Please try again.');
      setPopupType('error');
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {events.map((event, idx) => {
          // Determine background color: 0 = past (red), 1 = present (green), 2 = future (yellow)
          let bgColor = '';
          if (idx === 0) bgColor = 'bg-red-500';
          else if (idx === 1) bgColor = 'bg-green-500';
          else bgColor = 'bg-primary';
          
          const eventDate = new Date(event.date);
          const today = new Date();
          const isPastEvent = eventDate < today;
          
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
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                {/* Runner count badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{event.runnerCount}</span>
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
                
                <button 
                  onClick={() => handleJoinRun(event)}
                  disabled={isPastEvent}
                  className={`w-full ${bgColor} text-black py-3 rounded-full font-semibold transition-colors duration-300 ${
                    isPastEvent 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:opacity-90'
                  }`}
                >
                  {isPastEvent ? 'Event Passed' : 'Join This Run'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className={`text-4xl mb-4 ${popupType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {popupType === 'success' ? '✅' : '❌'}
              </div>
              <h3 className={`text-xl font-bold mb-4 ${popupType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {popupType === 'success' ? 'Success!' : 'Oops!'}
              </h3>
              <p className="text-gray-600 mb-6">{popupMessage}</p>
              <button
                onClick={closePopup}
                className="bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventGrid;