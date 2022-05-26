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
import DeleteOrderModal from './DeleteOrderModal';
import SingleOrder from './SingleOrder';
const ManageOrders = () => {
   const [user,loading] = useAuthState(auth);
   const location = useLocation();
   const [deleteLoading,isDeleteLoading] = useState(false);
   const [changeLoading,isChangeLoading] = useState(false);
   const [changeOrder,setChangeOrder] = useState('');
   const [deleteOrder,setDeleteOrder] = useState('');
    const { data: allOrders, isLoading, refetch } = useQuery(['allOrders',user], () => axios.get(`https://serene-meadow-57507.herokuapp.com/allorder`,{
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
    
           
      
    if(loading || isLoading ||deleteLoading || changeLoading){
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
        <th>Total Price</th> 
        <th>Transaction ID</th> 
        <th>Status</th> 
        <th>Action</th>
      </tr>
    </thead> 
    <tbody>
        {Array.isArray(allOrders) &&allOrders.map((order,i)=><SingleOrder setDeleteOrder={setDeleteOrder} setChangeOrder={setChangeOrder} key={order._id} index={i} item={order}></SingleOrder>)}
    </tbody>
  </table>
  {
    user && changeOrder && <ChangeOrderModal isChangeLoading={isChangeLoading} user={user} changeOrder={changeOrder} setChangeOrder={setChangeOrder} refetch={refetch}>
    </ChangeOrderModal>
  }
  
  {
    user && deleteOrder && <DeleteOrderModal isDeleteLoading={isDeleteLoading} user={user} deleteOrder={deleteOrder} setDeleteOrder={setDeleteOrder} refetch={refetch}>
    </DeleteOrderModal>
  }
</div>
    </div>
  )
}

export default ManageOrders