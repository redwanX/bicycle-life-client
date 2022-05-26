import axios from 'axios'
import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import auth from '../../../firebase.init'
import Loading from '../../Shared/Loading'

const ChangeOrderModal = (props) => {
    const location = useLocation();
    const {changeOrder,setChangeOrder,isChangeLoading,refetch}=props
    const {user} = props
    const handleDelete = () => {
        isChangeLoading(true);
        const authToken = localStorage.getItem('authToken');
        const body = {
            email:user.email || user?.email?.email,
            status:"approved"
        }
        axios.put(`https://serene-meadow-57507.herokuapp.com/updateOrder/${changeOrder._id}`,body,{
            headers:{authorization: `Bearer ${authToken}`}
          })
          .then(res=>{
            toast('ORDER SHIPPED SUCCESSFULL!');
            refetch();
            setChangeOrder("")
            isChangeLoading(false);
          })
          .catch(err=>{
            if(err.response.status ===401 || err.response.status ===403){
              toast("YOU ARE NOT AUTHORIZED!");
              isChangeLoading(false);
              signOut(auth)
              return <Navigate to="/login" state={{ from: location }} replace />
            }
          })
    }  
return (
  <div>
  <input type="checkbox" id="change-order-modal" className="modal-toggle" />
 <div className="modal p-5 modal-bottom sm:modal-middle">
     <div className="modal-box bg-accent">
         <h3 className="font-bold text-lg text-center text-primary">Are you sure you want to Ship This Order!</h3>
         <div className="modal-action items-center">
         <button className="btn btn-sm border-0 bg-primary" onClick={handleDelete}>SHIP</button>
             <label htmlFor="change-order-modal" className="btn btn-sm">Cancel</label>
         </div>
     </div>
 </div>
</div >
  )
}

export default ChangeOrderModal