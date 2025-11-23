// src/components/Dashboard.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AddLinkForm from './AddLinkForm';
import LinksTable from './LinksTable';

const Dashboard = ({ links, onDelete, onViewStats, onCopy, onRefresh, onNotification }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleFormClose = () => {
    setShowAddForm(false);
  };

  const handleFormSuccess = (message, type) => {
    onNotification(message, type);
    if (type === 'success') {
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Add Link
        </button>
      </div>

      {showAddForm && (
        <AddLinkForm 
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      <LinksTable
        links={links}
        onDelete={onDelete}
        onViewStats={onViewStats}
        onCopy={onCopy}
        onRefresh={onRefresh}
      />
    </div>
  );
};

export default Dashboard;