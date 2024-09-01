import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setfriends] = useState(initialFriends);
  const [showaddfriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setfriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          onSelection={handleSelection}
          friends={friends}
          setfriends={setfriends}
          selectedFriend={selectedFriend}
        ></FriendList>
        {showaddfriend && (
          <FormAddFriend
            setShowAddFriend={setShowAddFriend}
            friends={friends}
            setfriends={setfriends}
          ></FormAddFriend>
        )}
        <FormSplitBill
          m={friends.filter((c) => c.id === 118836)}
          addbill={handleSplitBill}
        ></FormSplitBill>
        <button
          className="button"
          onClick={() => setShowAddFriend(!showaddfriend)}
        >
          {showaddfriend ? "Close" : "Add Friend"}
        </button>
      </div>
    </div>
  );
}

function FriendList({ friends, onSelection, setfriends,selectedFriend }) {
  return (
    <ul>
      {friends.map((m) => (
<Friend m={m} friends={friends} onSelection={onSelection} setfriends={setfriends} selectedFriend={selectedFriend}></Friend>
      ))}
    </ul>
  );
}


function Friend({m, friends, onSelection, setfriends,selectedFriend })
{
  const [isSelected,setisSelected]=useState(false)
  

  return (<li key={m.id} className="selected">
  <div className="image-wrapper">
    <img src={m.image}></img>
  </div>
  <h3>{m.name}</h3>
  {m.balance < 0 ? (
    <p className="red">
      You owe {m?.name} ${Math.abs(m.balance)}
    </p>
  ) : m.balance === 0 ? (
    <p>You and {m?.name} are equal</p>
  ) : (
    <p className="green">
      {m.name} owes you ${Math.abs(m.balance)}
    </p>
  )}
  <button className="button" onClick={() => onSelection(m)}>
    {m.id===selectedFriend?.id ? "Close" : "Select"}
  </button>
</li>)
}

function FormAddFriend({ friends, setfriends, setShowAddFriend }) {
  const [name, setname] = useState();
  const [url, seturl] = useState("https://i.pravatar.cc/48");

  function addfriend(e) {
    e.preventDefault();
    if (!name || !url) {
      return;
    }
    const id = crypto.randomUUID();

    var newfriend = {
      id: id,
      name: name,
      image: `${url}?=${id}`,
      balance: 0,
    };
    setfriends(() => [...friends, newfriend]);
    setname("");
    seturl("https://i.pravatar.cc/48");
    setShowAddFriend(false);
  }
  return (
    <div>
      <form className="form-add-friend" onSubmit={(e) => addfriend(e)}>
        <label>🧑‍🤝‍🧑Friend Name</label>
        <input
          type="text"
          onChange={(e) => setname(e.target.value)}
          value={name}
        ></input>
        <label>📷Image Url</label>
        <input
          type="text"
          onChange={(e) => seturl(e.target.value)}
          value={url}
        ></input>
        <button className="button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

function FormSplitBill({ m, addbill }) {
  
  const [billvalue, setbillvalue] = useState(0);
  const [yourvalue, setyourvalue] = useState(0);
  const [fvalue, setfvalue] = useState(0);
  const fpay = billvalue ? billvalue - yourvalue : "";
  const [paidby, setpaidby] = useState("you");
  function addbilllocal(e) {
    e.preventDefault();
    if (!billvalue || !yourvalue) return;
    if (paidby === "you") {
      m.balance = m.balance + fvalue;
    } else {
      m.balance = m.balance - yourvalue;
    }
    addbill(m.balance);
  }
  return (
    <div>
      <form className="form-split-bill" onSubmit={(e) => addbilllocal(e)}>
        <label>💵 Bill Value</label>
        <input
          type="text"
          onChange={(e) => setbillvalue(e.target.value)}
          value={billvalue}
        ></input>
        <label>💵 Your Value</label>
        <input
          type="text"
          onChange={(e) => setyourvalue(e.target.value)}
          value={yourvalue}
        ></input>
        <label>💵 {m?.name} Value</label>
        <input
          type="text"
          disabled
          onChange={(e) => setfvalue(e.target.value)}
          value={fpay}
        ></input>
        <select onChange={(e) => setpaidby(e.target.value)}>
          <option value="you">you</option>
          <option value="friend">{m?.name}</option>
        </select>
        <button className="button" type="submit">
          Split Bill
        </button>
      </form>
    </div>
  );
}
