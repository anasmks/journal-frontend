import api from '../api/axios';

const authService = {
  login: async (userName, password) => {
    const response = await api.post('/public/login', { userName, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/public/create-user', userData);
    return response.data;
  },
};

export default authService;
