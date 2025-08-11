import React, { createContext, useContext, useState, useEffect } from 'react';

// Define interfaces for our data types
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  difficulty: string;
  coffeeStop: string;
  description: string;
  image: string;
  runnerCount: number;
}

interface DataContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  joinEvent: (eventId: number) => Promise<{ success: boolean; message: string }>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Static events data
  const staticEvents: Event[] = [
    {
      id: 1,
      title: "Herastrau Park Morning Run",
      date: "2024-12-15",
      time: "09:00",
      location: "Herastrau Park",
      distance: "5K - 8K",
      difficulty: "All Levels",
      coffeeStop: "Origo Coffee Shop",
      description: "Beautiful lakeside run through Bucharest's largest park",
      image: "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800",
      runnerCount: 15
    },
    {
      id: 2,
      title: "Cismigiu Gardens Evening Run",
      date: "2024-12-20",
      time: "18:30",
      location: "Cismigiu Gardens",
      distance: "3K - 5K",
      difficulty: "Beginner Friendly",
      coffeeStop: "Café Central",
      description: "Relaxing evening run in the heart of Bucharest",
      image: "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800",
      runnerCount: 8
    },
    {
      id: 3,
      title: "Carol Park Trail Run",
      date: "2024-12-25",
      time: "10:00",
      location: "Carol Park",
      distance: "8K - 12K",
      difficulty: "Intermediate",
      coffeeStop: "Starbucks",
      description: "Challenging trail run with beautiful city views",
      image: "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800",
      runnerCount: 12
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setEvents(staticEvents);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const joinEvent = async (eventId: number): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, runnerCount: event.runnerCount + 1 }
          : event
      ));
      
      return { success: true, message: 'Successfully joined the event!' };
    } catch (err) {
      return { success: false, message: 'Failed to join event' };
    }
  };

  const value: DataContextType = {
    events,
    loading,
    error,
    joinEvent
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}; 