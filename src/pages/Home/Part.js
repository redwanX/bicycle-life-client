import React from "react";
import { useNavigate } from 'react-router-dom';

const Part = ({part}) => {
    const {_id,name,desc,image,moq,quantity,price}=part;
    const navigate = useNavigate()
  return (

    <div className="card card-compact rounded-none border-2 bg-base-100 w-full relative shadow-xl">
    <figure><img className="w-full" src={image} alt="Shoes" /></figure>
    <div className="card-body mb-10">
      <div className="lg:flex block justify-between w-100">
      <h2 className="card-title text-primary text-xl lg:text-2xl text-center font-bold">{name}</h2>
      <h2 className="card-title text-primary text-xl lg:text-2xl  flex justify-center">${price}</h2>
      </div>
      <p className="text-md text-secondary font-semibold"><span className="text-primary">Minimum Order: </span>{moq}</p>
      <p className="text-md text-secondary font-semibold"><span className="text-primary">Available Quantity: </span>{quantity}</p>
      <p className="text-secondary text-md font-semibold text-justify">{desc}</p>
       </div>
    <div className="justify-end absolute bottom-0 w-full">
        <button onClick={()=>navigate(`/purchase/${_id}`)} className="btn rounded-none btn-secondary w-full">Purchase</button>
      </div>
  </div>

  );
};

export default Part;
