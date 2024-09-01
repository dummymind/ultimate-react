import { Item } from "./Item";

export function PackingList({ items, onHandleDelete, onTogglePacked, onClearList }) {

  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} onHandleDelete={onHandleDelete} onTogglePacked={onTogglePacked} />
        ))}
      </ul>
      <div className="actions">
        <select>
          <option value='0'>Sort by Input Order</option>
          <option value='1'>Sort by Description</option>
          <option value='2'>Sort by Status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>

      </div>
    </div>
  );
}
