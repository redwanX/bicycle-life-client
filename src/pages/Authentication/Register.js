import React, { useEffect, useState } from 'react'
import SocialAuth from './SocialAuth'
import {useForm} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState, useCreateUserWithEmailAndPassword, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';
import axios from 'axios';
import { signOut } from 'firebase/auth';
const Register = () => {
  const { register,getValues, handleSubmit, watch, formState: { errors } } = useForm();
  const [userAuthenticate,loadingAuthenticate] = useAuthState(auth)
  const [loadToken,setLoadToken] = useState(false);
    const navigate = useNavigate()
    const [
      createUserWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification, sending, emailError] = useSendEmailVerification(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    
    
    useEffect(()=>{
      const tokenUpdate = async()=>{ 
      if(userAuthenticate){
        setLoadToken(true)
        const email = userAuthenticate.email;
        const currentUser ={email}
        const {data}= await axios.put(`http://localhost:5000/login/${email}`,currentUser);
        setLoadToken(false);
        localStorage.setItem('authToken',data.token)
        sessionStorage.setItem('name',getValues('name'));
        //signOut(auth)
        //toast("Thank You For SignUp,Please Login")
        navigate('/');
      }
    }
      tokenUpdate();
    },[userAuthenticate]);
  

    useEffect(()=>{
      if(error){
        toast(error?.message)
      }
    },[error]);
    useEffect(()=>{
      if(user){
        if(!emailError){
          toast('Verification Email Sent, Please Check Your Email For Confirmation Link')
        }
        navigate('/');

      }
    },[user]);
    if(loading||loadingAuthenticate||sending||updating){
      return <Loading></Loading>
    }
  const onSubmit = async(data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    await sendEmailVerification(email)
  };





  return (
    <div style={{minHeight: 'calc(100vh - 64px - 100px)'}} className='container mx-auto flex justify-center items-center'>
      <div className="card w-full lg:w-2/3 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-primary text-2xl font-bold text-center underline">REGISTER</h2>
          <div className="flex flex-col w-full">
          <form onSubmit={handleSubmit(onSubmit)}>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
             {...register("name", {
               required:{
                 value: true,
                 message: "Name is required"
               }
             })}
            type="text" placeholder="Name" className="input input-bordered w-full" />
            <label className="label">
              {errors.name?.type === 'required' && <span className="label-text-alt text-red-500 ">{errors.name.message}</span>}
            </label>
          </div>


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
            type="email" placeholder="Email" className="input input-bordered w-full" />
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

            <input className="btn btn-block hover:bg-primary bg-secondary rounded-lg border-0" type="submit" value="Register" />
          </form>
          <small className='font-bold mt-5 p-0 m-0'>Already Registered? <Link to='/login' className='text-primary pointer-events-auto text-decoration-none ps-2'>Login</Link>  </small>
       

          <div className="divider">OR</div>
          <SocialAuth></SocialAuth>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Register