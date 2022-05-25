import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_51L3F8NDmww64mnOdU8jCDPssrpkFII0S3KDVBWoi2Val8ooeyPZoIvfx14dkePqkwOsTBBbGZUflRgT67qtkCJkb0034R6GJ3f');

const Payment = () => {
    const [user,loading] = useAuthState(auth)
    const {id} = useParams();
    const location = useLocation();
    const { data: ordersById, isLoading, refetch } = useQuery(['ordersById',user,id], () => axios.get(`http://localhost:5000/orderById/${id}`,{
        headers:{authorization: `Bearer ${localStorage.getItem('authToken')}`}
      })
      .then(res=>{
          return res.data
      })
      .catch(err=>{
        if(err.response.status ===401 || err.response.status ===403){
          toast("YOU ARE NOT AUTHORIZED!");
          signOut(auth)
          return <Navigate to="/login" state={{ from: location }} replace />
        }
      }));

if(loading||isLoading){
    return <Loading></Loading>
}
  return (
<div className='container mx-auto'>
    <div className='text-2xl py-5 font-bold text-secondary text-center '>Payment</div>
    <hr />
    <div className='flex flex-col lg:flex-row'>
        <div className='flex-1'>
        <form  className='mx-auto w-full max-w-xs lg:max-w-2xl'>
    <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary">Parts Name</span>
            </label>
            <input type="text" value={ordersById?.item?.name} readOnly disabled className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
          </div>
          
          <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary"> Your Name</span>
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
            <input name="phone" type="number" value={ordersById?.phone} placeholder='Phone Number' readOnly disabled className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
          </div>
          <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary">Address</span>
            </label>
            <input name="address" type="text" value={ordersById?.address} readOnly disabled className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
          </div>

          <div className="w-full max-w-xs lg:max-w-2xl form-control">
            <label className="label">
              <span className="label-text font-bold text-primary">Quantity</span>
            </label>
            <input name="quantity" type="text" value={ordersById?.qty} readOnly disabled className="input input-bordered w-full max-w-xs lg:max-w-2xl" />

          </div>
          {
          <div className="w-full max-w-xs lg:max-w-2xl">
          <label className="label">
            <span className="label-text font-bold text-primary">TOTAL COST:</span>
          </label>
          <input name="cost" type="text" value={(parseInt(ordersById?.qty)*parseInt(ordersById?.item?.price)).toString()+'$'} readOnly disabled className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
        </div>
          }
          </form>
        </div>
        <div className='flex-1'>
          <div className='mt-12 mx-auto card w-full max-w-xs lg:max-w-2xl bg-accent shadow-xl '>
          <div className='card-body'>
              <div className='card-title'>PLEASE PAY: {(parseInt(ordersById?.qty)*parseInt(ordersById?.item?.price)).toString()+'$'}</div>
          <Elements  stripe={stripePromise}>
            <CheckoutForm ordersById={ordersById} />
        </Elements>
          </div>
          </div>
        </div>
    </div>
    
 </div>
  )
}

export default Payment