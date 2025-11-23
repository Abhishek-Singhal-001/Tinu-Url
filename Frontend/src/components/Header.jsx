// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">TinyLink</h1>
          <div className="text-sm text-gray-500">URL Shortener</div>
        </div>
      </div>
    </header>
  );
};

export default Header;