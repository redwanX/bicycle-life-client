import React from "react";

const Part = ({part}) => {
    const {name,desc,image,moq,quantity,price}=part;
    console.log(part);
  return (
    <div className="lg:px-0 px-4">
      
    <div className="card w-full min-h-16 bg-base-100 relatives shadow-xl">
    <figure><img className="w-full" src={image} alt="Shoes" /></figure>
    <div className="card-body mb-10">
      <div className="lg:flex block justify-between w-100">
      <h2 className="card-title text-primary text-2xl font-bold">{name}</h2>
      <h2 className="card-title text-primary text-2xl flex justify-center">${price}</h2>
      </div>
      <p className="text-secondary text-md font-semibold text-justify">{desc}</p>
      <p className=" text-xl text-secondary  font-semibold"><span className="text-primary">Minimum Order: </span>{moq}</p>
      <p className=" text-xl text-secondary  font-semibold"><span className="text-primary">Available Quantity: </span>{quantity}</p>
    </div>
    <div className="justify-end absolute bottom-0 w-full">
        <button className="btn rounded-none btn-primary w-full">Purchase</button>
      </div>
  </div>
    </div>
  );
};

export default Part;
