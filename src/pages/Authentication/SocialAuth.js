import React, { useEffect } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading'
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import axios from 'axios';
const SocialAuth = () => {
  //Hooks
  const navigate = useNavigate();
  const location =useLocation();
  const [signInwithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  let from = location.state?.from?.pathname || "/";
    
  //Error Handling
  useEffect(()=>{
      if(error){
        toast(error?.message)
      }
    },[error]);

  useEffect(()=>{
      const tokenUpdate=async()=>{
        if(user){
          navigate(from,{replace:true});
        }
      }
      tokenUpdate();
    },[user]);

  const socialLogin = async()=>{
    await signInwithGoogle();
}
  //Loding
  if(loading){
      <Loading></Loading>
    }
 
  return (
    

    <div>
        <button  className='w-full btn hover:bg-secondery bg-primary border-0 shadow rounded-lg  mb-5' onClick={()=>socialLogin()}>
          <div className='flex items-center justify-center'>
          <span>Continue With Google</span>
          </div>
        </button>


    </div>
  )
}

export default SocialAuth