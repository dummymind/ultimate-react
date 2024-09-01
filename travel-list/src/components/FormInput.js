import { useState } from "react";

export function FormInput({ onHandleAdd }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (description) {
      const newItem = {
        id: Date.now(),
        description: description,
        quantity: quantity,
        packed: false
      };
      onHandleAdd(newItem);
      setDescription("");
      setQuantity(1);
    }
  }
  return (
    <div>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your trip?</h3>
        <select value={quantity} onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Item..." />
        <button>Add</button>
      </form></div>
  );
}
