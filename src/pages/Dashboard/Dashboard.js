import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <div className="drawer drawer-mobile">
  <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
   
  </div> 
  <div className="drawer-side">
    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
      <Link to='/review'>Review</Link>
      <Link to='/myorders'>My Orders</Link>
      <Link to='/profile'>My Profile</Link>
    </ul>
  
  </div>
</div>

    </div>
  )
}

export default Dashboard