import React, { useState } from "react";
import API from "../api/api";

export default function QuestionCard({ question }) {
  const [answerText, setAnswerText] = useState("");
  const [answers, setAnswers] = useState(question.answers || []);

  const handleAddAnswer = async (e) => {
    e.preventDefault();
    if (!answerText) return;

    try {
      const res = await API.post(`/questions/${question._id}/answers`, {
        answerText,
      });
      setAnswers([...answers, res.data]);
      setAnswerText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
      <h4>{question.title}</h4>
      <p>{question.body}</p>
      <p>By: {question.userId?.username || "Unknown"}</p>

      {answers.length > 0 && (
        <div>
          <h5>Answers:</h5>
          {answers.map((a, i) => (
            <p key={i}>
              <strong>{a.userId?.username || "Unknown"}:</strong> {a.answerText}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={handleAddAnswer} style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Write your answer..."
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          style={{ width: "80%", marginRight: "5px" }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
