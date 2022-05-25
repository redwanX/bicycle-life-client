import React from 'react'
import { AiFillStar } from "react-icons/ai";

const Review = (pros) => {
  const {ratings,desc,name}=pros.review

  return (
    
  <div className="card w-full rounded-2xl  bg-accent shadow-xl">
  <div className="card-body">
    <h2 className="card-title flex justify-center">{
    [...Array(5)].map((_,index)=>{
      return(
        <AiFillStar style={{width:"30px",height:"30px"}} key={index} className={`inline p-0 m-0 ${index<parseInt(ratings)?'text-orange-400':'text-orange-200'}`}></AiFillStar>
      )
    })}
    </h2>
    <p className=' italic text-center py-4'>"{desc}"</p>
    
    <p className="flex justify-end font-semibold text-primary">-{name}</p>
    
  </div>
</div>
  )
}

export default Review