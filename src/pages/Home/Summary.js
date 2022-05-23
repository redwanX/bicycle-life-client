import React from 'react'
import { MdSupervisedUserCircle } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { BsBicycle } from "react-icons/bs";

const Summary = () => {
  return (
    <div className='mt-12 container mx-auto'>
         <div className='text-4xl pb-5 font-bold text-primary text-center '>SUMMARY</div>
            <hr /> 
        <div className="stats shadow flex flex-col lg:flex-row py-5">
            <div className="stat">
                <div className="stat-figure text-primary text-8xl">
                <MdSupervisedUserCircle></MdSupervisedUserCircle>
                </div>
               <div className='stat-desc font-bold'>We Served</div>
                <div className="stat-value text-primary">500+</div>
                <div className="stat-title text-2xl font-bold">Happy Client</div>
            </div>
            
            <div className="stat">
                <div className="stat-figure text-primary text-8xl">
                <FaMoneyCheckAlt></FaMoneyCheckAlt>
                </div>
                <div className='stat-desc font-bold'>We Made</div>
                <div className="stat-value text-primary">16M+</div>
                <div className="stat-title text-xl font-bold">Annual revenue</div>
            </div>
            
            <div className="stat">
                <div className="stat-figure text-primary text-8xl">
                    <BsBicycle></BsBicycle>
                </div>
                <div className='stat-desc font-bold'>We Manufecture</div>
                <div className="stat-value text-primary">100+</div>
                <div className="stat-title text-xl font-bold">Unique Parts</div>
                 </div>
            
            </div>
    </div>
  )
}

export default Summary