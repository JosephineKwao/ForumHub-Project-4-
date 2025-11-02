import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import CategoryList from "../components/CategoryList";
import QuestionCard from "../components/QuestionCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) navigate("/");
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectCategory = async (id) => {
    setSelectedCategory(id);
    try {
      const res = await API.get(`/questions/category/${id}`);
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {user && <Navbar user={user} />}
      <div style={{ display: "flex", marginTop: "10px" }}>
        <div style={{ width: "200px", borderRight: "1px solid gray", overflowY: "auto", padding: "10px" }}>
          <h3>Categories</h3>
          <CategoryList categories={categories} onSelect={handleSelectCategory} />
        </div>
        <div style={{ flex: 1, padding: "20px" }}>
          {selectedCategory ? (
            questions.map(q => <QuestionCard key={q._id} question={q} />)
          ) : (
            <p>Select a Category to view its questions</p>
          )}
        </div>
      </div>
    </div>
  );
}
