import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import PurchaseCard from './PurchaseCard';

const Purchase = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [user,loading] = useAuthState(auth);
  const {id} = useParams();
  const [qty,setQuantity] = useState(-100)
  const location = useLocation()
  const navigate = useNavigate()
  const { data: part, isLoading } = useQuery(['singlepart'], () => fetch(`https://serene-meadow-57507.herokuapp.com/part/${id}`)
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
    setQuantity(number);
  }
  const order = (event) =>{
    event.preventDefault()
    const name= user.displayName;
    const email= user?.email || user?.user?.email;
    const address= event.target.address.value;
    const phone= event.target.phone.value;
    
    event.target.address.value="";
    event.target.phone.value="";
    const item = part;
    const authToken = localStorage.getItem('authToken');
    const body = {
      name,email,address,phone,qty,item}
      axios.post(`https://serene-meadow-57507.herokuapp.com/order`,body,{
        headers:{authorization: `Bearer ${authToken}`}
      })
      .then(res=>{
        toast('order placed!');
        navigate('/dashboard/order');
      })
      .catch(err=>{
        if(err.response.status ===401 || err.response.status ===403){
          toast("YOU ARE NOT AUTHORIZED!");
          signOut(auth)
          return <Navigate to="/login" state={{ from: location }} replace />
        }
      })
  }

  return (
    <div className='my-12 container mx-auto'>
    <div className='text-4xl pb-5 font-bold text-primary text-center '>PURCHASE</div>
    <hr />
      <PurchaseCard part={part}></PurchaseCard>
        <span className='block text-xl mt-12 font-bold text-secondary text-center '>Fill This Form To Continue</span>
        <hr />
        <div className='my-12 flex flex-col justify-center items-center'>
          <form  onSubmit={order} className='w-full max-w-xs lg:max-w-2xl'>
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
            <input name="phone" type="number" placeholder='Phone Number' required className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
          </div>
          <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary">Address</span>
            </label>
            <input name="address" type="text" placeholder='Address' required className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
          </div>

          <div className="w-full max-w-xs lg:max-w-2xl form-control">
            <label className="label">
              <span className="label-text font-bold text-primary">Quantity</span>
            </label>
            <label className="w-full max-w-xs lg:max-w-2xl input-group">
              
              <button type='button' className='btn btn-primary' disabled={qty===0?true:false} onClick={()=>setQuantity(Math.max(0,parseInt(qty)-1))} >-</button>
              <input type="number" value={(qty===-100?moq:qty).toString()} onChange={updateQuantity} required className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
              <button type='button' className='btn btn-primary' onClick={()=>setQuantity(Math.max(0,parseInt(qty)+1))} >+</button>
            </label>
          </div>
          {
            qty<parseInt(moq)||qty>parseInt(quantity)?
            <div className="my-5 text-center alert alert-error rounded-lg shadow-lg">
            <div>
              <span>Quantity Must between minimum order quantity and available quantity</span>
            </div>
          </div>
          :<div className="w-full max-w-xs lg:max-w-2xl">
          <label className="label">
            <span className="label-text font-bold text-primary">TOTAL COST:</span>
          </label>
          <input type="text" value={(parseInt(price) * qty).toString()+'$'} readOnly disabled className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
        </div>
          }
          <button className='btn btn-md bg-secondary mt-4' type="submit"  disabled={qty<parseInt(moq)||qty>parseInt(quantity)}>Purchase</button>

          </form>
        </div>

    </div>

  )
}

export default Purchase