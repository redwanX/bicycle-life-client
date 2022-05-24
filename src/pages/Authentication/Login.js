import React, { useEffect, useRef, useState } from 'react'
import SocialAuth from './SocialAuth'
import {useForm} from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import {  useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { sendPasswordResetEmail } from 'firebase/auth';
import axios from 'axios';
const Login = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [userAuthenticate,loadingAuthenticate] = useAuthState(auth)
  const [email,setEmail] = useState('');
  const [loadToken,setLoadToken] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  let from = location.state?.from?.pathname || "/";
  useEffect(()=>{
    const tokenUpdate = async()=>{ 
    if(userAuthenticate){
      setLoadToken(true);
      const email = userAuthenticate.email;
      const currentUser ={email,role:"user"}
      const {data}= await axios.put(`http://localhost:5000/login/${email}`,currentUser);
      
      setLoadToken(false);
      localStorage.setItem('authToken',data.token)
      navigate(from,{replace:true});
    }
  }
    tokenUpdate();
  },[userAuthenticate]);


  useEffect(()=>{
    if(error){
      toast(error?.message)
    }
  },[error]);



  if(loading||loadingAuthenticate||loadToken){
    return <Loading></Loading>
  }
  const handleResetPassword = async ()=>{
    const validateEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
    if(email && validateEmail){
      sendPasswordResetEmail(auth, email)
      .then(() => {
        toast("Reset Link Sent To email")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast(errorMessage)
      });

    }
    else{
        toast('please Enter Your Valid Email Address');
    }
  }


  const onSubmit = async(data) =>{
    const email = data.email;
    const password = data.password;
    setEmail(email)
    await signInWithEmailAndPassword(email,password)
  }

  return (
    <div style={{minHeight: 'calc(100vh - 64px - 100px)'}} className='container mx-auto flex justify-center items-center'>
      <div className="card w-full lg:w-2/3 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-primary text-2xl font-bold text-center underline">LOGIN</h2>
          <div className="flex flex-col w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
             {...register("email", {
               required:{
                 value: true,
                 message: "Email is required"
               },
               pattern:{
                 value:/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                 message:"Please provide valid Email"
               }
             })}
            type="email"  placeholder="Email" className="input input-bordered w-full" />
            <label className="label">
              {errors.email?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.email.message}</span>}
              {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500 ">{errors.email.message}</span>}
            </label>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Passowrd</span>
            </label>
            <input
             {...register("password", {
               required:{
                 value: true,
                 message: "password is required"
               },
               minLength:{
                 value:6,
                 message:"Must be Minimum 6 charecter long"
               }
             })}
            type="password" placeholder="Password" className="input input-bordered w-full" />
            <label className="label">
              {errors.password?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.password.message}</span>}
              {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500 ">{errors.password.message}</span>}
            </label>
          </div>

            <input className="btn btn-block hover:bg-primary bg-secondary rounded-lg border-0" type="submit" value="Login" />
          </form>
          <small className='font-bold mt-5 p-0 m-0'>New User? <Link to='/register' className='text-primary pointer-events-auto text-decoration-none ps-2'>Register</Link>  </small>
        <small className='font-bold p-0 m-0'>Forgot Password?<button className='p-0 font-bold text-primary pointer-events-auto  ps-2 text-decoration-none' onClick={handleResetPassword}>Reset Password</button> </small>
      

          <div className="divider">OR</div>
          <SocialAuth></SocialAuth>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Login