import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];


function App() {
  return <div><Accordion></Accordion></div>
   
}

function Accordion(){
  const [tog,settog]=useState(false)
  var curr=null
  function HandleToggle({num})
  {
    settog(tog=>!tog)

  }


return <div className='accordion'>
  {faqs.map((n,i)=>
  
    <AccordionItem item={n} num={i}></AccordionItem>
  )}
</div>
}

function AccordionItem({item,num})
{
  
  return <div className={`item ${tog ? `open`:''}`} onClick={()=>HandleToggle(num)}>
        <p className='number'>{String(num+1).padStart(2,'0')}</p>
        <p className='title'>{item.title}</p>
        <p className='icon'>{tog?"-":"+"}</p>
        {tog &&
        <div className='content-box'>
          {item.text}
        </div>}


  </div>
}

export default App;
