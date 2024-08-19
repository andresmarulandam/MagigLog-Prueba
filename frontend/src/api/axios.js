import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: API,
  withCredentials: true,
});

export default instance;
