import { useState } from "react";
import axios from "axios";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "", // Added role field
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:7000/users/register", formData);
      console.log(res.data);
      alert("Registration successful!");
    } catch (error) {
      console.error(error);
      alert("Registration failed!");
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#000", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
        
      <form 
        onSubmit={handleSubmit}
        style={{ 
          backgroundColor: "#111", 
          padding: "2rem",  // Reduced padding for better alignment
          borderRadius: "10px", 
          display: "flex", 
          flexDirection: "column", 
          gap: "2rem", 
          width: "500px" 
        }}
      >
        <h2 style={{ color: "#fff", textAlign: "center" }}>Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{
            padding: "0.75rem",
            border: "1px solid #333",
            borderRadius: "5px",
            backgroundColor: "#222",
            color: "#fff",
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            padding: "0.75rem",
            border: "1px solid #333",
            borderRadius: "5px",
            backgroundColor: "#222",
            color: "#fff",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            padding: "0.75rem",
            border: "1px solid #333",
            borderRadius: "5px",
            backgroundColor: "#222",
            color: "#fff",
          }}
        />

        {/* Role Input Field */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          style={{
            padding: "0.75rem",
            border: "1px solid #333",
            borderRadius: "5px",
            backgroundColor: "#222",
            color: "#fff",
          }}
        >
          <option value="">Select Role</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
          {/* Add other roles here if needed */}
        </select>

        <button
          type="submit"
          style={{
            padding: "0.75rem",
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
