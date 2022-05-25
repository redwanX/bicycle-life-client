import React from 'react'

const PurchaseCard = (props) => {
  const {image,name,price,desc,moq,quantity} = props.part;
  return (
 <div className="card py-5 lg:card-side bg-accent shadow-xl">
    <figure><img src={image} alt="" className="w-1/2" /></figure>
    <div className="card-body p-5 mb-10">
        <div className="lg:flex block justify-between w-100">
        <h2 className="text-primary text-xl lg:text-2xl text-center font-bold">{name}</h2>
        <h2 className="text-primary text-xl lg:text-2xl text-center font-bold ">${price}</h2>
        </div>
        <p className="text-md text-secondary font-semibold"><span className="text-primary">Minimum Order: </span>{moq}</p>
        <p className="text-md text-secondary font-semibold"><span className="text-primary">Available Quantity: </span>{quantity}</p>
        <p className="text-secondary text-md font-semibold text-justify">{desc}</p>
        </div>
  </div>

  )
}

export default PurchaseCard