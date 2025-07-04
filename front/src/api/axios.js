import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(config => {
  const auth = localStorage.getItem('auth');
  if (auth) config.headers.Authorization = auth;
  return config;
});

export default api;
