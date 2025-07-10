import React, { useState, useRef } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Eye, EyeOff } from 'lucide-react';

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

  // Sample data - in a real app, this would come from a database
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Herastrau Park Morning Run',
      date: '2024-12-15',
      time: '09:00',
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
      date: '2024-12-22',
      time: '09:00',
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
      date: '2024-12-29',
      time: '09:00',
      location: 'Cismigiu Gardens',
      distance: '3K - 7K',
      difficulty: 'All Levels',
      coffeeStop: 'The Ark Coffee',
      description: 'New Year preparation run in the heart of the city',
      image: 'https://images.pexels.com/photos/2402846/pexels-photo-2402846.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ]);

  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: 'The Perfect Pre-Run Breakfast',
      titleRo: 'Micul dejun perfect înainte de alergare',
      excerpt: 'Discover what to eat before your morning run to maximize performance and avoid digestive issues.',
      excerptRo: 'Descoperă ce să mănânci înainte de alergarea de dimineață pentru a maximiza performanța și a evita problemele digestive.',
      author: 'Maria Popescu',
      date: '2024-12-10',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Nutrition',
      categoryRo: 'Nutriție'
    },
    {
      id: 2,
      title: 'Running in Winter: Essential Tips',
      titleRo: 'Alergarea iarna: Sfaturi esențiale',
      excerpt: 'Stay motivated and safe during cold weather runs with our comprehensive winter running guide.',
      excerptRo: 'Rămâi motivat și în siguranță în timpul alergărilor pe vreme rece cu ghidul nostru complet pentru alergarea de iarnă.',
      author: 'Alexandru Ionescu',
      date: '2024-12-08',
      image: 'https://images.pexels.com/photos/2402846/pexels-photo-2402846.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Training',
      categoryRo: 'Antrenament'
    },
    {
      id: 3,
      title: 'Best Coffee Spots After Your Run',
      titleRo: 'Cele mai bune cafenele după alergare',
      excerpt: 'Our curated list of the best coffee shops in Bucharest perfect for post-run recovery.',
      excerptRo: 'Lista noastră selectată cu cele mai bune cafenele din București perfecte pentru recuperarea după alergare.',
      author: 'Ioana Marinescu',
      date: '2024-12-05',
      image: 'https://images.pexels.com/photos/1571939/pexels-photo-1571939.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Coffee',
      categoryRo: 'Cafea'
    }
  ]);

  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: 1,
      url: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Sunday morning run through Herastrau Park'
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/1571939/pexels-photo-1571939.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Post-run coffee celebration'
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/1671327/pexels-photo-1671327.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Our amazing running community'
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Exploring Old Town Bucharest'
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/2402846/pexels-photo-2402846.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Coffee time after a great run'
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/1571940/pexels-photo-1571940.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Team spirit and friendship'
    }
  ]);

  const [crewMembers, setCrewMembers] = useState<CrewMember[]>([
    {
      id: 1,
      name: 'Alexandra',
      role: 'Founder',
      roleRo: 'Fondator',
      description: 'The visionary behind Run To Sip, passionate about building community through running.',
      descriptionRo: 'Vizionara din spatele Run To Sip, pasionată de construirea comunității prin alergare.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      instagram: '@alexandra_runtosip'
    },
    {
      id: 2,
      name: 'Nemir',
      role: 'Co-Founder',
      roleRo: 'Co-Fondator',
      description: 'Bringing energy and enthusiasm to every run, ensuring everyone feels welcome.',
      descriptionRo: 'Aducând energie și entuziasm la fiecare alergare, asigurându-se că toată lumea se simte binevenită.',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      instagram: '@nemir_runs'
    },
    {
      id: 3,
      name: 'Tudor',
      role: 'Photographer',
      roleRo: 'Fotograf',
      description: 'Capturing the beautiful moments and memories from our running adventures.',
      descriptionRo: 'Surprinzând momentele frumoase și amintirile din aventurile noastre de alergare.',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      instagram: '@tudor_photos'
    },
    {
      id: 4,
      name: 'Ionut',
      role: 'Pacer',
      roleRo: 'Pacer',
      description: 'Keeping the group together and ensuring everyone maintains their perfect pace.',
      descriptionRo: 'Menținând grupul unit și asigurându-se că toată lumea își păstrează ritmul perfect.',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
      instagram: '@ionut_pacer'
    }
  ]);

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

  const handleSaveEvent = (event: Event) => {
    if (event.id === 0) {
      const newEvent = { ...event, id: Date.now() };
      setEvents([...events, newEvent]);
    } else {
      setEvents(events.map(e => e.id === event.id ? event : e));
    }
    setEditingEvent(null);
    // Trigger a re-render of the main site
    window.dispatchEvent(new CustomEvent('adminUpdate'));
  };

  const handleDeleteEvent = (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== id));
      window.dispatchEvent(new CustomEvent('adminUpdate'));
    }
  };

  const handleSaveArticle = (article: Article) => {
    if (article.id === 0) {
      const newArticle = { ...article, id: Date.now() };
      setArticles([...articles, newArticle]);
    } else {
      setArticles(articles.map(a => a.id === article.id ? article : a));
    }
    setEditingArticle(null);
    window.dispatchEvent(new CustomEvent('adminUpdate'));
  };

  const handleDeleteArticle = (id: number) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(a => a.id !== id));
      window.dispatchEvent(new CustomEvent('adminUpdate'));
    }
  };

  const handleSaveCrewMember = (crewMember: CrewMember) => {
    let updatedCrewMembers;
    if (crewMember.id === 0) {
      const newCrewMember = { ...crewMember, id: Date.now() };
      updatedCrewMembers = [...crewMembers, newCrewMember];
      setCrewMembers(updatedCrewMembers);
    } else {
      updatedCrewMembers = crewMembers.map(c => c.id === crewMember.id ? crewMember : c);
      setCrewMembers(updatedCrewMembers);
    }
    setEditingCrewMember(null);
    window.dispatchEvent(new CustomEvent('adminUpdate', { detail: { crewMembers: updatedCrewMembers } }));
  };

  const handleDeleteCrewMember = (id: number) => {
    if (confirm('Are you sure you want to delete this crew member?')) {
      const updatedCrewMembers = crewMembers.filter(c => c.id !== id);
      setCrewMembers(updatedCrewMembers);
      window.dispatchEvent(new CustomEvent('adminUpdate', { detail: { crewMembers: updatedCrewMembers } }));
    }
  };

  const handleSavePhoto = (photo: Photo) => {
    if (photo.id === 0) {
      const newPhoto = { ...photo, id: Date.now() };
      setPhotos([...photos, newPhoto]);
    } else {
      setPhotos(photos.map(p => p.id === photo.id ? photo : p));
    }
    setEditingPhoto(null);
    window.dispatchEvent(new CustomEvent('adminUpdate'));
  };

  const handleDeletePhoto = (id: number) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      setPhotos(photos.filter(p => p.id !== id));
      window.dispatchEvent(new CustomEvent('adminUpdate'));
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
            />
          )}
          {activeTab === 'articles' && (
            <ArticlesTab
              articles={articles}
              editingArticle={editingArticle}
              setEditingArticle={setEditingArticle}
              onSave={handleSaveArticle}
              onDelete={handleDeleteArticle}
            />
          )}
          {activeTab === 'crew' && (
            <CrewTab
              crewMembers={crewMembers}
              editingCrewMember={editingCrewMember}
              setEditingCrewMember={setEditingCrewMember}
              onSave={handleSaveCrewMember}
              onDelete={handleDeleteCrewMember}
            />
          )}
          {activeTab === 'gallery' && (
            <GalleryTab
              photos={photos}
              editingPhoto={editingPhoto}
              setEditingPhoto={setEditingPhoto}
              onSave={handleSavePhoto}
              onDelete={handleDeletePhoto}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// File Upload Hook
const useFileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = (callback: (url: string) => void) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        callback(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const FileInput = ({ onFileSelect }: { onFileSelect: (url: string) => void }) => (
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={(e) => handleFileChange(e, onFileSelect)}
      className="hidden"
    />
  );

  return { uploadFile, FileInput };
};

// Events Tab Component
const EventsTab = ({ events, editingEvent, setEditingEvent, onSave, onDelete }: any) => {
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
    image: ''
  });

  const { uploadFile, FileInput } = useFileUpload();

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
      image: ''
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Manage Events ({events.length} total)</h3>
        <button
          onClick={() => setEditingEvent({ id: 0, title: '', date: '', time: '', location: '', distance: '', difficulty: '', coffeeStop: '', description: '', image: '' })}
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
                onClick={() => uploadFile((url) => setFormData({ ...formData, image: url }))}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Image</span>
              </button>
              {formData.image && (
                <img src={formData.image} alt="Preview" className="h-16 w-16 object-cover rounded-lg" />
              )}
            </div>
            <FileInput onFileSelect={(url) => setFormData({ ...formData, image: url })} />
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
const ArticlesTab = ({ articles, editingArticle, setEditingArticle, onSave, onDelete }: any) => {
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

  const { uploadFile, FileInput } = useFileUpload();

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
                onClick={() => uploadFile((url) => setFormData({ ...formData, image: url }))}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Image</span>
              </button>
              {formData.image && (
                <img src={formData.image} alt="Preview" className="h-16 w-16 object-cover rounded-lg" />
              )}
            </div>
            <FileInput onFileSelect={(url) => setFormData({ ...formData, image: url })} />
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
const CrewTab = ({ crewMembers, editingCrewMember, setEditingCrewMember, onSave, onDelete }: any) => {
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

  const { uploadFile, FileInput } = useFileUpload();

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
                onClick={() => uploadFile((url) => setFormData({ ...formData, image: url }))}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Photo</span>
              </button>
              {formData.image && (
                <img src={formData.image} alt="Preview" className="h-16 w-16 object-cover rounded-lg" />
              )}
            </div>
            <FileInput onFileSelect={(url) => setFormData({ ...formData, image: url })} />
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
const GalleryTab = ({ photos, editingPhoto, setEditingPhoto, onSave, onDelete }: any) => {
  const [formData, setFormData] = useState<Photo>({
    id: 0,
    url: '',
    caption: ''
  });

  const { uploadFile, FileInput } = useFileUpload();

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
                onClick={() => uploadFile((url) => setFormData({ ...formData, url }))}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Photo</span>
              </button>
              {formData.url && (
                <img src={formData.url} alt="Preview" className="h-16 w-16 object-cover rounded-lg" />
              )}
            </div>
            <FileInput onFileSelect={(url) => setFormData({ ...formData, url })} />
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