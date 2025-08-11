import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { DataProvider } from './contexts/DataContext';
import HomePage from './pages/HomePage';
import CrewPage from './pages/CrewPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';

function App() {
  return (
    <DataProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/crew" element={<CrewPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </DataProvider>
  );
}

export default App;