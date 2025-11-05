import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // Replace TestUser: we'll load actual user from /api/auth/me
  const [user, setUser] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);

  // helper to get auth headers if token exists
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Load current user profile on mount (redirect to login if not found)
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        });

        if (!res.ok) {
          // not authenticated -> go to login
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const profile = await res.json();
        setUser(profile);
      } catch (err) {
        console.error("Error fetching current user:", err);
        navigate("/login");
      }
    }

    loadUser();
  }, [navigate]);

  // Fetch categories
  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch("http://localhost:5000/api/categories", {
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        });
        if (!response.ok) {
          console.error("Failed to load categories:", response.status);
          return;
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    loadCategories();
  }, []);

  // Fetch questions for a category
  const handleCategorySelect = async (categoryId) => {
    setSelectedCategory(categoryId);
    try {
      const response = await fetch(
        `http://localhost:5000/api/questions/category/${categoryId}`,
        { headers: { "Content-Type": "application/json", ...getAuthHeaders() } }
      );
      if (!response.ok) {
        console.error("Failed to load questions:", response.status);
        setQuestions([]);
        return;
      }
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
    }
  };

  // Logout: clear token and redirect
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // While user is loading, show nothing or a spinner
  if (!user) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>🐾 Pet Forum Dashboard</h1>
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
              <p>Loading categories...</p>
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

// ---------- STYLES ----------
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
