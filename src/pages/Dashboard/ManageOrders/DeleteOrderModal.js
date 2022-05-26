import axios from 'axios'
import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import auth from '../../../firebase.init'
import Loading from '../../Shared/Loading'

const DeleteOrderModal = (props) => {
    const location = useLocation();
    const {deleteOrder,setDeleteOrder,refetch}=props
    const [deleteLoading,isDeleteLoading] = useState(false);
    const handleDelete = () => {
        isDeleteLoading(true);
        const authToken = localStorage.getItem('authToken');
        axios.delete(`https://serene-meadow-57507.herokuapp.com/order/${deleteOrder}`,{
        headers:{authorization: `Bearer ${authToken}`}
      })
      .then(res=>{
        if(res.data.deletedCount===1){
            toast("Order Deleted")
            refetch()
            isDeleteLoading(false);
            setDeleteOrder("")
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
 if(deleteLoading){
  return <Loading></Loading>
 }
return (
  <div>
  <input type="checkbox" id="delete-order-modal" className="modal-toggle" />
 <div className="modal p-5 modal-bottom sm:modal-middle">
     <div className="modal-box bg-accent">
         <h3 className="font-bold text-lg text-center text-red-500">Are you sure you want to delete This Order!</h3>
         <div className="modal-action items-center">
         <button className="btn btn-sm btn-error" onClick={handleDelete}>Delete</button>
             <label htmlFor="delete-order-modal" className="btn btn-sm">Cancel</label>
         </div>
     </div>
 </div>
</div >
  )
}

export default DeleteOrderModal