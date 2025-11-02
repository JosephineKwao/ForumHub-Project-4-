import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <h2>PetLand</h2>
      <div>
        <span>{user?.username}</span>
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    borderBottom: "1px solid #ccc",
    backgroundColor: "#f5f5f5",
    marginBottom: "10px"
  },
  button: {
    marginLeft: "10px",
    padding: "5px 10px",
    cursor: "pointer"
  }
};
