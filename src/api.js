import axios from 'axios';

const API = 'http://localhost:7000';
const TASK_API = 'http://localhost:8080/tasks';

export const getUsers = () => axios.get(`${API}/users`);

export const registerUser = (userData) => axios.post(`${API}/register`, userData);

export const getTasks = () => axios.get(`${TASK_API}/getall`);
export const createTask = (task) => axios.post(`${TASK_API}/create`, task);
export const updateTask = (id, task) => axios.put(`${TASK_API}/update/${id}`, task);
export const deleteTask = (id) => axios.delete(`${TASK_API}/delete/${id}`);