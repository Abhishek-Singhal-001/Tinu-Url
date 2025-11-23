// src/components/AddLinkForm.jsx
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { api, validators } from '../utils/api';

const AddLinkForm = ({ onClose, onSuccess }) => {
  const [targetUrl, setTargetUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const newErrors = {};

    if (!targetUrl) {
      newErrors.targetUrl = 'URL is required';
    } else if (!validators.validateUrl(targetUrl)) {
      newErrors.targetUrl = 'Please enter a valid URL';
    }

    if (customCode && !validators.validateCode(customCode)) {
      newErrors.customCode = 'Code must be 6-8 alphanumeric characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const { status, data } = await api.createLink(targetUrl, customCode);

      if (status === 409) {
        setErrors({ customCode: 'This code is already taken' });
        onSuccess('Code already exists', 'error');
      } else if (status === 201) {
        onSuccess('Link created successfully!', 'success');
        onClose();
      } else {
        onSuccess(data.error || 'Failed to create link', 'error');
      }
    } catch (error) {
      console.error('Error creating link:', error);
      onSuccess('Error connecting to server', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Create New Link</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target URL *
          </label>
          <input
            type="text"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="https://example.com/your-long-url"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.targetUrl && (
            <p className="text-red-600 text-sm mt-1">{errors.targetUrl}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Code (optional)
          </label>
          <input
            type="text"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="mycode (6-8 characters)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Leave empty to generate automatically
          </p>
          {errors.customCode && (
            <p className="text-red-600 text-sm mt-1">{errors.customCode}</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Create Link
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLinkForm;