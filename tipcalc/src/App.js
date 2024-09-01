import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [bill,setBill]=useState(0)
  const [tip,setTip]=useState(0)
  const [ftip,fsetTip]=useState(0)
  
function onReset()
{
  setBill(0)
  setTip(0)
  fsetTip(0)
}
  
  return (
    <div>
      <Bill bill={bill} setBill={setBill}></Bill>

 <BillSelection tip={tip} setTip={setTip} name='you'>How did you like the service</BillSelection>
 <BillSelection tip={ftip} setTip={fsetTip} name='friend'>How did your friend like the service</BillSelection>
  {bill?
    <BillMessage bill={bill} tip={tip} ftip={ftip}></BillMessage>:''}

    {bill ?<button onClick={onReset}>reset</button>:''}
    </div>
  );
}

function BillSelection({name,tip,setTip,children})
{

  

return  <div> <p>{children}</p>
<select value={tip} name={name} onChange={e => setTip(Number(e.target.value))} >
  <option value={0}>Dissatisfied(0 %)</option>
  <option value={5}>It was ok (5 %)</option>
  <option value={10}>It was good (10 %)</option>
  <option value={20}>It was Amazing (20 %)</option>
  </select>
  </div>


}

function Bill({bill,setBill}){

  return <div><p>How much was the Bill</p><input value={bill} onChange={(e)=>setBill(Number(e.target.value))} type="text"></input></div>
}

function BillMessage({bill,tip,ftip})
{
  const ttip=(bill*((tip+ftip)/2)/100)
  console.log(ttip)

  return <p><strong>You Pay ${bill+ttip}(${bill} + ${ttip} tip) </strong></p>
}
export default App;
