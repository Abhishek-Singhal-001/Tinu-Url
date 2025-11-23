// src/components/StatsView.jsx
import React from 'react';
import { Copy } from 'lucide-react';
import { API_URL } from '../utils/api';
import { formatFullDate, formatDateOnly } from '../utils/dateFormatter';

const StatsView = ({ link, onBack, onCopy }) => {
  if (!link) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Link not found</p>
        <button
          onClick={onBack}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-blue-600 hover:text-blue-800 mb-4"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-6">Link Statistics</h1>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Short Code</label>
            <div className="flex items-center gap-2 mt-1">
              <code className="text-lg font-mono bg-gray-100 px-3 py-2 rounded">
                {link.code}
              </code>
              <button
                onClick={() => onCopy(`${API_URL}/${link.code}`)}
                className="text-gray-400 hover:text-gray-600"
                title="Copy short URL"
              >
                <Copy size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {API_URL}/{link.code}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Target URL</label>
            <div className="flex items-center gap-2 mt-1">
              <a
                href={link.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 break-all"
              >
                {link.targetUrl}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-sm font-medium text-gray-500">Total Clicks</div>
              <div className="text-3xl font-bold text-blue-600 mt-2">{link.clicks}</div>
              <div className="text-xs text-gray-500 mt-1">
                {link.clicks === 0 ? 'No clicks yet' : `${link.clicks} time${link.clicks === 1 ? '' : 's'}`}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="text-sm font-medium text-gray-500">Created</div>
              <div className="text-lg font-semibold text-green-600 mt-2">
                {formatDateOnly(link.createdAt)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {formatFullDate(link.createdAt)}
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="text-sm font-medium text-gray-500">Last Clicked</div>
              <div className="text-lg font-semibold text-purple-600 mt-2">
                {link.lastClicked ? formatDateOnly(link.lastClicked) : 'Never'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {link.lastClicked ? formatFullDate(link.lastClicked) : 'No clicks yet'}
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Timeline</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Link created:</span>
                <span className="font-medium text-gray-900">
                  {formatFullDate(link.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last activity:</span>
                <span className="font-medium text-gray-900">
                  {link.lastClicked ? formatFullDate(link.lastClicked) : 'No activity yet'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${link.clicks > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                  {link.clicks > 0 ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsView;