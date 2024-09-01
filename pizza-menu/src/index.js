import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function Timer() {
    const [date,setDate]=React.useState(0)

    React.useEffect(()=>{
        const timer=setInterval(()=>{

            setDate(new Date().toLocaleDateString()+' '+(new Date().toLocaleTimeString()))
        },1000)
        return ()=>{
            clearInterval(timer)
        }
    },[date])
    return (
        
            <p>{date}</p>
        
    )
}

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Menu() {
  return (
    <menu className="menu">
      <h2>Pizza Menu</h2>
      {pizzaData.length <= 0 ? (
        <p>Sold Out!</p>
      ) : (
        <>
          <p>Authentic Italian Cuisine</p>
          <ul className="pizzas">
            {pizzaData.map((piz) => (
              <Pizza key={piz.name} pizzaObj={piz}></Pizza>
            ))}
          </ul>
        </>
      )}
    </menu>
  );
}

function Header() {
  return (
    <header className="header footer">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Footer() {
  const nowHour = new Date().getHours();
  const openHour = 8;
  const closeHour = 22;

  if (nowHour < openHour || nowHour > closeHour) {
    return (
      <footer className="footer">
        <div className="order">
        <p>
          We are happy to serve you between {openHour} and {closeHour} Hours
        </p>
        <p><Timer/></p>
        </div>
      </footer>
    );
  } else {
    return (
      <footer className="footer">
        <div className="order">
          <p>We are open now. Our timings are from {openHour}:00 to {closeHour}:00 hrs. Come visit us or order online.</p>
          <button className="btn">Order</button>
          <p><Timer/></p>
        </div>
      </footer>
    );
  }
}

function Pizza(props) {
  const pizzaOb = props.pizzaObj;
  return (
    <li className={`pizza ${pizzaOb.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaOb.photoName} alt={pizzaOb.name}></img>
      <div>
        <h3>{pizzaOb.name}</h3>
        <p>{pizzaOb.ingredients}</p>
        <span>{pizzaOb.soldOut ? "SOLD OUT" : pizzaOb.price}</span>
      </div>
    </li>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
