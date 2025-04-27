import axios from 'axios';

const API = 'http://localhost:7000';

export const getUsers = () => axios.get(`${API}/users`);

export const registerUser = (userData) => axios.post(`${API}/register`, userData);