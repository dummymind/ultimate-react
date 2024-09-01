
export function Item({ item, onHandleDelete, onTogglePacked }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        id={item.id}
        checked={item.packed}
        onChange={() => onTogglePacked(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : null}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onHandleDelete(item.id)}>{item.packed ? "✔️" : "✖️"}</button>
    </li>
  );
}
