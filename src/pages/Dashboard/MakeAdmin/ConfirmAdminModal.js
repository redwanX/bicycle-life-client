import axios from 'axios'
import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import auth from '../../../firebase.init'
import Loading from '../../Shared/Loading'

const ConfirmAdminModal = (props) => {
    const location = useLocation();
    const {toAdmin,setToAdmin,refetch,isAdminLoading}=props
    const confirmAdmin = () => {
        isAdminLoading(true);
        const authToken = localStorage.getItem('authToken');
        axios.put(`https://serene-meadow-57507.herokuapp.com/user/admin/${toAdmin}`,{toAdmin},{
        headers:{authorization: `Bearer ${authToken}`}
      })
      .then(res=>{
            console.log(res);
            toast("ADMIN CREATED")
            refetch()
            isAdminLoading(false);
            setToAdmin("")
       
      })
      .catch(err=>{
        if(err.response.status ===401 || err.response.status ===403){
          toast("YOU ARE NOT AUTHORIZED!");
          isAdminLoading(false);
          signOut(auth)
          return <Navigate to="/login" state={{ from: location }} replace />
        }
      })
    }  
return (
    <div>
     <input type="checkbox" id="admin-confirm-modal" className="modal-toggle" />
    <div className="modal p-5 modal-bottom sm:modal-middle">
        <div className="modal-box bg-accent">
            <h3 className="font-bold text-lg text-center text-primary">Are you sure?</h3>
            <div className="modal-action items-center">
            <button className="btn btn-sm bg-primary border-0" onClick={confirmAdmin}>Yes</button>
                <label htmlFor="admin-confirm-modal" className="btn btn-sm">No</label>
            </div>
        </div>
    </div>
</div >
  )
}

export default ConfirmAdminModal