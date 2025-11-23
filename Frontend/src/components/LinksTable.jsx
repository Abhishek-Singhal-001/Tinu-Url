// src/components/LinksTable.jsx
import React, { useState } from 'react';
import { Copy, ExternalLink, Trash2, BarChart3, Search } from 'lucide-react';
import { API_URL } from '../utils/api';
import { formatDate } from '../utils/dateFormatter';

const LinksTable = ({ links, onDelete, onViewStats, onCopy, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLinks = links.filter(link => 
    link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.targetUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRedirect = (code) => {
    window.open(`${API_URL}/${code}`, '_blank');
    setTimeout(onRefresh, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by code or URL..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {filteredLinks.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'No links found' : 'No links yet. Create your first one!'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Clicked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLinks.map((link) => (
                <tr key={link.code} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        {link.code}
                      </code>
                      <button
                        onClick={() => onCopy(`${API_URL}/${link.code}`)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Copy link"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 max-w-md">
                      <span className="text-sm text-gray-900 truncate">
                        {link.targetUrl}
                      </span>
                      <button
                        onClick={() => handleRedirect(link.code)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Open link"
                      >
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{link.clicks}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className="text-sm text-gray-500" 
                      title={link.lastClicked ? new Date(link.lastClicked).toLocaleString() : 'Never'}
                    >
                      {formatDate(link.lastClicked)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewStats(link.code)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View stats"
                      >
                        <BarChart3 size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(link.code)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LinksTable;