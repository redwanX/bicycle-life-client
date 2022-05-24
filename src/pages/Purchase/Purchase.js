import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const Purchase = () => {
  const [user,loading] = useAuthState(auth);
  const {id} = useParams();
  const [qty,setQuantity] = useState(-100)
  const { data: part, isLoading } = useQuery(['singlepart'], () => fetch(`http://localhost:5000/part/${id}`)
  .then(res => res.json()))
  useEffect(()=>{
    if(part){
      setQuantity(moq);
    }
  },[part])
  if(isLoading||loading){
    return <Loading></Loading>
  }

 

  const {_id,image,name,price,desc,moq,quantity} = part;
 
  const updateQuantity = event =>{
    const number =parseInt(event.target.value)|| 0;
    console.log(number)
    setQuantity(number);
  }

  return (
    <div className='my-12 container mx-auto'>
    <div className='text-4xl pb-5 font-bold text-primary text-center '>PURCHASE</div>
    <hr />
    <div className="card py-5 lg:card-side bg-base-100 shadow-xl">
        <figure><img src={image} alt="" className="w-1/2" /></figure>
        <div className="card-body mb-10">
            <div className="lg:flex block justify-between w-100">
            <h2 className="text-primary text-xl lg:text-2xl text-center font-bold">{name}</h2>
            <h2 className="text-primary text-xl lg:text-2xl text-center font-bold ">${price}</h2>
            </div>
            <p className="text-md text-secondary font-semibold"><span className="text-primary">Minimum Order: </span>{moq}</p>
            <p className="text-md text-secondary font-semibold"><span className="text-primary">Available Quantity: </span>{quantity}</p>
            <p className="text-secondary text-md font-semibold text-justify">{desc}</p>
            </div>
        </div>
        <span className='block text-xl mt-12 font-bold text-secondary text-center '>Fill This Form To Continue</span>
        <hr />
        <div className='my-12 flex flex-col justify-center items-center'>
          <form className='w-full max-w-xs lg:max-w-2xl'>
          <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary">Name</span>
            </label>
            <input type="text" value={user.displayName} readOnly disabled className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
          </div>

          <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary">Email</span>
            </label>
            <input type="email" value={user.email} readOnly disabled className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
          </div>

          <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary">Phone</span>
            </label>
            <input type="number" placeholder='Phone Number' required className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
          </div>
          <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary">Address</span>
            </label>
            <input type="text" placeholder='Address' required className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
          </div>

          <div className="w-full max-w-xs lg:max-w-2xl form-control">
            <label className="label">
              <span className="label-text font-bold text-primary">Quantity</span>
            </label>
            <label className="w-full max-w-xs lg:max-w-2xl input-group">
              
              <button type='button' className='btn btn-primary' disabled={qty===0?true:false} onClick={()=>setQuantity(Math.max(0,qty-1))} >-</button>
              <input type="number" value={(qty===-100?moq:qty).toString()} onChange={updateQuantity} required className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
              <button type='button' className='btn btn-primary' onClick={()=>setQuantity(Math.max(0,qty+1))} >-</button>
            </label>
          </div>
          {
            qty<parseInt(moq)||qty>parseInt(quantity)?
            <div className="my-5 text-center alert alert-error rounded-lg shadow-lg">
            <div>
              <span>Quantity Must between minimum order quantity and available quantity</span>
            </div>
          </div>
          :""
          }
          
          <button className='btn btn-md mt-4'  disabled={qty<parseInt(moq)||qty>parseInt(quantity)}>Purchase</button>


          </form>
        </div>

    </div>

  )
}

export default Purchase