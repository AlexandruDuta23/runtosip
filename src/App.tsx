import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// ScrollToTop component: scrolls window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    // If navigation requested a specific scroll target (e.g. location.state.scrollTo),
    // don't force a top scroll here — let the page's own logic handle it.
    try {
      const st = (window.history.state && (window.history.state as any).state) || (window.history.state as any);
      if (st && st.scrollTo) return;
    } catch {}
    // Small delay to allow in-page anchor navigation to settle if any
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}
import { LanguageProvider } from './contexts/LanguageContext';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import CrewPage from './pages/CrewPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <LanguageProvider>
          <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/crew" element={<CrewPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </div>
          </Router>
        </LanguageProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;