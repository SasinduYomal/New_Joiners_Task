import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

export const createPortfolio = (data) => api.post('/portfolios', data);
export const getPortfolio = (username) => api.get(`/portfolios/${username}`);
export const updatePortfolio = (username, data) => api.put(`/portfolios/${username}`, data);
export const deletePortfolio = (username) => api.delete(`/portfolios/${username}`);

export default api;
