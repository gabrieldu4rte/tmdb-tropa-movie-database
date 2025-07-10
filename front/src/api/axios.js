import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tmdb-tropa-movie-database-329w.onrender.com/api/',
});

api.interceptors.request.use(config => {
  const auth = localStorage.getItem('auth');
  if (auth) config.headers.Authorization = auth;
  return config;
});

export default api;
