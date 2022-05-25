import React from "react";
import { useNavigate } from 'react-router-dom';

const Part = ({part}) => {
    const {_id,name,desc,image,moq,quantity,price}=part;
    const navigate = useNavigate()
  return (

    <div className="card rounded-2xl card-compact border-0 bg-base-100 w-full  lg:w-5/6 mx-auto relative shadow-xl">
    <figure><img className="w-full" style={{height:'400px'}} src={image} alt="Shoes" /></figure>
    <div className="card-body bg-accent mb-10">
      <div className="lg:flex block justify-between w-100">
      <h2 className="card-title text-primary text-xl flex justify-center font-bold">{name}</h2>
      <h2 className="card-title text-secondary text-xl flex justify-center font-bold">${price}/Unit</h2>
      </div>
      <p className="text-md text-secondary font-semibold"><span className="text-primary">Minimum Order: </span>{moq}</p>
      <p className="text-md text-secondary font-semibold"><span className="text-primary">Available Quantity: </span>{quantity}</p>
      <p className="text-secondary text-md text-justify">{desc}</p>
       </div>
    <div className="justify-end absolute bottom-0 w-full">
        <button onClick={()=>navigate(`/purchase/${_id}`)} className="btn rounded-none btn-secondary w-full">Purchase</button>
      </div>
  </div>

  );
};

export default Part;
