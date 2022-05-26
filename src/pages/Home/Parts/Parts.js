import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useQuery } from 'react-query'
import auth from '../../../firebase.init'
import useAdmin from '../../../Hooks/useAdmin'
import Loading from '../../Shared/Loading'
import Part from './Part'

const Parts = () => {
  const [user,loading] =useAuthState(auth);
  const [admin,adminLoading] =useAdmin(user);
  const { data: parts, isLoading } = useQuery(['parts',user], () => fetch(`https://serene-meadow-57507.herokuapp.com/allparts`)
  .then(res => res.json()))
  
  if(isLoading ||loading || adminLoading){
    return <Loading></Loading>
  }

  return (
    <div id="parts" className='my-12 container mx-auto'>
            <div className='text-4xl pb-5 font-bold text-primary text-center '>PARTS</div>
            <hr /> 
            <div className='pt-5 grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {parts&&[...parts]?.reverse().slice(0,6)?.map((part)=><Part key={part._id} user={user} admin={admin} part={part}></Part>)}
            </div>
    </div>
  )
}

export default Parts