import React, { useEffect } from 'react'

import profilePic from '../../Images/Profile/myPro.jpg'
import project1 from '../../Images/portfolio/S-1.png'
import project2 from '../../Images/portfolio/S-2.png'
import project3 from '../../Images/portfolio/S-3.png'
const Portfolio = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div style={{minHeight: 'calc(100vh - 64px - 100px)'}} className='container mx-auto'> 
    <div className='text-2xl py-5 font-bold text-secondary text-center '>MY PORTFOLIO</div>
      <hr />
  <div className='w-full bg-primary' style={{height:"20vh"}}>
  </div>
  <div className='flex justify-center items-center lg:-mt-20 -mt-10'>
  <div className="avatar flex justify-center">
    <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
      <img style={{height:"100px",width:"100px"}} src={profilePic} />
    </div>
  </div>
  </div>
  
  <div className='my-12 flex flex-col justify-center items-center'>
    <div className='w-full max-w-xs lg:max-w-6xl flex flex-col lg:flex-row'>
      <span className='block bg-primary p-4 w-full lg:w-1/4 text-white text-center'>NAME</span>
      <span className='block bg-accent p-4 w-full lg:text-left text-center lg:w-3/4  lg:text-xl text-md font-bold text-primary'>MD. REDWAN AHMED</span>
    </div>
    <div className='w-full max-w-xs lg:max-w-6xl flex flex-col lg:flex-row'>
      <span className='block bg-primary p-4 w-full lg:w-1/4 text-white text-center'>EMAIL</span>
      <span className='block bg-accent p-4 w-full lg:text-left text-center lg:w-3/4   lg:text-xl text-md font-bold text-primary'>redwan.ahmed.1298@gmail.com</span>
    </div>
    
    <div className='w-full max-w-xs lg:max-w-6xl flex flex-col lg:flex-row'>
      <span className='block bg-primary p-4 w-full lg:w-1/4 text-white text-center'>EDUCATION BACKGROUND</span>
      <span className='block bg-accent p-4 w-full lg:text-left text-center lg:w-3/4   lg:text-xl text-md font-bold text-primary'>B.Sc in Computer Science and Engineering,National University</span>
    </div>
    <div className='w-full mt-5 bg-accent max-w-xs lg:max-w-6xl'>
        <div className='block bg-primary p-4 w-fulltext-white text-center font-bold text-accent'>SKILLS</div>
        <div className='flex flex-col' >
        <div className='flex p-5 justify-center' >
            <span className='text-xs w-1/4 leading-none text-primary te font-bold mx-4'>JAVASCRIPT</span>
            <progress className=" p-0 m-0 w-2/4 progress progress-info " value="80" max="100"></progress>
        </div>
        
        <div className='flex p-5 justify-center' >
            <span className='text-xs w-1/4 leading-none text-primary te font-bold mx-4'>REACT JS</span>
            <progress className=" p-0 m-0 w-2/4 progress progress-info " value="70" max="100"></progress>
        </div>
        
        <div className='flex p-5 justify-center' >
            <span className='text-xs w-1/4 leading-none text-primary te font-bold mx-4'>NODE JS</span>
            <progress className=" p-0 m-0 w-2/4 progress progress-info " value="60" max="100"></progress>
        </div>

        
        <div className='flex p-5 justify-center' >
            <span className='text-xs w-1/4 leading-none text-primary te font-bold mx-4'>MONGO DB</span>
            <progress className=" p-0 m-0 w-2/4 progress progress-info " value="70" max="100"></progress>
        </div>
        
        <div className='flex p-5 justify-center' >
            <span className='text-xs w-1/4 leading-none text-primary te font-bold mx-4'>HTML/CSS</span>
            <progress className=" p-0 m-0 w-2/4 progress progress-info " value="90" max="100"></progress>
        </div>
        </div>
    </div>



    <div className='w-full mt-5 bg-accent max-w-xs lg:max-w-6xl'>
        <div className='block bg-primary p-4 w-fulltext-white text-center font-bold text-accent'>PROJECTS</div>
        <div className='grid grid-cols-1 gap-2 mt-5 lg:grid-cols-3'>
        <div className="card w-full bg-base-100 shadow-xl">
        <figure><img src={project1} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                BEATS REVIEW
                </h2>
                <p>This is a product review website</p>
                <div className="card-actions justify-end">
                <div className="badge badge-outline">REACT JS</div> 
                <div className="badge badge-outline">TAILWIND</div>
                </div>
                <div className="card-actions justify-end">
                <a href="https://beats-solo-3.netlify.app/"  target="_blank"  className="btn btn-xs bg-primary w-full border-0">Live Website</a>
                </div>
            </div>
            </div>

            <div className="card w-full bg-base-100 shadow-xl">
        <figure><img src={project2} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                TRAVEL GUIDE
                </h2>
                <p>This website is for a single tour guide</p>
                <div className="card-actions justify-end">
                <div className="badge badge-outline">REACT JS</div> 
                <div className="badge badge-outline">FIREBASE</div>
                </div>
                <div className="card-actions justify-end">
                <a href="https://travel-guide-dfd47.web.app/"  target="_blank"  className="btn btn-xs bg-primary w-full border-0">Live Website</a>
                </div>
            </div>
            </div>


            <div className="card w-full bg-base-100 shadow-xl">
        <figure><img src={project3} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">INVENTORY
                </h2>
                <p>This is Furniture a product Inventory</p>
                <div className="card-actions justify-end">
                <div className="badge badge-outline">REACT JS</div> 
                <div className="badge badge-outline">NODE JS</div>
                </div>
                <div className="card-actions justify-end">
                <a href="https://furniture-house-d2811.web.app/"  target="_blank"  className="btn btn-xs bg-primary w-full border-0">Live Website</a>

                </div>
            </div>
            </div>


        </div>
    </div>

  </div>
  
  

</div>
  )
}

export default Portfolio