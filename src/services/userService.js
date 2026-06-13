import api from '../api/axios';

const userService = {
  getProfile: async () => {
    const response = await api.get('/user');
    return response.data;
  },

  getWeather: async () => {
    const response = await api.get('/user/weather');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/user', userData);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await api.delete('/user');
    return response.data;
  },
};

export default userService;
