import api from '../api/axios';

const journalService = {
  getAll: async () => {
    const response = await api.get('/journal');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/journal/id/${id}`);
    return response.data;
  },

  create: async (journalData) => {
    const response = await api.post('/journal', journalData);
    return response.data;
  },

  update: async (id, journalData) => {
    const response = await api.put(`/journal/id/${id}`, journalData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/journal/id/${id}`);
    return response.data;
  },
};

export default journalService;
