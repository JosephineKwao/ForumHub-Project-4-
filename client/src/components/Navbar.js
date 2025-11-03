import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#282c34",
        color: "white",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>Forum App</div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "5px 10px",
            backgroundColor: "#4CAF50",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            color: "white",
          }}
        >
          Dashboard
        </button>

        
        <span>Welcome, {user?.username}</span>

        
        <button
          onClick={handleLogout}
          style={{
            padding: "5px 10px",
            backgroundColor: "#61dafb",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
