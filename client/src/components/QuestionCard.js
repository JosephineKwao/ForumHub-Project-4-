import React from "react";

export default function QuestionCard({ question }) {
  return (
    <div style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
      <h4>{question.title}</h4>
      <p>{question.body}</p>
      <p>By: {question.userId?.username || "Unknown"}</p>
      {question.answers?.length > 0 && (
        <div>
          <h5>Answers:</h5>
          {question.answers.map((a, i) => (
            <p key={i}><strong>{a.userId?.username || "Unknown"}:</strong> {a.answerText}</p>
          ))}
        </div>
      )}
    </div>
  );
}
