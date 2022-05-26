import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import ConfirmAdminModal from './ConfirmAdminModal';
import User from './User';

const MakeAdmin = () => {
    const [toAdmin,setToAdmin] = useState('');
    const location = useLocation();
     const { data: users, isLoading, refetch } = useQuery('users', () => axios.get(`https://serene-meadow-57507.herokuapp.com/users`,{
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
     
     if(isLoading){
       return <Loading></Loading>
   }
 
   return (
     <div className='container mx-auto'>
     <div className='text-2xl py-5 font-bold text-secondary text-center '>MAKE ADMIN</div>
             <hr />    
   <div className="overflow-x-auto">
   <table className="table table-compact w-full">
     <thead>
       <tr>
         <th></th> 
         <th>EMAIL</th>  
         <th>ROLE</th>
         <th>ACTION</th>
       </tr>
     </thead> 
     <tbody>
         {Array.isArray(users) && users.reverse().map((user,i)=><User setToAdmin={setToAdmin} key={user._id} index={i} user={user}></User>)}
     </tbody>
   </table>
   {
     toAdmin && <ConfirmAdminModal toAdmin={toAdmin} setToAdmin={setToAdmin} refetch={refetch}>
     </ConfirmAdminModal>
   }
 </div>
     </div>
   )

}

export default MakeAdmin