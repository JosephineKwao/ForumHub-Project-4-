import React from "react";

export default function CategoryList({ categories, onSelect }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {categories.map(cat => (
        <li
          key={cat._id}
          onClick={() => onSelect(cat._id)}
          style={{ cursor: "pointer", padding: "5px 0" }}
        >
          {cat.name}
        </li>
      ))}
    </ul>
  );
}
