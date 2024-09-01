import { useState } from "react"

const ContainerStyle={

    display:'flex',
    alignItems:'center',
    gap:'16px'

}




export function StarRating()
{
  const [setratingvalue,onsetRating]=useState(0)

  function setRatingFunction(rating)
  {
    onsetRating(rating)
  }
  const mess=['worst','bad','average','good','excellent']
  return <>
  <StarRatingContainer maxRating={10} size={24} color="pink" onsetRating={setRatingFunction}></StarRatingContainer>
  {/* <p>The rating select is {setratingvalue}</p> */}
  </>
}


export default function StarRatingContainer({maxRating=5,size=48,color='#000',onsetRating,message=[]})
{
    const [rating,setRating]= useState(0)
    const [tempRating,setTempRating]=useState(0)
    
    function selectedStar(i)
    {
        // console.log(i)
        setRating(i)
        onsetRating(i)
    }

    const StarContainerStyle={
      display:'flex',
      gap:'4px',
      color:`${color}`,
      fontColor:`${color}`,
  }

  const TextStyle={
    lineHeight:'1',
    margin:'0',
    color:`${color}`

}

 
    return <div style={ContainerStyle}>
        <div style={StarContainerStyle}>{
        Array.from({length:maxRating},(_,i)=>
        (
                <StarComponent size={size} color={color} selectedStar={selectedStar} i={i} key={i} full={i<(tempRating>0?tempRating:rating)} MouseIn={setTempRating} MouseOut={setTempRating}  />
            )
        )}</div>
        <p style={TextStyle}>{message.length>0?tempRating>0?message[tempRating-1]:message[rating-1] :tempRating>0?tempRating:rating}</p>
    </div>
}


function StarComponent({selectedStar,i,full,MouseIn,MouseOut,size=48,color='#000'})
{

  const StarStyle={
    heigth:`${size}px` ,
    width: `${size}px` ,
    display:'block'

}

return (<span role="button" onClick={()=>selectedStar(i+1)} onMouseEnter={()=>MouseIn(i+1)} onMouseLeave={()=>MouseOut(0)} style={StarStyle}>
    {full ? 
    <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill={color}
  stroke={color}
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>
:<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke={color}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>}
</span>
)
}