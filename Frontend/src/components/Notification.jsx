// src/components/Notification.jsx
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Notification = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
      type === 'success' 
        ? 'bg-green-50 text-green-800' 
        : 'bg-red-50 text-red-800'
    }`}>
      {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      {message}
    </div>
  );
};

export default Notification;