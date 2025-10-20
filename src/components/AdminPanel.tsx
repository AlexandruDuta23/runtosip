import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

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

interface AdminPanelProps {
  onClose?: () => void;
  variant?: 'modal' | 'page';
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, variant = 'modal' }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated, login, logout, authHeader, username: currentUser } = useAuth();
  const { events, createEvent, updateEvent, deleteEvent, uploadEventImage, refresh, page, pageSize, totalPages, setPagination } = useData();
  const [activeTab, setActiveTab] = useState<'events' | 'crew' | 'articles' | 'admins'>('events');

  // Admins state
  const [admins, setAdmins] = useState<Array<{ id: number; username: string }>>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });

  // Events create/edit state
  const emptyEvent = useMemo(() => ({
    title: '',
    date: '',
    time: '',
    location: '',
    distance: '',
    difficulty: 'Beginner Friendly',
    coffeeStop: '',
    description: '',
    image: '/uploads/placeholder.jpg',
  }), []);
  const [creatingEvent, setCreatingEvent] = useState(emptyEvent);
  const [creatingEventFile, setCreatingEventFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingEvent, setEditingEvent] = useState(emptyEvent);
  const [createErrors, setCreateErrors] = useState<string[]>([]);
  const [editErrors, setEditErrors] = useState<string[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [eventImageSelected, setEventImageSelected] = useState(false);

  const showToast = (t: 'success' | 'error', message: string) => {
    setToast({ type: t, message });
    setTimeout(() => setToast(null), 2500);
  };

  // Search & filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('');
  const [filterDateFrom, setFilterDateFrom] = useState<string>('');
  const [filterDateTo, setFilterDateTo] = useState<string>('');

  const difficulties = useMemo(() => {
    const set = new Set<string>();
    events.forEach(e => { if (e.difficulty) set.add(e.difficulty); });
    return Array.from(set).sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const q = searchQuery.trim().toLowerCase();
      if (q) {
        const hay = `${e.title} ${e.location} ${e.distance} ${e.difficulty} ${e.coffeeStop} ${e.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filterDifficulty && e.difficulty !== filterDifficulty) return false;
      if (filterDateFrom && new Date(e.date) < new Date(filterDateFrom)) return false;
      if (filterDateTo && new Date(e.date) > new Date(filterDateTo)) return false;
      return true;
    });
  }, [events, searchQuery, filterDifficulty, filterDateFrom, filterDateTo]);

  const validateEventData = (ev: { title: string; date: string; time: string; location: string; distance: string; difficulty: string; coffeeStop: string; description: string; image: string; }) => {
    const errs: string[] = [];
    const dateRe = /^\d{4}-\d{2}-\d{2}$/;
    const timeRe = /^\d{2}:\d{2}$/;
    if (!ev.title.trim()) errs.push('Title is required');
    if (!ev.date.match(dateRe) || isNaN(new Date(ev.date).getTime())) errs.push('Valid date (YYYY-MM-DD) is required');
    if (!ev.time.match(timeRe)) errs.push('Valid time (HH:MM) is required');
    if (!ev.location.trim()) errs.push('Location is required');
    if (!ev.distance.trim()) errs.push('Distance is required');
    if (!ev.difficulty.trim()) errs.push('Difficulty is required');
    if (!ev.coffeeStop.trim()) errs.push('Coffee stop is required');
    if (!ev.description.trim() || ev.description.length < 10) errs.push('Description is required (min 10 chars)');
    return errs;
  };

  const handleLogin = async () => {
    setError(null);
    const ok = await login(username, password);
    if (!ok) setError('Invalid credentials');
  };

  const loadAdmins = async () => {
    try {
      setLoadingAdmins(true);
      setAdminError(null);
      const res = await fetch('/api/admins', { headers: { ...authHeader() } });
      if (!res.ok) throw new Error('Failed to load admins');
      const data = await res.json();
      setAdmins(data);
    } catch (e: any) {
      setAdminError(e?.message || 'Unknown error');
    } finally {
      setLoadingAdmins(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === 'admins') {
      loadAdmins();
    }
  }, [isAuthenticated, activeTab]);

  if (!isAuthenticated) {
    const LoginCard = (
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h2>
          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div className="relative mb-2 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
          <div className="flex space-x-4">
            <button
              onClick={handleLogin}
              className="flex-1 bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200"
            >
              Login
            </button>
            {variant === 'modal' && (
              <button
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    );

    if (variant === 'modal') {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {LoginCard}
        </div>
      );
    }

    return (
      <div className="w-full flex items-start justify-center py-8">
        {LoginCard}
      </div>
    );
  }

  const PanelChrome = (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl mx-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
            {variant === 'modal' && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>

        <div className="px-6 pt-4">
          {/* Tabs */}
          <div className="flex gap-4 border-b">
            <button
              className={`px-4 py-2 ${activeTab === 'events' ? 'border-b-2 border-primary font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('events')}
            >
              Events
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'crew' ? 'border-b-2 border-primary font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('crew')}
            >
              Crew
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'articles' ? 'border-b-2 border-primary font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('articles')}
            >
              Articles
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'admins' ? 'border-b-2 border-primary font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('admins')}
            >
              Admins
            </button>
          </div>
        </div>

        {activeTab === 'events' && (
          <div className="p-6 space-y-6">
            {/* Search & Filters */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold mb-3">Search & Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input className="border rounded px-3 py-2" placeholder="Search by text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                <select className="border rounded px-3 py-2" value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)}>
                  <option value="">All difficulties</option>
                  {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <input className="border rounded px-3 py-2" type="date" value={filterDateFrom} onChange={e => setFilterDateFrom(e.target.value)} />
                <input className="border rounded px-3 py-2" type="date" value={filterDateTo} onChange={e => setFilterDateTo(e.target.value)} />
              </div>
            </div>
            {/* Add Event */}
            <div className="flex justify-end">
              <button className="bg-primary text-black px-4 py-2 rounded font-semibold flex items-center gap-2" onClick={() => setIsCreateOpen(true)}>
                <Plus className="h-4 w-4" /> Add Event
              </button>
            </div>

            {/* Events table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="p-2">Title</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Time</th>
                    <th className="p-2">Location</th>
                    <th className="p-2">Distance</th>
                    <th className="p-2">Difficulty</th>
                    <th className="p-2">Runners</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map(ev => (
                    <React.Fragment key={ev.id}>
                      <tr className="border-t">
                        <td className="p-2 font-medium">{ev.title}</td>
                        <td className="p-2">{new Date(ev.date).toISOString().slice(0,10)}</td>
                        <td className="p-2">{ev.time}</td>
                        <td className="p-2">{ev.location}</td>
                        <td className="p-2">{ev.distance}</td>
                        <td className="p-2">{ev.difficulty}</td>
                        <td className="p-2">{ev.runnerCount}</td>
                        <td className="p-2 flex gap-2">
                          <button className="px-2 py-1 border rounded flex items-center gap-1" onClick={() => { setEditingId(ev.id); setEditingEvent({ title: ev.title, date: new Date(ev.date).toISOString().slice(0,10), time: ev.time, location: ev.location, distance: ev.distance, difficulty: ev.difficulty, coffeeStop: ev.coffeeStop, description: ev.description, image: ev.image }); }}><Edit className="h-4 w-4" /> Edit</button>
                          <label className="px-2 py-1 border rounded flex items-center gap-1 cursor-pointer">
                            <ImageIcon className="h-4 w-4" /> Change Image
                            <input type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) { try { await uploadEventImage(ev.id, f); showToast('success','Image updated'); await refresh(); } catch { showToast('error','Image update failed'); } e.currentTarget.value=''; } }} />
                          </label>
                          <button className="px-2 py-1 border rounded text-red-600 flex items-center gap-1" onClick={async () => { if (confirm('Delete this event?')) { await deleteEvent(ev.id); await refresh(); showToast('success', 'Event deleted successfully'); } }}><Trash2 className="h-4 w-4" /> Delete</button>
                        </td>
                      </tr>
                      {editingId === ev.id && (
                        <tr className="bg-gray-50">
                          <td colSpan={8} className="p-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input className="border rounded px-3 py-2" placeholder="Title" value={editingEvent.title} onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })} />
                              <input className="border rounded px-3 py-2" type="date" value={editingEvent.date} onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })} />
                              <input className="border rounded px-3 py-2" type="time" value={editingEvent.time} onChange={e => setEditingEvent({ ...editingEvent, time: e.target.value })} />
                              <input className="border rounded px-3 py-2" placeholder="Location" value={editingEvent.location} onChange={e => setEditingEvent({ ...editingEvent, location: e.target.value })} />
                              <input className="border rounded px-3 py-2" placeholder="Distance" value={editingEvent.distance} onChange={e => setEditingEvent({ ...editingEvent, distance: e.target.value })} />
                              <input className="border rounded px-3 py-2" placeholder="Difficulty" value={editingEvent.difficulty} onChange={e => setEditingEvent({ ...editingEvent, difficulty: e.target.value })} />
                              <input className="border rounded px-3 py-2" placeholder="Coffee Stop" value={editingEvent.coffeeStop} onChange={e => setEditingEvent({ ...editingEvent, coffeeStop: e.target.value })} />
                              <input className="border rounded px-3 py-2" placeholder="Image (URL)" value={editingEvent.image} onChange={e => setEditingEvent({ ...editingEvent, image: e.target.value })} />
                              <textarea className="md:col-span-2 border rounded px-3 py-2" placeholder="Description" value={editingEvent.description} onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })} />
                            </div>
                            <div className="mt-3 flex gap-2 items-start">
                              <div className="flex-1">
                                {editErrors.length > 0 && (
                                  <ul className="text-red-600 text-sm mb-2 list-disc list-inside">
                                    {editErrors.map((e, i) => <li key={i}>{e}</li>)}
                                  </ul>
                                )}
                              </div>
                              <button className="bg-primary text-black px-4 py-2 rounded font-semibold flex items-center gap-1" onClick={async () => {
                                const errs = validateEventData(editingEvent);
                                setEditErrors(errs);
                                if (errs.length === 0) {
                                  await updateEvent(ev.id, editingEvent as any);
                                  setEditingId(null);
                                  await refresh();
                                  showToast('success', 'Event updated successfully');
                                }
                              }}><Save className="h-4 w-4" /> Save</button>
                              <button className="px-4 py-2 rounded border" onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">Page {page} {totalPages ? `of ${totalPages}` : ''}</div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 border rounded disabled:opacity-50" disabled={(page || 1) <= 1} onClick={() => setPagination({ page: (page || 1) - 1, pageSize: pageSize || 10 })}>Previous</button>
                  <button className="px-3 py-1 border rounded disabled:opacity-50" disabled={totalPages ? (page || 1) >= totalPages : false} onClick={() => setPagination({ page: (page || 1) + 1, pageSize: pageSize || 10 })}>Next</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admins' && (
          <div className="p-6 space-y-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold mb-3">Create Admin</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className="border rounded px-3 py-2" placeholder="Username" value={newAdmin.username} onChange={e => setNewAdmin({ ...newAdmin, username: e.target.value })} />
                <input className="border rounded px-3 py-2" type="password" placeholder="Password" value={newAdmin.password} onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })} />
              </div>
              <div className="mt-3">
                <button className="bg-primary text-black px-4 py-2 rounded font-semibold" onClick={async () => {
                  const res = await fetch('/api/admins', { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify(newAdmin) });
                  if (res.ok) { setNewAdmin({ username: '', password: '' }); await loadAdmins(); showToast('success', 'Admin created successfully'); }
                }}>Create</button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Admins</h3>
                <button className="text-sm text-gray-600" onClick={loadAdmins} disabled={loadingAdmins}>{loadingAdmins ? 'Refreshing...' : 'Refresh'}</button>
              </div>
              {adminError && <div className="text-red-600 text-sm mb-2">{adminError}</div>}
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="p-2">ID</th>
                      <th className="p-2">Username</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map(a => (
                      <tr key={a.id} className="border-t">
                        <td className="p-2">{a.id}</td>
                        <td className="p-2">{a.username}{currentUser === a.username ? ' (you)' : ''}</td>
                        <td className="p-2">
                          <button className="px-2 py-1 border rounded text-red-600 flex items-center gap-1 disabled:opacity-50" disabled={currentUser === a.username} onClick={async () => {
                            if (confirm('Delete this admin?')) {
                              const res = await fetch(`/api/admins/${a.id}`, { method: 'DELETE', headers: { ...authHeader() } });
                              if (res.ok) await loadAdmins(); showToast('success', 'Admin deleted successfully');
                            }
                          }}><Trash2 className="h-4 w-4" /> Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'crew' && (
          <div className="p-6 space-y-6">
            <CrewAdminSection showToast={showToast} />
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="p-6 space-y-6">
            <ArticlesAdminSection showToast={showToast} />
          </div>
        )}
    </div>
  );

  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
        {PanelChrome}
        {isCreateOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Add Event</h3>
                <button onClick={() => setIsCreateOpen(false)} className="text-gray-500 hover:text-gray-700"><X className="h-6 w-6" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className="border rounded px-3 py-2" placeholder="Title" value={creatingEvent.title} onChange={e => setCreatingEvent({ ...creatingEvent, title: e.target.value })} />
                <input className="border rounded px-3 py-2" type="date" placeholder="Date" value={creatingEvent.date} onChange={e => setCreatingEvent({ ...creatingEvent, date: e.target.value })} />
                <input className="border rounded px-3 py-2" type="time" placeholder="Time" value={creatingEvent.time} onChange={e => setCreatingEvent({ ...creatingEvent, time: e.target.value })} />
                <input className="border rounded px-3 py-2" placeholder="Location" value={creatingEvent.location} onChange={e => setCreatingEvent({ ...creatingEvent, location: e.target.value })} />
                <div className="flex items-center gap-2">
                  <input className="border rounded px-2 py-1 w-20" type="number" min="0" placeholder="e.g. 5" onChange={e => {
                    const v = e.target.value;
                    const right = creatingEvent.distance.includes('-') ? creatingEvent.distance.split('-')[1] : '';
                    setCreatingEvent({ ...creatingEvent, distance: v ? `${v}K${right ? '-' + right : ''}` : '' });
                  }} />
                  <span className="text-sm text-gray-600">K -</span>
                  <input className="border rounded px-2 py-1 w-20" type="number" min="0" placeholder="e.g. 10" onChange={e => {
                    const v = e.target.value;
                    const left = creatingEvent.distance.includes('-') ? creatingEvent.distance.split('-')[0] : creatingEvent.distance;
                    setCreatingEvent({ ...creatingEvent, distance: v ? `${left}-${v}K` : left });
                  }} />
                </div>
                <select className="border rounded px-3 py-2" value={creatingEvent.difficulty} onChange={e => setCreatingEvent({ ...creatingEvent, difficulty: e.target.value })}>
                  <option>Beginner Friendly</option>
                  <option>Intermediate</option>
                  <option>Hard</option>
                </select>
                <input className="border rounded px-3 py-2" placeholder="Coffee Stop" value={creatingEvent.coffeeStop} onChange={e => setCreatingEvent({ ...creatingEvent, coffeeStop: e.target.value })} />
                <textarea className="md:col-span-2 border rounded px-3 py-2" placeholder="Description" value={creatingEvent.description} onChange={e => setCreatingEvent({ ...creatingEvent, description: e.target.value })} />
                {/* Image upload small */}
                <label className="px-2 py-1 border rounded w-fit text-sm flex items-center gap-2 cursor-pointer">
                  <ImageIcon className="h-4 w-4" /> {eventImageSelected ? 'Image selected' : 'Upload image'}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    setCreatingEventFile(f);
                    setEventImageSelected(true);
                  }} />
                </label>
              </div>
              {createErrors.length > 0 && (
                <ul className="text-red-600 text-sm my-3 list-disc list-inside">
                  {createErrors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              )}
              <div className="mt-4 flex justify-end gap-2">
                <button className="px-4 py-2 border rounded" onClick={() => setIsCreateOpen(false)}>Cancel</button>
                <button className="bg-primary text-black px-4 py-2 rounded font-semibold" onClick={async () => {
                  const errs = validateEventData(creatingEvent);
                  setCreateErrors(errs);
                  if (errs.length === 0) {
                    const newId = await createEvent(creatingEvent as any);
                    if (creatingEventFile) {
                      try {
                        await uploadEventImage(newId, creatingEventFile);
                      } catch (err) {
                        showToast('error', 'Image upload failed');
                      }
                      setCreatingEventFile(null);
                    }
                    await refresh();
                    setCreatingEvent(emptyEvent);
                    setEventImageSelected(false);
                    setIsCreateOpen(false);
                    showToast('success', 'Event created successfully');
                  }
                }}>Create Event</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full py-6 px-0">
      {PanelChrome}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Add Event</h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-gray-500 hover:text-gray-700"><X className="h-6 w-6" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="border rounded px-3 py-2" placeholder="Title" value={creatingEvent.title} onChange={e => setCreatingEvent({ ...creatingEvent, title: e.target.value })} />
              <input className="border rounded px-3 py-2" type="date" placeholder="Date" value={creatingEvent.date} onChange={e => setCreatingEvent({ ...creatingEvent, date: e.target.value })} />
              <input className="border rounded px-3 py-2" type="time" placeholder="Time" value={creatingEvent.time} onChange={e => setCreatingEvent({ ...creatingEvent, time: e.target.value })} />
              <input className="border rounded px-3 py-2" placeholder="Location" value={creatingEvent.location} onChange={e => setCreatingEvent({ ...creatingEvent, location: e.target.value })} />
              <input className="border rounded px-3 py-2" placeholder="Distance (e.g. 5K or 5K-10K)" value={creatingEvent.distance} onChange={e => setCreatingEvent({ ...creatingEvent, distance: e.target.value })} />
              <select className="border rounded px-3 py-2" value={creatingEvent.difficulty} onChange={e => setCreatingEvent({ ...creatingEvent, difficulty: e.target.value })}>
                <option>Beginner Friendly</option>
                <option>Intermediate</option>
                <option>Hard</option>
              </select>
              <label className="border rounded px-3 py-2 flex items-center gap-2 cursor-pointer">
                <ImageIcon className="h-4 w-4" /> {eventImageSelected ? 'Image selected' : 'Upload image'}
                <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  (document as any).lastUploadFile = f;
                  setEventImageSelected(true);
                }} />
              </label>
              <input className="border rounded px-3 py-2" placeholder="Coffee Stop" value={creatingEvent.coffeeStop} onChange={e => setCreatingEvent({ ...creatingEvent, coffeeStop: e.target.value })} />
              <textarea className="md:col-span-2 border rounded px-3 py-2" placeholder="Description" value={creatingEvent.description} onChange={e => setCreatingEvent({ ...creatingEvent, description: e.target.value })} />
            </div>
            {createErrors.length > 0 && (
              <ul className="text-red-600 text-sm my-3 list-disc list-inside">
                {createErrors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-4 py-2 border rounded" onClick={() => setIsCreateOpen(false)}>Cancel</button>
              <button className="bg-primary text-black px-4 py-2 rounded font-semibold" onClick={async () => {
                const errs = validateEventData(creatingEvent);
                setCreateErrors(errs);
                if (errs.length === 0) {
                  // Create event first
                  await createEvent(creatingEvent as any);
                  await refresh();
                  // Find the newly created event (assume last page or fetch first page to find by title/time)
                  const created = events.find(e => e.title === creatingEvent.title && e.time === creatingEvent.time && e.date === creatingEvent.date);
                  if (created && (document as any).lastUploadFile) {
                    await uploadEventImage(created.id, (document as any).lastUploadFile);
                    (document as any).lastUploadFile = undefined;
                    await refresh();
                  }
                  setCreatingEvent(emptyEvent);
                  setEventImageSelected(false);
                  setIsCreateOpen(false);
                  showToast('success', 'Event created successfully');
                }
              }}>Create Event</button>
            </div>
          </div>
        </div>
      )}
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 pointer-events-none px-4 py-2 rounded shadow text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

// Crew admin subsection
const CrewAdminSection: React.FC<{ showToast: (t: 'success' | 'error', m: string) => void }> = ({ showToast }) => {
  const { authHeader } = useAuth();
  const [members, setMembers] = useState<Array<{ id: number; firstName: string; lastName: string; age: number | null; profession: string; description: string; image: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', age: '', profession: '', description: '' });
  const [lastCrewUpload, setLastCrewUpload] = useState<File | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ firstName: '', lastName: '', age: '', profession: '', description: '' });
  const [crewImageSelected, setCrewImageSelected] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/crew');
      if (!res.ok) throw new Error('Failed to load crew');
      setMembers(await res.json());
    } catch (e: any) {
      setError(e?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const createMember = async () => {
    const body = {
      firstName: form.firstName,
      lastName: form.lastName,
      age: form.age ? Number(form.age) : undefined,
      profession: form.profession,
      description: form.description,
    };
    const res = await fetch('/api/crew', { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error('Create failed');
    const data = await res.json();
    return data.id as number;
  };

  const updateMember = async (id: number) => {
    const body = {
      firstName: editForm.firstName,
      lastName: editForm.lastName,
      age: editForm.age ? Number(editForm.age) : undefined,
      profession: editForm.profession,
      description: editForm.description,
    };
    const res = await fetch(`/api/crew/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error('Update failed');
  };

  const deleteMember = async (id: number) => {
    const res = await fetch(`/api/crew/${id}`, { method: 'DELETE', headers: { ...authHeader() } });
    if (!res.ok && res.status !== 204) throw new Error('Delete failed');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Crew</h3>
        <button className="bg-primary text-black px-4 py-2 rounded font-semibold" onClick={() => setCreateOpen(true)}>Add Member</button>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="p-2">Name</th>
              <th className="p-2">Age</th>
              <th className="p-2">Profession</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
              <React.Fragment key={m.id}>
                <tr className="border-t">
                  <td className="p-2 font-medium">{m.firstName} {m.lastName}</td>
                  <td className="p-2">{m.age ?? '-'}</td>
                  <td className="p-2">{m.profession}</td>
                  <td className="p-2 flex gap-2">
                    <button className="px-2 py-1 border rounded" onClick={() => { setEditId(m.id); setEditForm({ firstName: m.firstName, lastName: m.lastName, age: m.age?.toString() || '', profession: m.profession, description: m.description }); }}>Edit</button>
                    <label className="px-2 py-1 border rounded flex items-center gap-1 cursor-pointer">
                      <ImageIcon className="h-4 w-4" /> Change Image
                      <input type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) { try { const fd = new FormData(); fd.append('image', f); const r = await fetch(`/api/crew/${m.id}/image`, { method: 'POST', headers: { ...authHeader() }, body: fd }); if (!r.ok) throw new Error(); showToast('success','Image updated'); await load(); } catch { showToast('error','Image update failed'); } e.currentTarget.value=''; } }} />
                    </label>
                    <button className="px-2 py-1 border rounded text-red-600" onClick={async () => { if (confirm('Delete member?')) { try { await deleteMember(m.id); showToast('success','Member deleted'); await load(); } catch { showToast('error','Delete failed'); } } }}>Delete</button>
                  </td>
                </tr>
                {editId === m.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="p-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input className="border rounded px-3 py-2" placeholder="First name" value={editForm.firstName} onChange={e => setEditForm({ ...editForm, firstName: e.target.value })} />
                        <input className="border rounded px-3 py-2" placeholder="Last name" value={editForm.lastName} onChange={e => setEditForm({ ...editForm, lastName: e.target.value })} />
                        <input className="border rounded px-3 py-2" type="number" placeholder="Age" value={editForm.age} onChange={e => setEditForm({ ...editForm, age: e.target.value })} />
                        <input className="border rounded px-3 py-2" placeholder="Profession" value={editForm.profession} onChange={e => setEditForm({ ...editForm, profession: e.target.value })} />
                        <textarea className="md:col-span-2 border rounded px-3 py-2" placeholder="Description" value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button className="bg-primary text-black px-4 py-2 rounded font-semibold" onClick={async () => { try { await updateMember(m.id); setEditId(null); showToast('success','Member updated'); await load(); } catch { showToast('error','Update failed'); } }}>Save</button>
                        <button className="px-4 py-2 rounded border" onClick={() => setEditId(null)}>Cancel</button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {createOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Add Crew Member</h3>
              <button onClick={() => setCreateOpen(false)} className="text-gray-500 hover:text-gray-700"><X className="h-6 w-6" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="border rounded px-3 py-2" placeholder="First name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
              <input className="border rounded px-3 py-2" placeholder="Last name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
              <input className="border rounded px-3 py-2" type="number" placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
              <input className="border rounded px-3 py-2" placeholder="Profession" value={form.profession} onChange={e => setForm({ ...form, profession: e.target.value })} />
              <textarea className="md:col-span-2 border rounded px-3 py-2" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <label className="border rounded px-3 py-2 flex items-center gap-2 cursor-pointer">
                <ImageIcon className="h-4 w-4" /> {crewImageSelected ? 'Image selected' : 'Upload image'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setLastCrewUpload(f); setCrewImageSelected(true); } }} />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-4 py-2 border rounded" onClick={() => setCreateOpen(false)}>Cancel</button>
              <button className="bg-primary text-black px-4 py-2 rounded font-semibold" onClick={async () => {
                try {
                  const createdId = await createMember();
                  if (lastCrewUpload) {
                    const fd = new FormData(); fd.append('image', lastCrewUpload);
                    const r = await fetch(`/api/crew/${createdId}/image`, { method: 'POST', headers: { ...authHeader() }, body: fd });
                    if (!r.ok) throw new Error();
                    setLastCrewUpload(null);
                    await load();
                  } else {
                    await load();
                  }
                  setForm({ firstName: '', lastName: '', age: '', profession: '', description: '' });
                  setCrewImageSelected(false);
                  setCreateOpen(false);
                  showToast('success','Crew member created');
                } catch {
                  showToast('error','Create failed');
                }
              }}>Create Member</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ArticlesAdminSection: React.FC<{ showToast: (t: 'success' | 'error', m: string) => void }> = ({ showToast }) => {
  const { authHeader } = useAuth();
  const [items, setItems] = useState<Array<{ id: number; name: string; url: string; image: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ name: '', url: '' });
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', url: '' });
  const [articlePreviewUrl, setArticlePreviewUrl] = useState<string | null>(null);
  const [articleImageSelected, setArticleImageSelected] = useState(false);

  const load = async () => {
    try {
      setError(null);
      const res = await fetch('/api/articles');
      if (!res.ok) throw new Error('Failed to load articles');
      setItems(await res.json());
    } catch (e: any) {
      setError(e?.message || 'Unknown error');
    }
  };
  useEffect(() => { load(); }, []);

  const createItem = async () => {
    const res = await fetch('/api/articles', { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify({ name: form.name, url: form.url, image: articlePreviewUrl || undefined }) });
    if (!res.ok) throw new Error('Create failed');
    const { id } = await res.json();
    const f = (document as any).lastArticleUpload as File | undefined;
    if (f) {
      const fd = new FormData(); fd.append('image', f);
      const r = await fetch(`/api/articles/${id}/image`, { method: 'POST', headers: { ...authHeader() }, body: fd });
      if (!r.ok) throw new Error('Upload failed');
      (document as any).lastArticleUpload = undefined;
    }
  };

  const updateItem = async (id: number) => {
    const res = await fetch(`/api/articles/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify({ name: editForm.name, url: editForm.url }) });
    if (!res.ok) throw new Error('Update failed');
  };
  const deleteItem = async (id: number) => {
    const res = await fetch(`/api/articles/${id}`, { method: 'DELETE', headers: { ...authHeader() } });
    if (!res.ok && res.status !== 204) throw new Error('Delete failed');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Articles</h3>
        <button className="bg-primary text-black px-4 py-2 rounded font-semibold" onClick={() => setCreateOpen(true)}>Add Article</button>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="p-2">Name</th>
              <th className="p-2">URL</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(a => (
              <React.Fragment key={a.id}>
                <tr className="border-t">
                  <td className="p-2 font-medium">{a.name}</td>
                  <td className="p-2 text-blue-600 underline"><a href={a.url} target="_blank" rel="noreferrer">{a.url}</a></td>
                  <td className="p-2 flex gap-2">
                    <button className="px-2 py-1 border rounded" onClick={() => { setEditId(a.id); setEditForm({ name: a.name, url: a.url }); }}>Edit</button>
                    <label className="px-2 py-1 border rounded flex items-center gap-1 cursor-pointer">
                      <ImageIcon className="h-4 w-4" /> Change Image
                      <input type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) { try { const fd = new FormData(); fd.append('image', f); const r = await fetch(`/api/articles/${a.id}/image`, { method: 'POST', headers: { ...authHeader() }, body: fd }); if (!r.ok) throw new Error(); showToast('success','Image updated'); await load(); } catch { showToast('error','Image update failed'); } e.currentTarget.value=''; } }} />
                    </label>
                    <button className="px-2 py-1 border rounded text-red-600" onClick={async () => { if (confirm('Delete article?')) { try { await deleteItem(a.id); showToast('success','Article deleted'); await load(); } catch { showToast('error','Delete failed'); } } }}>Delete</button>
                  </td>
                </tr>
                {editId === a.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="p-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input className="border rounded px-3 py-2" placeholder="Name" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                        <input className="border rounded px-3 py-2" placeholder="URL" value={editForm.url} onChange={e => setEditForm({ ...editForm, url: e.target.value })} />
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button className="bg-primary text-black px-4 py-2 rounded font-semibold" onClick={async () => { try { await updateItem(a.id); setEditId(null); showToast('success','Article updated'); await load(); } catch { showToast('error','Update failed'); } }}>Save</button>
                        <button className="px-4 py-2 rounded border" onClick={() => setEditId(null)}>Cancel</button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {createOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Add Article</h3>
              <button onClick={() => setCreateOpen(false)} className="text-gray-500 hover:text-gray-700"><X className="h-6 w-6" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input className="border rounded px-3 py-2" placeholder="URL" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
              <button className="border rounded px-3 py-2 text-left" onClick={async () => {
                try {
                  const r = await fetch('/api/articles/preview', { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify({ url: form.url }) });
                  if (!r.ok) throw new Error();
                  const data = await r.json();
                  setForm({ name: data.name || form.name, url: form.url });
                  setArticlePreviewUrl(data.image || null);
                  setArticleImageSelected(!!data.image);
                  showToast('success','Preview fetched');
                } catch {
                  showToast('error','Preview failed');
                }
              }}>Fetch preview</button>
              {/* Image rectangle */}
              <label className="border rounded flex items-center justify-center h-32 bg-gray-50 cursor-pointer">
                {articlePreviewUrl || (document as any).lastArticleUpload ? (
                  <img src={articlePreviewUrl || URL.createObjectURL((document as any).lastArticleUpload)} alt="Preview" className="w-full h-full object-cover rounded" />
                ) : (
                  <span className="text-sm text-gray-500">{articleImageSelected ? 'Image selected' : 'Click to upload image'}</span>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { (document as any).lastArticleUpload = f; setArticlePreviewUrl(URL.createObjectURL(f)); setArticleImageSelected(true); } }} />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-4 py-2 border rounded" onClick={() => setCreateOpen(false)}>Cancel</button>
              <button className="bg-primary text-black px-4 py-2 rounded font-semibold" onClick={async () => {
                try {
                  await createItem();
                  await load();
                  setForm({ name: '', url: '' });
                  setArticlePreviewUrl(null);
                  setArticleImageSelected(false);
                  (document as any).lastArticleUpload = undefined;
                  setCreateOpen(false);
                  showToast('success','Article created');
                } catch {
                  showToast('error','Create failed');
                }
              }}>Create Article</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};