import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, Outlet } from 'react-router-dom'
import auth from '../../firebase.init'
import useAdmin from '../../Hooks/useAdmin'
import Loading from '../Shared/Loading'

const Dashboard = () => {
  const [user,loading] = useAuthState(auth)
  const [admin,adminLoading] = useAdmin(user)
  if(loading||adminLoading){
    return <Loading></Loading>
  }
  return (
    <div>
      <div className="drawer drawer-mobile">
  <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    <Outlet></Outlet>
  </div> 
  <div className="drawer-side">
    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
    <ul className="menu p-4 overflow-y-auto w-full max-w-xs lg:w-80 bg-accent text-white">
      {
        !admin?
        <>
        <Link className='btn bg-secondary border-0 mb-2' to='/dashboard/'>My Profile</Link>
        <Link className='btn bg-secondary border-0 mb-2' to='/dashboard/order'>My Orders</Link>
        <Link className='btn bg-secondary border-0 mb-2' to='/dashboard/review'>Review</Link>  
        </>:
        <>
        <Link className='btn bg-secondary border-0 mb-2' to='/dashboard/'>My Profile</Link>  
        <Link className='btn bg-secondary border-0 mb-2' to='/dashboard/makeAdmin'>Make Admin</Link>
        <Link className='btn bg-secondary border-0 mb-2' to='/dashboard/addProduct'>Add Product</Link>
        <Link className='btn bg-secondary border-0 mb-2' to='/dashboard/manageProducts'>Manage Products</Link>
        </>

      }
    </ul>
  
  </div>
</div>

    </div>
  )
}

export default Dashboard