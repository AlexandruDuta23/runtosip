import React, { useState, useRef } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Eye, EyeOff } from 'lucide-react';
import { useData } from '../contexts/DataContext';

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

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'events' | 'articles' | 'crew' | 'gallery'>('events');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use shared data context
  const {
    events,
    articles,
    photos,
    crewMembers,
    loading: dataLoading,
    error: dataError,
    addEvent,
    updateEvent,
    deleteEvent,
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
  } = useData();

  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingCrewMember, setEditingCrewMember] = useState<CrewMember | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);

  const handleLogin = () => {
    if (password === 'kawasaki1822') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleSaveEvent = async (event: Event) => {
    try {
      setIsLoading(true);
      setError(null);
      if (event.id === 0) {
        await addEvent(event);
      } else {
        await updateEvent(event);
      }
      setEditingEvent(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save event');
      console.error('Error saving event:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        setIsLoading(true);
        setError(null);
        await deleteEvent(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete event');
        console.error('Error deleting event:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSaveArticle = async (article: Article) => {
    try {
      setIsLoading(true);
      setError(null);
      if (article.id === 0) {
        await addArticle(article);
      } else {
        await updateArticle(article);
      }
      setEditingArticle(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save article');
      console.error('Error saving article:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        setIsLoading(true);
        setError(null);
        await deleteArticle(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete article');
        console.error('Error deleting article:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSaveCrewMember = async (crewMember: CrewMember) => {
    try {
      setIsLoading(true);
      setError(null);
      if (crewMember.id === 0) {
        await addCrewMember(crewMember);
      } else {
        await updateCrewMember(crewMember);
      }
      setEditingCrewMember(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save crew member');
      console.error('Error saving crew member:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCrewMember = async (id: number) => {
    if (confirm('Are you sure you want to delete this crew member?')) {
      try {
        setIsLoading(true);
        setError(null);
        await deleteCrewMember(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete crew member');
        console.error('Error deleting crew member:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSavePhoto = async (photo: Photo) => {
    try {
      setIsLoading(true);
      setError(null);
      if (photo.id === 0) {
        await addPhoto(photo);
      } else {
        await updatePhoto(photo);
      }
      setEditingPhoto(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save photo');
      console.error('Error saving photo:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePhoto = async (id: number) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      try {
        setIsLoading(true);
        setError(null);
        await deletePhoto(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete photo');
        console.error('Error deleting photo:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-black py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
          <button
            onClick={() => {
              onClose();
              setIsAuthenticated(false);
              setPassword('');
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex border-b">
          {['events', 'articles', 'crew', 'gallery'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 font-semibold capitalize ${
                activeTab === tab
                  ? 'bg-primary text-black border-b-2 border-secondary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === 'events' && (
            <EventsTab
              events={events}
              editingEvent={editingEvent}
              setEditingEvent={setEditingEvent}
              onSave={handleSaveEvent}
              onDelete={handleDeleteEvent}
              uploadImage={uploadImage}
              isLoading={isLoading}
              error={error}
            />
          )}
          {activeTab === 'articles' && (
            <ArticlesTab
              articles={articles}
              editingArticle={editingArticle}
              setEditingArticle={setEditingArticle}
              onSave={handleSaveArticle}
              onDelete={handleDeleteArticle}
              uploadImage={uploadImage}
              isLoading={isLoading}
              error={error}
            />
          )}
          {activeTab === 'crew' && (
            <CrewTab
              crewMembers={crewMembers}
              editingCrewMember={editingCrewMember}
              setEditingCrewMember={setEditingCrewMember}
              onSave={handleSaveCrewMember}
              onDelete={handleDeleteCrewMember}
              uploadImage={uploadImage}
              isLoading={isLoading}
              error={error}
            />
          )}
          {activeTab === 'gallery' && (
            <GalleryTab
              photos={photos}
              editingPhoto={editingPhoto}
              setEditingPhoto={setEditingPhoto}
              onSave={handleSavePhoto}
              onDelete={handleDeletePhoto}
              uploadImage={uploadImage}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// File Upload Hook
const useFileUpload = (uploadImage: (file: File, type?: 'event' | 'article' | 'crew' | 'gallery') => Promise<string>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = (callback: (url: string) => void, type: 'event' | 'article' | 'crew' | 'gallery' = 'gallery') => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void, type: 'event' | 'article' | 'crew' | 'gallery' = 'gallery') => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const resizedUrl = await uploadImage(file, type);
        callback(resizedUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      }
    }
  };

  const FileInput = ({ onFileSelect, type }: { onFileSelect: (url: string) => void, type: 'event' | 'article' | 'crew' | 'gallery' }) => (
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={(e) => handleFileChange(e, onFileSelect, type)}
      className="hidden"
    />
  );

  return { uploadFile, FileInput };
};

// Events Tab Component
const EventsTab = ({ events, editingEvent, setEditingEvent, onSave, onDelete, uploadImage, isLoading, error }: any) => {
  const [formData, setFormData] = useState<Event>({
    id: 0,
    title: '',
    date: '',
    time: '',
    location: '',
    distance: '',
    difficulty: '',
    coffeeStop: '',
    description: '',
    image: '',
    runnerCount: 0
  });

  const { uploadFile, FileInput } = useFileUpload(uploadImage);

  React.useEffect(() => {
    if (editingEvent) {
      setFormData(editingEvent);
    }
  }, [editingEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      id: 0,
      title: '',
      date: '',
      time: '',
      location: '',
      distance: '',
      difficulty: '',
      coffeeStop: '',
      description: '',
      image: '',
      runnerCount: 0
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Manage Events ({events.length} total)</h3>
        <button
          onClick={() => setEditingEvent({ id: 0, title: '', date: '', time: '', location: '', distance: '', difficulty: '', coffeeStop: '', description: '', image: '', runnerCount: 0 })}
          className="bg-primary text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Event</span>
        </button>
      </div>

      {editingEvent && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              placeholder="Distance (e.g., 5K - 8K)"
              value={formData.distance}
              onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              placeholder="Difficulty Level"
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="number"
              placeholder="Runner Count"
              value={formData.runnerCount}
              onChange={(e) => setFormData({ ...formData, runnerCount: parseInt(e.target.value, 10) || 0 })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Coffee Stop"
            value={formData.coffeeStop}
            onChange={(e) => setFormData({ ...formData, coffeeStop: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            required
          />
          <textarea
            placeholder="Event Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4 h-24"
            required
          />
          
          {/* Image Upload Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => uploadFile((url) => setFormData({ ...formData, image: url }), 'event')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Image</span>
              </button>
              {formData.image && (
                <img src={formData.image} alt="Preview" className="h-16 w-16 object-cover rounded-lg" />
              )}
            </div>
            <FileInput onFileSelect={(url) => setFormData({ ...formData, image: url })} type="event" />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={() => setEditingEvent(null)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {events.map((event: Event) => (
          <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {event.image && (
                <img src={event.image} alt={event.title} className="h-16 w-16 object-cover rounded-lg" />
              )}
              <div>
                <h4 className="font-semibold text-gray-900">{event.title}</h4>
                <p className="text-gray-600">{event.date} at {event.time} - {event.location}</p>
                <p className="text-sm text-gray-500">{event.distance} • {event.difficulty}</p>
                <p className="text-sm text-blue-600 font-medium">👥 {event.runnerCount} runners joined</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingEvent(event)}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Articles Tab Component
const ArticlesTab = ({ articles, editingArticle, setEditingArticle, onSave, onDelete, uploadImage, isLoading, error }: any) => {
  const [formData, setFormData] = useState<Article>({
    id: 0,
    title: '',
    titleRo: '',
    excerpt: '',
    excerptRo: '',
    author: '',
    date: '',
    image: '',
    category: '',
    categoryRo: ''
  });

  const { uploadFile, FileInput } = useFileUpload(uploadImage);

  React.useEffect(() => {
    if (editingArticle) {
      setFormData(editingArticle);
    }
  }, [editingArticle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      id: 0,
      title: '',
      titleRo: '',
      excerpt: '',
      excerptRo: '',
      author: '',
      date: '',
      image: '',
      category: '',
      categoryRo: ''
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Manage Articles ({articles.length} total)</h3>
        <button
          onClick={() => setEditingArticle({ id: 0, title: '', titleRo: '', excerpt: '', excerptRo: '', author: '', date: '', image: '', category: '', categoryRo: '' })}
          className="bg-primary text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Article</span>
        </button>
      </div>

      {editingArticle && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Title (English)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              placeholder="Title (Romanian)"
              value={formData.titleRo}
              onChange={(e) => setFormData({ ...formData, titleRo: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              placeholder="Category (English)"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              placeholder="Category (Romanian)"
              value={formData.categoryRo}
              onChange={(e) => setFormData({ ...formData, categoryRo: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <textarea
            placeholder="Excerpt (English)"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4 h-24"
            required
          />
          <textarea
            placeholder="Excerpt (Romanian)"
            value={formData.excerptRo}
            onChange={(e) => setFormData({ ...formData, excerptRo: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4 h-24"
            required
          />
          
          {/* Image Upload Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Article Image</label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => uploadFile((url) => setFormData({ ...formData, image: url }), 'article')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Image</span>
              </button>
              {formData.image && (
                <img src={formData.image} alt="Preview" className="h-16 w-16 object-cover rounded-lg" />
              )}
            </div>
            <FileInput onFileSelect={(url) => setFormData({ ...formData, image: url })} type="article" />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={() => setEditingArticle(null)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {articles.map((article: Article) => (
          <div key={article.id} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {article.image && (
                <img src={article.image} alt={article.title} className="h-16 w-16 object-cover rounded-lg" />
              )}
              <div>
                <h4 className="font-semibold text-gray-900">{article.title}</h4>
                <p className="text-gray-600">By {article.author} - {article.date}</p>
                <p className="text-sm text-gray-500">{article.category}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingArticle(article)}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(article.id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Crew Tab Component
const CrewTab = ({ crewMembers, editingCrewMember, setEditingCrewMember, onSave, onDelete, uploadImage, isLoading, error }: any) => {
  const [formData, setFormData] = useState<CrewMember>({
    id: 0,
    name: '',
    role: '',
    roleRo: '',
    description: '',
    descriptionRo: '',
    image: '',
    instagram: '',
    email: ''
  });

  const { uploadFile, FileInput } = useFileUpload(uploadImage);

  React.useEffect(() => {
    if (editingCrewMember) {
      setFormData(editingCrewMember);
    }
  }, [editingCrewMember]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      id: 0,
      name: '',
      role: '',
      roleRo: '',
      description: '',
      descriptionRo: '',
      image: '',
      instagram: '',
      email: ''
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Manage Crew ({crewMembers.length} total)</h3>
        <button
          onClick={() => setEditingCrewMember({ id: 0, name: '', role: '', roleRo: '', description: '', descriptionRo: '', image: '', instagram: '', email: '' })}
          className="bg-primary text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Crew Member</span>
        </button>
      </div>

      {editingCrewMember && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              placeholder="Role (English)"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              placeholder="Role (Romanian)"
              value={formData.roleRo}
              onChange={(e) => setFormData({ ...formData, roleRo: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              placeholder="Instagram (optional)"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <input
            type="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
          />
          <textarea
            placeholder="Description (English)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4 h-24"
            required
          />
          <textarea
            placeholder="Description (Romanian)"
            value={formData.descriptionRo}
            onChange={(e) => setFormData({ ...formData, descriptionRo: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4 h-24"
            required
          />
          
          {/* Image Upload Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => uploadFile((url) => setFormData({ ...formData, image: url }), 'crew')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Photo</span>
              </button>
              {formData.image && (
                <img src={formData.image} alt="Preview" className="h-16 w-16 object-cover rounded-lg" />
              )}
            </div>
            <FileInput onFileSelect={(url) => setFormData({ ...formData, image: url })} type="crew" />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={() => setEditingCrewMember(null)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {crewMembers.map((member: CrewMember) => (
          <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {member.image && (
                <img src={member.image} alt={member.name} className="h-16 w-16 object-cover rounded-full" />
              )}
              <div>
                <h4 className="font-semibold text-gray-900">{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
                <p className="text-sm text-gray-500">{member.instagram}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingCrewMember(member)}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(member.id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Gallery Tab Component
const GalleryTab = ({ photos, editingPhoto, setEditingPhoto, onSave, onDelete, uploadImage, isLoading, error }: any) => {
  const [formData, setFormData] = useState<Photo>({
    id: 0,
    url: '',
    caption: ''
  });

  const { uploadFile, FileInput } = useFileUpload(uploadImage);

  React.useEffect(() => {
    if (editingPhoto) {
      setFormData(editingPhoto);
    }
  }, [editingPhoto]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      id: 0,
      url: '',
      caption: ''
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Manage Gallery ({photos.length} total)</h3>
        <button
          onClick={() => setEditingPhoto({ id: 0, url: '', caption: '' })}
          className="bg-primary text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {editingPhoto && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6">
          {/* Image Upload Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => uploadFile((url) => setFormData({ ...formData, url }), 'gallery')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Photo</span>
              </button>
              {formData.url && (
                <img src={formData.url} alt="Preview" className="h-16 w-16 object-cover rounded-lg" />
              )}
            </div>
            <FileInput onFileSelect={(url) => setFormData({ ...formData, url })} type="gallery" />
          </div>

          <input
            type="text"
            placeholder="Photo Caption"
            value={formData.caption}
            onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            required
          />
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={() => setEditingPhoto(null)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {photos.map((photo: Photo) => (
          <div key={photo.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <img src={photo.url} alt={photo.caption} className="w-full h-32 object-cover" />
            <div className="p-3">
              <p className="text-gray-600 mb-2 text-sm">{photo.caption}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingPhoto(photo)}
                  className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition-colors duration-200 flex-1"
                >
                  <Edit className="h-3 w-3 mx-auto" />
                </button>
                <button
                  onClick={() => onDelete(photo.id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors duration-200 flex-1"
                >
                  <Trash2 className="h-3 w-3 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;