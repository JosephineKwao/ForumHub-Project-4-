import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // added Link
import Navbar from "../components/Navbar";
import CategoryList from "../components/CategoryList";
import QuestionCard from "../components/QuestionCard";

export default function Dashboard() {
  const navigate = useNavigate();

  // Dummy user for testing
  const user = { username: "TestUser" };

  // Dummy categories
  const dummyCategories = [
    { _id: "1", name: "Dogs" },
    { _id: "2", name: "Cats" },
    { _id: "3", name: "Rabbits" },
  ];

  // Dummy questions
  const dummyQuestions = {
    "1": [
      { _id: "q1", title: "How to train my dog?", body: "I need tips.", answers: [] },
      { _id: "q2", title: "Best dog food?", body: "Looking for healthy options.", answers: [] },
    ],
    "2": [
      { _id: "q3", title: "Why does my cat scratch?", body: "I need advice.", answers: [] },
    ],
    "3": [
      { _id: "q4", title: "Rabbit housing tips?", body: "How to make a comfortable cage.", answers: [] },
    ],
  };

  const [categories] = useState(dummyCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionBody, setNewQuestionBody] = useState("");

  const handleSelectCategory = (id) => {
    setSelectedCategory(id);
    setQuestions(dummyQuestions[id] || []);
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionTitle || !newQuestionBody || !selectedCategory) return;

    const newQuestion = {
      _id: Date.now().toString(),
      title: newQuestionTitle,
      body: newQuestionBody,
      answers: [],
    };

    setQuestions([newQuestion, ...questions]);
    setNewQuestionTitle("");
    setNewQuestionBody("");
  };

  return (
    <div>
      <Navbar user={user} />

      {/* Optional Dashboard link */}
      <div style={{ padding: "10px" }}>
        <Link
          to="/dashboard"
          style={{
            padding: "5px 10px",
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "4px",
            textDecoration: "none",
          }}
        >
          Dashboard
        </Link>
      </div>

      <div style={{ display: "flex", marginTop: "10px" }}>
        {/* Left Panel: Categories */}
        <div
          style={{
            width: "200px",
            borderRight: "1px solid gray",
            overflowY: "auto",
            padding: "10px",
          }}
        >
          <h3>Categories</h3>
          <CategoryList categories={categories} onSelect={handleSelectCategory} />
        </div>

        {/* Right Panel: Questions */}
        <div style={{ flex: 1, padding: "20px" }}>
          {selectedCategory && (
            <div style={{ marginBottom: "20px" }}>
              <h4>Add New Question</h4>
              <form
                onSubmit={handleAddQuestion}
                style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <input
                  type="text"
                  placeholder="Question Title"
                  value={newQuestionTitle}
                  onChange={(e) => setNewQuestionTitle(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Question Body"
                  value={newQuestionBody}
                  onChange={(e) => setNewQuestionBody(e.target.value)}
                  rows={3}
                  required
                />
                <button type="submit">Submit Question</button>
              </form>
            </div>
          )}

          {selectedCategory ? (
            questions.map((q) => <QuestionCard key={q._id} question={q} />)
          ) : (
            <p>Select a Category to view its questions</p>
          )}
        </div>
      </div>
    </div>
  );
}
