import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../../Shared/Loading'
import Part from './Part'

const Parts = () => {
  const { data: parts, isLoading } = useQuery(['parts'], () => fetch(`http://localhost:5000/allparts`)
  .then(res => res.json()))
  
  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div id="parts" className='my-12 container mx-auto'>
            <div className='text-4xl pb-5 font-bold text-primary text-center '>PARTS</div>
            <hr /> 
            <div className='pt-5 grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {parts&&[...parts]?.reverse().slice(0,6)?.map((part)=><Part key={part._id} part={part}></Part>)}
            </div>
    </div>
  )
}

export default Parts