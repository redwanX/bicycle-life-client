import { signOut } from 'firebase/auth';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom'
import auth from '../../firebase.init';
import { CgSidebar } from "react-icons/cg";

const Header = () => {
    const [user,loading] = useAuthState(auth);
    const location =useLocation();
    const logOut=()=>{
        localStorage.removeItem('authToken')
        sessionStorage.removeItem('name')
        signOut(auth);
    }
    const menuItems = <>
    {user?
     <div className='my-auto font-bold text-primary'><span className='font-bold'>Hello {user.displayName || user?.user?.displayName || 
        sessionStorage.getItem("name")}!</span></div>
    :""}
    <li className='font-bold'><Link to="/">Home</Link></li>
    <li className='font-bold'><Link to="/blog">Blog</Link></li>
    {user?
    <>
    <li className='font-bold'><Link to="/dashboard">Dashboard</Link></li>
    <li className='font-bold'><button className='font-bold' onClick={logOut}>Logout</button></li>
    </>
    :
    <>
    <li className='font-bold'><Link to="/login">Login</Link></li>
    </>
    }
</>
  return (
<div className="navbar bg-base-100 shadow sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <a className="text-xl font-bold text-primary">BICYCLE LIFE</a>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            {
                location.pathname.includes('dashboard')?
                
            <div className="navbar-end lg:hidden">
            <label tabIndex="1" htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
                <CgSidebar className='w-5 h-5'></CgSidebar>
            </label>
            </div>
            :""
            }
        </div>
  )
}

export default Header