import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import HomePage from './pages/HomePage';
import CrewPage from './pages/CrewPage';
import EventsPage from './pages/EventsPage';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/crew" element={<CrewPage />} />
            <Route path="/events" element={<EventsPage />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;