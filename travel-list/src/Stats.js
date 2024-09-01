export function Stats({ items }) {
  console.log(items);
  let numItems = items.reduce((acc, cur) => acc + cur.quantity, 0);
  let numPacked = items.filter(x => x.packed === true).reduce((acc, cur) => cur.quantity + acc, 0);
  let percentage = Math.round(numPacked / numItems * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : percentage === 0 ? "you should starting packing your things" : ` 💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
