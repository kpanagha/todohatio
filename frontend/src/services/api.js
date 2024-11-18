import axios from 'axios';

// Use the base URL from environment variables or fallback to 'http://localhost:5000'
const API_BASE_URL = 'http://localhost:5000'; 

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Set default Content-Type
  },
});

// Middleware for attaching token to requests
api.interceptors.request.use(
  (config) => {
    // Assuming token is stored in localStorage (update if needed)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
