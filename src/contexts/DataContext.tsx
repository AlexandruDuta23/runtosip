import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

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
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
  setPagination: (p: { page: number; pageSize: number }) => void;
  refresh: () => Promise<void>;
  createEvent: (payload: Omit<Event, 'id' | 'runnerCount'>) => Promise<number>;
  updateEvent: (id: number, updates: Partial<Omit<Event, 'id'>>) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
  uploadEventImage: (id: number, file: File) => Promise<void>;
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
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const { authHeader } = useAuth();

  const refresh = async () => {
    try {
      setLoading(true);
      const url = `/api/events?page=${page}&pageSize=${pageSize}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      if (Array.isArray(data)) {
        setEvents(data);
        setTotal(undefined);
        setTotalPages(undefined);
      } else {
        setEvents(data.items || []);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      }
      setError(null);
    } catch (e: any) {
      setError(e?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [page, pageSize]);

  const setPagination = (p: { page: number; pageSize: number }) => {
    setPage(p.page);
    setPageSize(p.pageSize);
  };

  const createEvent = async (payload: Omit<Event, 'id' | 'runnerCount'>) => {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create event');
    const data = await res.json();
    await refresh();
    return data.id as number;
  };

  const updateEvent = async (id: number, updates: Partial<Omit<Event, 'id'>>) => {
    const res = await fetch(`/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update event');
    await refresh();
  };

  const deleteEvent = async (id: number) => {
    const res = await fetch(`/api/events/${id}`, { method: 'DELETE', headers: { ...authHeader() } });
    if (!res.ok && res.status !== 204) throw new Error('Failed to delete event');
    await refresh();
  };

  const uploadEventImage = async (id: number, file: File) => {
    const form = new FormData();
    form.append('image', file);
    const res = await fetch(`/api/events/${id}/image`, { method: 'POST', headers: { ...authHeader() }, body: form });
    if (!res.ok) throw new Error('Failed to upload image');
    await refresh();
  };

  const joinEvent = async (eventId: number): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch(`/api/events/${eventId}/join`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to join event');
      const data = await res.json();
      setEvents(prev => prev.map(event => event.id === eventId ? { ...event, runnerCount: data.runnerCount } : event));
      return { success: true, message: 'Successfully joined the event!' };
    } catch (err) {
      return { success: false, message: 'Failed to join event' };
    }
  };

  const value: DataContextType = {
    events,
    loading,
    error,
    page,
    pageSize,
    total,
    totalPages,
    setPagination,
    refresh,
    createEvent,
    updateEvent,
    deleteEvent,
    uploadEventImage,
    joinEvent,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};