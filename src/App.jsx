import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserList from './UserList';
import RegistrationForm from './RegistrationForm'; // import your registration form
import LoginForm from './LoginForm';
import { getUsers } from './api';
import './App.css';  

function UserListingPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {     
    const res = await getUsers();
    console.log(res.data); // Check if it's res.data.data or res.data.users
    setUsers(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="center-div">
      <h1>Users Listing App</h1>
      console.log(users);
      <Link to="/register" style={{ color: '#00f', textDecoration: 'underline' }}>
        Register New User
      </Link>
      <Link to="/login" style={{ color: '#00f', textDecoration: 'underline' }}>
        Login Existing User
      </Link>
      <UserList users={users} />
    </div>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<UserListingPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
