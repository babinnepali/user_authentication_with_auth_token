import axios from 'axios';

const API = 'http://localhost:7000';
const TASK_API = 'http://localhost:8000/tasks';

// Get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Auth endpoints
export const getUsers = () => axios.get(`${API}/users`, getAuthHeaders());
export const registerUser = (userData) => axios.post(`${API}/register`, userData);

// Task endpoints
export const getTasks = () => axios.get(`${TASK_API}/getall`, getAuthHeaders());
export const createTask = (task) => axios.post(`${TASK_API}/create`, task, getAuthHeaders());
export const updateTask = (id, task) => axios.put(`${TASK_API}/update/${id}`, task, getAuthHeaders());
export const deleteTask = (id) => axios.delete(`${TASK_API}/delete/${id}`, getAuthHeaders());
