import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getTasks, createTask, updateTask, deleteTask } from './api';

function TaskForm({ onSave, editingTask }) {
  const [task, setTask] = useState({ title: '', description: '' });

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    } else {
      setTask({ title: '', description: '' });
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      onSave(editingTask.id, task);
    } else {
      onSave(task);
    }
    setTask({ title: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        className="border p-2 mr-2"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Title"
        required
      />
      <input
        className="border p-2 mr-2"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        placeholder="Description"
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        {editingTask ? 'Update' : 'Add'}
      </button>
    </form>
  );
}

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="border p-2 mb-2 rounded flex justify-between">
          <div>
            <h2 className="font-bold">{task.title}</h2>
            <p>{task.description}</p>
          </div>
          <div>
            <button onClick={() => onEdit(task)} className="text-blue-600 mr-2">Edit</button>
            <button onClick={() => onDelete(task.id)} className="text-red-600">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function TestDashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (task) => {
    try {
      await createTask(task);
      fetchTasks();
    } catch (err) {
      console.error("Task creation failed", err);
    }
  };

  const handleUpdate = async (id, task) => {
    try {
      await updateTask(id, task);
      fetchTasks();
      setEditingTask(null);
    } catch (err) {
      console.error("Task update failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error("Task deletion failed", err);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      await fetch("http://localhost:7000/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');

      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4 font-bold">Task Manager</h1>
      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#fff",
          color: "#000",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
      <TaskForm
        onSave={editingTask ? handleUpdate : handleCreate}
        editingTask={editingTask}
      />
      <TaskList
        tasks={tasks}
        onEdit={setEditingTask}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default TestDashboard;
