import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';

const AddReview = () => {
  const [user,loading] = useAuthState(auth);
  const [rating,setRating]=useState('');
  const location = useLocation()

  if(loading){
    return<Loading></Loading>
  }

  const updateRating =(e)=>{
    let value = e.target.value;
    if(parseInt(value)>5)value='5';
    if(parseInt(value)<=0)value='1';
    setRating(value)
  }
  const sendReview = (e) => {
    e.preventDefault();
    const name = user?.displayName
    const email = user?.email || user?.email?.email;
    const ratings =e.target.rating.value;
    const desc =e.target.desc.value;
    e.target.desc.value="";
    setRating("");
    const authToken = localStorage.getItem('authToken');
    const body = {
      name,email,ratings,desc}
      axios.post(`http://localhost:5000/review`,body,{
        headers:{authorization: `Bearer ${authToken}`}
      })
      .then(res=>{
        toast('Thanks For Reviewing us');
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
    <div className='container mx-auto'> 
          <div className='text-2xl py-5 font-bold text-secondary text-center '>ADD REVIEW</div>
            <hr />

            <div className='my-12 flex flex-col justify-center items-center'>
          <form onSubmit={sendReview}  className='w-full max-w-xs lg:max-w-2xl'>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Rate Us</span>
            </label>
            <label className="input-group w-full">
              <input type="number" placeholder='1 to 5' name="rating" value={isNaN(parseInt(rating))?"":Math.floor(parseInt(rating))} onChange={updateRating} required className="input input-bordered w-full" />
              <span className='bg-primary w-1/2 text-white'>Out of 5</span>
            </label>
          </div>

          <div className=" form-control w-full">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea  className="textarea textarea-bordered" name="desc" required placeholder="Description"></textarea>
          </div>
          <button className='btn bg-secondary w-full mt-4' type="submit">Submit</button>



          </form>
        </div>

      </div>






  )
}

export default AddReview