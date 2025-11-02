export default function CategoryList({ categories, onSelect }) {
  return (
    <ul>
      {categories.map(cat => (
        <li key={cat._id} style={{cursor:"pointer"}} onClick={()=>onSelect(cat._id)}>
          {cat.name}
        </li>
      ))}
    </ul>
  );
}
