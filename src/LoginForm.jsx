import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "", // Added role to the state
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:7000/users/login", formData);
            console.log(res.data);
            alert("Login successful!");

            // Save token and role to localStorage
            localStorage.setItem('userId', res.data.user.id);
            localStorage.setItem('username', res.data.user.username);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('role', res.data.user.role);

            // Navigate based on role
            if (res.data.user.role === 'admin') {
                navigate("/TestDashboard");
            } else {
                navigate("/TestDashboard");
            }
        } catch (error) {
            console.error(error);
            alert("Login failed!");
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
                    padding: "12rem", 
                    borderRadius: "10px", 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: "2rem", 
                    width: "500px" 
                }}
            >
                <h2 style={{ color: "#fff", textAlign: "center" }}>Login</h2>

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
                    <option value="admin">admin</option>
                    <option value="user">user</option>
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

export default LoginForm;
