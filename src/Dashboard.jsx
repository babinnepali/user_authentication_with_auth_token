import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

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

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');

      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#000", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1>Welcome to Dashboard</h1>
      <p>You are logged in!</p>
      <button 
        onClick={handleLogout}
        style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#fff", color: "#000", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
