import { useState } from "react";
import { Logo } from "./Logo";
import { FormInput } from "./FormInput";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];

function App() {
  const [items,setItems]=useState([])
  function onHandleAdd(item)
  {
    setItems([...items,item])
  }
  function onHandleDelete(id)
  {
    setItems(items=>items.filter(item=>item.id!==id))
  }
  function onClearList()
  {
    setItems([])
  }
  function onTogglePacked(id)
  {

    setItems(items=>items.map(item=>{
      if (item.id === id) { 
        return {...item,packed:!item.packed}; 
      } else {
        return item; 
      }
    }
    
))
  }
  return (
    <div className="App">
      <Logo></Logo>
      <FormInput onHandleAdd={onHandleAdd}></FormInput>
      <PackingList onClearList={onClearList} items={items} onHandleDelete={onHandleDelete} onTogglePacked={onTogglePacked}></PackingList>
      <Stats items={items}></Stats>
    </div>
  );
}

export default App;
