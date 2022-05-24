import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <div className="drawer drawer-mobile">
  <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    <Outlet></Outlet>
  </div> 
  <div className="drawer-side">
    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
    <ul className="menu p-4 overflow-y-auto w-full max-w-xs lg:w-80 bg-secondary text-white">
      
      <Link className='btn bg-primary mb-2' to='/dashboard'>My Orders</Link>
      <Link className='btn mb-2' to='/dashboard/review'>Review</Link>
      <Link className='btn mb-2' to='/dashboard/profile'>My Profile</Link>
    </ul>
  
  </div>
</div>

    </div>
  )
}

export default Dashboard