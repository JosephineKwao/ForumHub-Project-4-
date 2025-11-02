import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ccc" }}>
      <h2>PetLand</h2>
      <div>
        <span>{user?.username}</span>
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
      </div>
    </nav>
  );
}
