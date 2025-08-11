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
}

interface Photo {
  id: number;
  url: string;
  caption: string;
}

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

interface DataContextType {
  events: Event[];
  articles: Article[];
  photos: Photo[];
  crewMembers: CrewMember[];
  loading: boolean;
  error: string | null;
  addEvent: (event: Event) => Promise<void>;
  updateEvent: (event: Event) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
  joinEvent: (eventId: number) => Promise<{ success: boolean; message: string }>;
  addArticle: (article: Article) => Promise<void>;
  updateArticle: (article: Article) => Promise<void>;
  deleteArticle: (id: number) => Promise<void>;
  addPhoto: (photo: Photo) => Promise<void>;
  updatePhoto: (photo: Photo) => Promise<void>;
  deletePhoto: (id: number) => Promise<void>;
  addCrewMember: (crewMember: CrewMember) => Promise<void>;
  updateCrewMember: (crewMember: CrewMember) => Promise<void>;
  deleteCrewMember: (id: number) => Promise<void>;
  uploadImage: (file: File, type?: 'event' | 'article' | 'crew' | 'gallery') => Promise<string>;
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
  const [articles, setArticles] = useState<Article[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [crewMembers, setCrewMembers] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API base URL - change this to your server URL in production
  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com/api' 
    : 'http://localhost:3001/api';

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/data`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setEvents(data.events || []);
      setArticles(data.articles || []);
      setPhotos(data.photos || []);
      setCrewMembers(data.crewMembers || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function for API calls
  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  };

  // Event functions
  const addEvent = async (event: Event) => {
    try {
      const newEvent = await apiCall('/events', {
        method: 'POST',
        body: JSON.stringify(event),
      });
      setEvents(prev => [...prev, newEvent]);
    } catch (err) {
      console.error('Error adding event:', err);
      throw err;
    }
  };

  const updateEvent = async (event: Event) => {
    try {
      const updatedEvent = await apiCall(`/events/${event.id}`, {
        method: 'PUT',
        body: JSON.stringify(event),
      });
      setEvents(prev => prev.map(e => e.id === event.id ? updatedEvent : e));
    } catch (err) {
      console.error('Error updating event:', err);
      throw err;
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      await apiCall(`/events/${id}`, { method: 'DELETE' });
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error('Error deleting event:', err);
      throw err;
    }
  };

  const joinEvent = async (eventId: number): Promise<{ success: boolean; message: string }> => {
    try {
      const result = await apiCall(`/events/${eventId}/join`, {
        method: 'POST',
      });
      // Refresh events to get updated runner count
      const eventsResponse = await apiCall('/events');
      setEvents(eventsResponse);
      return result;
    } catch (err) {
      console.error('Error joining event:', err);
      return { success: false, message: 'Failed to join event' };
    }
  };

  // Article functions
  const addArticle = async (article: Article) => {
    try {
      const newArticle = await apiCall('/articles', {
        method: 'POST',
        body: JSON.stringify(article),
      });
      setArticles(prev => [...prev, newArticle]);
    } catch (err) {
      console.error('Error adding article:', err);
      throw err;
    }
  };

  const updateArticle = async (article: Article) => {
    try {
      const updatedArticle = await apiCall(`/articles/${article.id}`, {
        method: 'PUT',
        body: JSON.stringify(article),
      });
      setArticles(prev => prev.map(a => a.id === article.id ? updatedArticle : a));
    } catch (err) {
      console.error('Error updating article:', err);
      throw err;
    }
  };

  const deleteArticle = async (id: number) => {
    try {
      await apiCall(`/articles/${id}`, { method: 'DELETE' });
      setArticles(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error('Error deleting article:', err);
      throw err;
    }
  };

  // Photo functions
  const addPhoto = async (photo: Photo) => {
    try {
      const newPhoto = await apiCall('/photos', {
        method: 'POST',
        body: JSON.stringify(photo),
      });
      setPhotos(prev => [...prev, newPhoto]);
    } catch (err) {
      console.error('Error adding photo:', err);
      throw err;
    }
  };

  const updatePhoto = async (photo: Photo) => {
    try {
      const updatedPhoto = await apiCall(`/photos/${photo.id}`, {
        method: 'PUT',
        body: JSON.stringify(photo),
      });
      setPhotos(prev => prev.map(p => p.id === photo.id ? updatedPhoto : p));
    } catch (err) {
      console.error('Error updating photo:', err);
      throw err;
    }
  };

  const deletePhoto = async (id: number) => {
    try {
      await apiCall(`/photos/${id}`, { method: 'DELETE' });
      setPhotos(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting photo:', err);
      throw err;
    }
  };

  // Crew member functions
  const addCrewMember = async (crewMember: CrewMember) => {
    try {
      const newCrewMember = await apiCall('/crew', {
        method: 'POST',
        body: JSON.stringify(crewMember),
      });
      setCrewMembers(prev => [...prev, newCrewMember]);
    } catch (err) {
      console.error('Error adding crew member:', err);
      throw err;
    }
  };

  const updateCrewMember = async (crewMember: CrewMember) => {
    try {
      const updatedCrewMember = await apiCall(`/crew/${crewMember.id}`, {
        method: 'PUT',
        body: JSON.stringify(crewMember),
      });
      setCrewMembers(prev => prev.map(c => c.id === crewMember.id ? updatedCrewMember : c));
    } catch (err) {
      console.error('Error updating crew member:', err);
      throw err;
    }
  };

  const deleteCrewMember = async (id: number) => {
    try {
      await apiCall(`/crew/${id}`, { method: 'DELETE' });
      setCrewMembers(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting crew member:', err);
      throw err;
    }
  };

  // Image upload function with resizing for specific dimensions
  const uploadImage = async (file: File, type: 'event' | 'article' | 'crew' | 'gallery' = 'gallery'): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        // Define target dimensions based on content type
        let targetWidth, targetHeight;
        
        switch (type) {
          case 'event':
            targetWidth = 800;
            targetHeight = 600;
            break;
          case 'article':
            targetWidth = 400;
            targetHeight = 300;
            break;
          case 'crew':
            targetWidth = 400;
            targetHeight = 400;
            break;
          case 'gallery':
            targetWidth = 400;
            targetHeight = 400;
            break;
          default:
            targetWidth = 400;
            targetHeight = 400;
        }
        
        // Calculate new dimensions maintaining aspect ratio
        const aspectRatio = img.width / img.height;
        const targetAspectRatio = targetWidth / targetHeight;
        
        let newWidth, newHeight;
        if (aspectRatio > targetAspectRatio) {
          // Image is wider than target
          newWidth = targetWidth;
          newHeight = targetWidth / aspectRatio;
        } else {
          // Image is taller than target
          newHeight = targetHeight;
          newWidth = targetHeight * aspectRatio;
        }
        
        // Set canvas size to target dimensions
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        
        // Fill with white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        
        // Calculate centering offset
        const offsetX = (targetWidth - newWidth) / 2;
        const offsetY = (targetHeight - newHeight) / 2;
        
        // Draw resized image centered
        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        
        // Convert to data URL
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(dataUrl);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const value: DataContextType = {
    events,
    articles,
    photos,
    crewMembers,
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
    joinEvent,
    addArticle,
    updateArticle,
    deleteArticle,
    addPhoto,
    updatePhoto,
    deletePhoto,
    addCrewMember,
    updateCrewMember,
    deleteCrewMember,
    uploadImage
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}; 