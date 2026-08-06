import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://journal-backend-live.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle 401 unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const WAKE_UP_MESSAGE = 'The server is waking up. This may take a minute or two. Please try again.';

export const getApiErrorMessage = (error, fallback) => {
  const status = error?.response?.status;
  const data = error?.response?.data;

  if (status === 502 || status === 503 || status === 504) {
    return WAKE_UP_MESSAGE;
  }

  if (data) {
    if (typeof data === 'string' && !data.startsWith('<')) return data;
    if (typeof data === 'object' && data.message) return data.message;
  }

  if (error?.code === 'ECONNABORTED' || error?.code === 'ERR_NETWORK') {
    return WAKE_UP_MESSAGE;
  }

  return fallback;
};

export default api;
