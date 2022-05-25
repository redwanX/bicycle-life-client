import axios from 'axios'
import { signOut } from 'firebase/auth'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import auth from '../../../firebase.init'

const DeleteModal = (props) => {
    const location = useLocation();
    const {deleteOrder,setDeleteOrder,refetch}=props
    const handleDelete = () => {
        const authToken = localStorage.getItem('authToken');
        axios.delete(`http://localhost:5000/order/${deleteOrder}`,{
        headers:{authorization: `Bearer ${authToken}`}
      })
      .then(res=>{
        if(res.data.deletedCount===1){
            toast("Order Deleted")
            refetch()
            setDeleteOrder("")
        }
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
    <div>
    <input type="checkbox" id="delete-modal" className="modal-toggle" />
    <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg text-red-500">Are you sure you want to delete This Order!</h3>
            <div className="modal-action">
            <button className="btn btn-xs btn-error" onClick={handleDelete}>Delete</button>
                <label htmlFor="delete-modal" className="btn btn-xs">Cancel</label>
            </div>
        </div>
    </div>
</div >
  )
}

export default DeleteModal