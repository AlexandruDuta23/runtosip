import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';
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

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Use shared data context
  const { events, loading: dataLoading } = useData();

  const handleLogin = () => {
    if (password === 'kawasaki1822') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Access</h2>
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleLogin}
                className="flex-1 bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200"
              >
                Login
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🔧</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Admin Panel Coming Soon!
            </h3>
            <p className="text-gray-600 mb-6">
              The admin panel functionality will be available when backend services are restored.
            </p>
            <div className="bg-gray-100 rounded-lg p-4 text-left">
              <h4 className="font-semibold mb-2">Current Status:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Events: {events.length} events loaded</li>
                <li>❌ Articles: Not available</li>
                <li>❌ Crew Members: Not available</li>
                <li>❌ Gallery: Not available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;