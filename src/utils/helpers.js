export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getSentimentColor = (sentiment) => {
  const colors = {
    HAPPY: '#10b981',
    SAD: '#6b7280',
    ANGRY: '#ef4444',
    EXCITED: '#f59e0b',
    NEUTRAL: '#6c63ff',
    ANXIOUS: '#8b5cf6',
    GRATEFUL: '#ec4899',
    HOPEFUL: '#06b6d4',
  };
  return colors[sentiment?.toUpperCase()] || '#6c63ff';
};
