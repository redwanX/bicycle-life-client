import React from 'react'

import company1 from '../../../Images/companies/1.png'
import company2 from '../../../Images/companies/2.png'
import company3 from '../../../Images/companies/3.png'
import company4 from '../../../Images/companies/4.png'
import company5 from '../../../Images/companies/5.png'
export const TopClients = () => {
  const companies = [company1,company2,company3,company4,company5];
  return (
    <div className='my-12 container mx-auto'>
        <div className='text-4xl pb-5 font-bold text-primary text-center '>OUR TOP CLIENTS</div>
        <hr /> 
    <div className='grid grid-cols-1 gap-2 lg:grid-cols-5'>
    {
        companies.map((company,i)=> <div key={i} className='col flex justify-center items-center'><img className='w-1/2' src={company}></img></div>)
    }
    </div>
    <hr />
</div>
  )
}
