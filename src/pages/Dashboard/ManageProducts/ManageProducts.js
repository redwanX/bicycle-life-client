import axios from 'axios';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import DeleteItemsModal from './DeleteItemsModal';
import Items from './Items';

const ManageProducts = () => {
    const [user,loading] = useAuthState(auth);
    const [deleteItem,setDeleteItem] = useState('');
     const { data: items, isLoading, refetch } = useQuery(['items',user], () => axios.get(`http://localhost:5000/allparts`)
     .then(res=>{
         return res.data
     })
     .catch(err=>{
       toast("SOMETHING WENT WRONG")
     }));
     
            
       
     if(loading || isLoading){
       return <Loading></Loading>
   }
 
   return (
     <div className='container mx-auto'>
     <div className='text-2xl py-5 font-bold text-secondary text-center '>MANAGE PRODUCTS</div>
     <hr />    
   <div className="overflow-x-auto">
   <table className="table table-compact w-full">
     <thead>
       <tr>
         <th></th> 
         <th>Image</th> 
         <th>Name</th> 
         <th>Minimum Order</th> 
         <th>Available Quantity</th> 
         <th>Price/Unit</th>  
         <th>Action</th>
       </tr>
     </thead> 
     <tbody>
         {Array.isArray(items) && [...items].reverse().map((item,i)=><Items setDeleteItem={setDeleteItem} key={item._id} index={i} item={item}></Items>)}
     </tbody>
   </table>
   {
     deleteItem && <DeleteItemsModal deleteItem={deleteItem} setDeleteItem={setDeleteItem} refetch={refetch}>
     </DeleteItemsModal>
   }
 </div>
     </div>
   )
}

export default ManageProducts