import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import DeleteModal from './DeleteModal';
import Order from './Order';
const MyOrder = () => {
   const [user,loading] = useAuthState(auth);
   const location = useLocation();
   const [deleteLoading,isDeleteLoading] = useState(false);
   const [deleteOrder,setDeleteOrder] = useState('');
    const { data: orders, isLoading, refetch } = useQuery(['orders',user], () => axios.get(`https://serene-meadow-57507.herokuapp.com/order?email=${user?.user?.email || user?.email}`,{
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
    
           
      
    if(loading || isLoading || deleteLoading){
      return <Loading></Loading>
  }

  return (
    <div className='container mx-auto'>
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
        <th>Status</th>
      </tr>
    </thead> 
    <tbody>
        {Array.isArray(orders) && [...orders].reverse().map((order,i)=><Order setDeleteOrder={setDeleteOrder} key={order._id} index={i} item={order}></Order>)}
    </tbody>
  </table>
  {
    deleteOrder && <DeleteModal isDeleteLoading={isDeleteLoading} deleteOrder={deleteOrder} setDeleteOrder={setDeleteOrder} refetch={refetch}>
    </DeleteModal>
  }
</div>
    </div>
  )
}

export default MyOrder