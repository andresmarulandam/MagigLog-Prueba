import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_URL;
//const API = 'http://localhost:10000';

export const registerRequest = (user) => axios.post(`${API}/register`, user);

export const loginRequest = (user) => axios.post(`${API}/login`, user);
