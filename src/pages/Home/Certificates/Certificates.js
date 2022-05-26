import React from 'react'
import certificate3 from '../../../Images/cirtificates/c-3.png'
const Certificates = () => {
  return (
    <div className='container mx-auto'>
      <div className=' text-4xl pb-5 font-bold text-primary text-center '>WHY YOU CHOOSE US</div>
            <hr /> 
        <div className='my-12 w-full flex flex-col lg:flex-row'>
                <div className='flex-1 flex justify-center items-center'>
                <div className="card w-full bg-base-100 ">
                <div className="card-body">
                    <h2 className="card-title text-xl lg:text-4xl font-bold text-primary">We Are Certified!</h2>
                    <p className='font-bold text-justify lg:text-lg text-xs'>
                        Many International Organization recognized us for manufecturing best and authentic bicycle parts We earnd peoples trust and satisfiction from the very early, you can trust us without any hassitation like these companies do                    </p>
                </div>
                <div className="card-body">
                    <h2 className="card-title text-xl lg:text-4xl font-bold text-primary">We Give Gurantee!</h2>
                    <p className='font-bold text-justify lg:text-lg text-xs'>
                    We give you Gurantee that each and every produt will be alright , we dont provide defeted products. You can change any parts if you found any defect 
                    </p>
                </div>
                <div className="card-body">
                    <h2 className="card-title text-xl lg:text-4xl font-bold text-primary">We Are Cost Effecient!</h2>
                    <p className='font-bold text-justify lg:text-lg text-xs'>
                        We provide best quality with a cheap price . we optimized our production thats why that we can produce more products, so that we can provide you more products at cheap rate
                    </p>
                </div>
                
                </div>
                </div>
                <div className='flex-1'>
                    <div className='w-full'>
                        
                <img src={certificate3} className="rounded-lg shadow-2xl" alt="" />
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Certificates