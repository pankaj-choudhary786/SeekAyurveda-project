import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, 
});

export const loginUser = (userData) => API.post('/auth/login', userData);
export const registerUser = (userData) => API.post('/auth/register', userData);
export const sendContactMessage = (messageData) => API.post('/contact', messageData);

export default API;