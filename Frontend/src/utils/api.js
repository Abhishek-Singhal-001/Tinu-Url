// src/utils/api.js
const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  // Get all links
  getLinks: async () => {
    const response = await fetch(`${API_URL}/api/links`);
    if (!response.ok) throw new Error('Failed to fetch links');
    return response.json();
  },

  // Create a new link
  createLink: async (targetUrl, customCode) => {
    const response = await fetch(`${API_URL}/api/links`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetUrl,
        customCode: customCode || undefined
      })
    });
    const data = await response.json();
    return { status: response.status, data };
  },

  // Delete a link
  deleteLink: async (code) => {
    const response = await fetch(`${API_URL}/api/links/${code}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete link');
    return response.json();
  },

  // Get redirect URL
  getRedirectUrl: (code) => {
    return `${API_URL}/${code}`;
  }
};

export const validators = {
  validateUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  validateCode: (code) => {
    return /^[A-Za-z0-9]{6,8}$/.test(code);
  }
};

export { API_URL };