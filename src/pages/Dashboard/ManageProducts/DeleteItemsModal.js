import axios from 'axios'
import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import auth from '../../../firebase.init'
import Loading from '../../Shared/Loading'

const DeleteItemsModal = (props) => {
    const location = useLocation();
    const {deleteItem,setDeleteItem,refetch,isDeleteLoading}=props
    const handleDelete = () => {
        console.log(deleteItem);
        isDeleteLoading(true);
        const authToken = localStorage.getItem('authToken');
        axios.delete(`https://serene-meadow-57507.herokuapp.com/deleteItem/${deleteItem}`,{
        headers:{authorization: `Bearer ${authToken}`}
      })
      .then(res=>{
        if(res.data.deletedCount===1){
            toast("Order Deleted")
            refetch()
            isDeleteLoading(false);
            setDeleteItem("")
        }
        else{
          isDeleteLoading(false);
        }
      })
      .catch(err=>{
        if(err.response.status ===401 || err.response.status ===403){
          toast("YOU ARE NOT AUTHORIZED!");
          isDeleteLoading(false);
          signOut(auth)
          return <Navigate to="/login" state={{ from: location }} replace />
        }
      })
    }  
return (
  <div>
  <input type="checkbox" id="delete-items-modal" className="modal-toggle" />
 <div className="modal p-5 modal-bottom sm:modal-middle">
     <div className="modal-box bg-accent">
         <h3 className="font-bold text-lg text-center text-red-500">Are you sure you want to delete This Item!</h3>
         <div className="modal-action items-center">
         <button className="btn btn-sm btn-error" onClick={handleDelete}>Delete</button>
             <label htmlFor="delete-items-modal" className="btn btn-sm">Cancel</label>
         </div>
     </div>
 </div>
</div >
  )
}

export default DeleteItemsModal