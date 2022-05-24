import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import Order from './Order';
const MyOrder = () => {
  const [user,loading] = useAuthState(auth);
    const [orders ,setOrder] = useState([]);
    const [orderLoading,setOrderloading] = useState(false);
    const location = useLocation();
    useEffect(()=>{
      const authToken =localStorage.getItem('authToken');
      if(user){
            setOrderloading(true);
            const email = user?.user?.email || user?.email;
              axios.get(`http://localhost:5000/order?email=${email}`,{
              headers:{authorization: `Bearer ${authToken}`}
            })
            .then(res=>{
                setOrder(res.data);
                setOrderloading(false);
            })
            .catch(err=>{
              if(err.response.status ===401 || err.response.status ===403){
                toast("YOU ARE NOT AUTHORIZED!");
                signOut(auth)
                return <Navigate to="/login" state={{ from: location }} replace />
              }
            })
           }
        
           
        },
    [user])
    if(loading || orderLoading){
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
        <th>Action</th>
      </tr>
    </thead> 
    <tbody>
        {orders.map((order,i)=><Order key={order._id} index={i} item={order}></Order>)}
    </tbody>
  </table>
</div>

    </div>
  )
}

export default MyOrder