import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// ✅ Attach JWT token to all requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // your stored JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
