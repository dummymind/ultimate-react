import { useState } from 'react';
import logo from './logo.svg';


const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];


export default function App() {
  const [step, setStep] = useState(0)
  const [isOpen, setIsOpen] = useState(true)

  
  function updateStepValues(props) {
   setStep(props.idvalue) 
  }
  var handleprevious=() => setStep((step-1)<=0?0:(step-1))
  var handlenext=() => setStep((step+1)%3)
  return <>
  <div><button className='close' onClick={() => setIsOpen(!isOpen)}>❌</button></div>
  {isOpen &&(<div className='steps'> 
  <div className='numbers'>
    <div className={step >= 0 && 'active'} onClick={() => setStep(0)} >1</div>
    <div className={step >= 1 && 'active'} onClick={() => setStep(1)} >2</div>
    <div className={step >= 2 && 'active'} onClick={() => setStep(2)} >3</div>
  </div>
  <div className='message'> {messages[step]}</div>
  <div className='buttons'>
  <ButtonC bgColor='#7950f2' textColor='white' handleScript={handleprevious}><p>👈</p> Previous</ButtonC>
  <ButtonC bgColor='#7950f2' textColor='white' handleScript={handlenext}>Next<p>👉</p></ButtonC>

      </div>
  </div>)}</>;
}

function ButtonC(props)
{

return <button style={{backgroundColor:props.bgColor,color:props.textColor}} onClick={props.handleScript}>{props.children}</button>
}