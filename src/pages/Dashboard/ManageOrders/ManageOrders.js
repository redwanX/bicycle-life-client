import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import ChangeOrderModal from './ChangeOrderModal';
import SingleOrder from './SingleOrder';
const ManageOrders = () => {
   const [user,loading] = useAuthState(auth);
   const location = useLocation();
   const [changeOrder,setChangeOrder] = useState('');
    const { data: allOrders, isLoading, refetch } = useQuery(['allOrders',user], () => axios.get(`http://localhost:5000/allorder`,{
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
    
           
      
    if(loading || isLoading){
      return <Loading></Loading>
  }

  return (
    <div className='container mx-auto mb-12'>
    <div className='text-2xl py-5 font-bold text-secondary text-center '>ORDERS</div>
            <hr />    
  <div className="overflow-x-auto">
  <table className="table table-compact w-full">
    <thead>
      <tr>
        <th></th> 
        <th>Image</th> 
        <th>Name</th> 
        <th>Quantity</th> 
        <th>Price/Unit</th> 
        <th>Total Price</th> 
        <th>Transaction ID</th> 
        <th>Action</th>
      </tr>
    </thead> 
    <tbody>
        {Array.isArray(allOrders) && [...allOrders].map((order,i)=><SingleOrder setChangeOrder={setChangeOrder} key={order._id} index={i} item={order}></SingleOrder>)}
    </tbody>
  </table>
  {
    user && changeOrder && <ChangeOrderModal user={user} changeOrder={changeOrder} setChangeOrder={setChangeOrder} refetch={refetch}>
    </ChangeOrderModal>
  }
</div>
    </div>
  )
}

export default ManageOrders