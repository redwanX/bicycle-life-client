import React from 'react'

const PurchaseCard = (props) => {
  const {image,name,price,desc,moq,quantity} = props.part;
  return (
 <div className="card p-5 flex flex-col lg:flex-row bg-accent shadow-xl">
    <img src={image} alt="" style={{height:"300px"}} className="mx-auto max-w-xs w-full" /> 
    
    <div className="card-body p-5 mb-10">
        <div className="lg:flex block justify-between w-100">
        <h2 className="text-primary text-xl lg:text-2xl text-center font-bold">{name}</h2>
        <h2 className="text-secondary text-xl lg:text-2xl text-center font-bold ">${price}/Unit</h2>
        </div>
        <div>
        <p className="text-md text-secondary font-semibold"><span className="text-primary">Minimum Order: </span>{moq}</p>
        <p className="text-md text-secondary font-semibold"><span className="text-primary">Available Quantity: </span>{quantity}</p>
        </div>
        <p className="text-secondary text-md font-semibold text-justify"><span className="text-primary">Description: </span>{desc}</p>
        </div>
  </div>

  )
}

export default PurchaseCard