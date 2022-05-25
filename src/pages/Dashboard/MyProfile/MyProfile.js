import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import { FaUserEdit } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { Navigate, useLocation } from 'react-router-dom';
import profilePic from '../../../Images/Profile/profile.png'
const MyProfile = () => {
  const [user,loading] = useAuthState(auth);
  const [isEdit,setIsEdit] = useState(true);
  const [loadFetch,setloadFetch] = useState(false);
  const [profile,setProfile] = useState({});
  const location = useLocation()
  useEffect(()=>{
    if(user){
      setloadFetch(true)
    axios.get(`http://localhost:5000/profile/${user?.email||user?.user?.email}`)
    .then(data=>{
      setProfile(data.data)
      setloadFetch(false);
    })
    .catch(err=>{
      setloadFetch(false);
    })
    }
  },[user]);
  


  if(loading ||loadFetch){
    return <Loading></Loading>
  }
  const updateProfile=(event)=>{
    var name = event.target.attributes.getNamedItem('name').value;
    const value =event.target.value;
    setProfile({...profile,[name]:value})
    
  }
  const update=(event)=>{
    event.preventDefault()
    setIsEdit(!isEdit)
    const name= user.name;
    const email= user?.email || user?.user?.email;
    const authToken = localStorage.getItem('authToken');
    const body={name,email,...profile}
      axios.put(`http://localhost:5000/updateProfile`,body,{
        headers:{authorization: `Bearer ${authToken}`}
      })
      .then(res=>{
        toast('Profile Updated!');
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
    <div className='text-2xl py-5 font-bold text-secondary text-center '>PROFILE</div>
      <hr />
  <div className='w-full bg-primary' style={{height:"20vh"}}>
  </div>
  <div className='flex justify-center items-center lg:-mt-20 -mt-10'>
  <div className="avatar flex justify-center">
    <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
      <img style={{height:"100px",width:"100px"}} src={user.photoURL?user.photoURL:profilePic} />
    </div>
  </div>
  </div>
  
  <div className='my-12 flex flex-col justify-center items-center'>
    
    <div className=' text-primary py-4 flex justify-end items-center w-full max-w-xs lg:max-w-2xl'>
      <FaUserEdit onClick={()=>setIsEdit(!isEdit)} className='h-10 w-10'></FaUserEdit>
    </div>

    <div className='w-full max-w-xs lg:max-w-2xl flex flex-col lg:flex-row'>
      <span className='block bg-primary p-4 w-full lg:w-1/4 text-white text-center'>NAME</span>
      <span className='block bg-base-200 p-4 w-full text-center lg:w-3/4'>{user && user?.displayName}</span>
    </div>
    <div className='w-full max-w-xs lg:max-w-2xl flex flex-col lg:flex-row'>
      <span className='block bg-primary p-4 w-full lg:w-1/4 text-white text-center'>EMAIL</span>
      <span className='block bg-base-200 p-4 w-full text-center lg:w-3/4'>{user && (user?.email||user?.user?.email)}</span>
    </div>
    <form onSubmit={update} className='w-full mb-5 max-w-xs lg:max-w-2xl'>
    <div className=" form-control w-full max-w-xs lg:max-w-2xl">
      <label className="label">
        <span className="label-text font-bold text-primary">Education</span>
      </label>
      <textarea disabled ={isEdit} value={profile?.education||""} onChange={updateProfile}  className="textarea textarea-bordered" name="education"  placeholder="education"></textarea>
    </div>
    
    <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary">City</span>
            </label>
            <input disabled ={isEdit} value={profile?.city||""}  onChange={updateProfile} name="city" type="text" placeholder='City'  className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
          </div>
    
    <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary">Phone</span>
            </label>
            <input disabled ={isEdit} value={profile?.phone||""}  onChange={updateProfile} name="phone" type="number" placeholder='Phone Number'  className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
          </div>
    <div className="w-full max-w-xs lg:max-w-2xl">
            <label className="label">
              <span className="label-text font-bold text-primary">LinkdIn</span>
            </label>
            <input disabled ={isEdit} value={profile?.linkedin||""}  onChange={updateProfile} name="linkedin" type="text" placeholder='LinkedIn Profile Link'  className="input input-bordered w-full max-w-xs lg:max-w-2xl" />
          </div>
    {
      isEdit?
        "":
        <button className='btn bg-secondary w-full mt-4' type="submit">Submit</button>
        
    }


    </form>
  </div>

</div>
  )
}

export default MyProfile