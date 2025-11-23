// src/utils/dateFormatter.js

/**
 * Format date to local time with relative time for recent dates
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return 'Never';
  
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    // Just now (less than 1 minute)
    if (diffMins < 1) {
      return 'Just now';
    }
    
    // Minutes ago (less than 60 minutes)
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    }
    
    // Hours ago (less than 24 hours)
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    }
    
    // Days ago (less than 7 days)
    if (diffDays < 7) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }
    
    // More than a week - show full date
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Format date to full local date and time
 */
export const formatFullDate = (dateStr) => {
  if (!dateStr) return 'Never';
  
  try {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Format date to just date (no time)
 */
export const formatDateOnly = (dateStr) => {
  if (!dateStr) return 'Never';
  
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Format date to short format
 */
export const formatShortDate = (dateStr) => {
  if (!dateStr) return 'Never';
  
  try {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};