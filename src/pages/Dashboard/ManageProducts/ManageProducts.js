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
    const [deleteLoading,isDeleteLoading] = useState(false);
     const { data: items, isLoading, refetch } = useQuery(['items',user], () => axios.get(`https://serene-meadow-57507.herokuapp.com/allparts`)
     .then(res=>{
         return res.data
     })
     .catch(err=>{
       toast("SOMETHING WENT WRONG")
     }));
     
            
       
     if(loading || isLoading || deleteLoading){
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
     deleteItem && <DeleteItemsModal isDeleteLoading={isDeleteLoading} deleteItem={deleteItem} setDeleteItem={setDeleteItem} refetch={refetch}>
     </DeleteItemsModal>
   }
 </div>
     </div>
   )
}

export default ManageProducts