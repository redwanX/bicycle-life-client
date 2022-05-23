import React from 'react'
import { useQuery } from 'react-query'

import Loading from '../Shared/Loading'
import Part from './Part'

const Parts = () => {
  const { data: parts, isLoading } = useQuery(['parts'], () => fetch(`parts.json`)
  .then(res => res.json()))
  
  if(isLoading){
    return <Loading></Loading>
  }
  return (
    <div className='mt-12 container mx-auto'>
            <div className='text-4xl pb-5 font-bold text-primary text-center '>PARTS</div>
            <hr /> 
            <div className='pt-5 grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {parts?.map((part,i)=><Part key={i} part={part}></Part>)}
            </div>
    </div>
  )
}

export default Parts