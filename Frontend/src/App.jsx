// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Notification from './components/Notification';
import Dashboard from './components/Dashboard';
import StatsView from './components/StatsView';
import { api } from './utils/api';

function App() {
  const [view, setView] = useState('dashboard');
  const [links, setLinks] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [notification, setNotification] = useState({ message: null, type: 'success' });
  const [loading, setLoading] = useState(false);

  // UseCallback to prevent recreating function on every render
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: 'success' });
    }, 3000);
  }, []);

  // UseCallback for loadLinks
  const loadLinks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getLinks();
      setLinks(data);
    } catch (error) {
      console.error('Error loading links:', error);
      showNotification('Error connecting to server. Make sure backend is running on port ', 'error');
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    loadLinks();
  }, [loadLinks]);

  const handleDelete = async (code) => {
    if (!window.confirm(`Delete link "${code}"?`)) return;

    try {
      await api.deleteLink(code);
      await loadLinks();
      showNotification('Link deleted successfully');
    } catch (error) {
      console.error('Error deleting link:', error);
      showNotification('Failed to delete link', 'error');
    }
  };

  const handleViewStats = (code) => {
    setSelectedCode(code);
    setView('stats');
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        showNotification('Copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
        showNotification('Failed to copy to clipboard', 'error');
      });
  };

  const selectedLink = links.find(l => l.code === selectedCode);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {notification.message && (
          <Notification 
            message={notification.message} 
            type={notification.type} 
          />
        )}

        {loading && links.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading links...</p>
            </div>
          </div>
        ) : (
          <>
            {view === 'dashboard' && (
              <Dashboard
                links={links}
                onDelete={handleDelete}
                onViewStats={handleViewStats}
                onCopy={handleCopyToClipboard}
                onRefresh={loadLinks}
                onNotification={showNotification}
              />
            )}

            {view === 'stats' && (
              <StatsView
                link={selectedLink}
                onBack={() => setView('dashboard')}
                onCopy={handleCopyToClipboard}
              />
            )}
          </>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          TinyLink - Built with React & Node.js
        </div>
      </footer>
    </div>
  );
}

export default App;