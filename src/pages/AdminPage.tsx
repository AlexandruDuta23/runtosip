import React from 'react';
import AdminPanel from '../components/AdminPanel';

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Run To Sip — Admin</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Render AdminPanel in page variant for full-page experience */}
        <AdminPanel variant="page" />
      </main>
    </div>
  );
};

export default AdminPage;
