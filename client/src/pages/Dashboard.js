import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  
  const storedUsername = localStorage.getItem("username");
  const [user, setUser] = useState(storedUsername ? { username: storedUsername } : null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);

  
  useEffect(() => {
    if (!localStorage.getItem("token") || !storedUsername) {
      navigate("/");
    }
  }, [navigate, storedUsername]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  
  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch("http://localhost:5000/api/categories", {
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    loadCategories();
  }, []);

  
  const handleCategorySelect = async (categoryId) => {
    setSelectedCategory(categoryId);
    try {
      const response = await fetch(
        `http://localhost:5000/api/questions/category/${categoryId}`,
        { headers: { "Content-Type": "application/json", ...getAuthHeaders() } }
      );
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
    }
  };

  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}> Kealphine Forum Dashboard</h1>
        <div style={styles.userSection}>
          <span>Welcome, {user.username}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      <div style={styles.main}>
        <aside style={styles.sidebar}>
          <h3>Categories</h3>
          <div style={styles.categoryList}>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <div
                  key={cat._id}
                  style={{
                    ...styles.categoryItem,
                    backgroundColor:
                      selectedCategory === cat._id ? "#ececec" : "transparent",
                  }}
                  onClick={() => handleCategorySelect(cat._id)}
                >
                  {cat.name}
                </div>
              ))
            ) : (
              <p>Loading categories... </p>
            )}
          </div>
        </aside>

        <section style={styles.content}>
          {!selectedCategory ? (
            <p>Select a Category to view its questions.</p>
          ) : questions.length > 0 ? (
            questions.map((q) => (
              <div key={q._id} style={styles.questionCard}>
                <p>{q.question}</p>
                <small>
                  Posted by {q.user?.username || "Anonymous"} •{" "}
                  {new Date(q.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          ) : (
            <p>No questions found for this category.</p>
          )}
        </section>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    backgroundColor: "#a0522d",
    color: "white",
    padding: "15px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoutBtn: {
    backgroundColor: "#fff",
    color: "#a0522d",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  main: {
    flex: 1,
    display: "flex",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#f5f5f5",
    padding: "15px",
    borderRight: "1px solid #ddd",
    overflowY: "auto",
  },
  categoryList: {
    marginTop: "10px",
  },
  categoryItem: {
    padding: "10px",
    marginBottom: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  content: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },
  questionCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#fff",
  },
};
