import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../../Shared/Loading'
import Review from './Review'

const Reviews = () => {
    const { data:reviews, isLoading } = useQuery('reviews', () => fetch(`http://localhost:5000/review`)
    .then(res => res.json()))
    if(isLoading){
        return <Loading></Loading>
    }
    return (
    <div>
          <div className='my-12 container mx-auto'>
         <div className=' text-4xl pb-5 font-bold text-primary text-center '>REVIEWS</div>
            <hr /> 
        <div className='grid mt-12 grid-cols-1 lg:grid-cols-3 gap-4'>
        {reviews && [...reviews].reverse().map(review =><Review key={review._id} review={review}></Review>)}
        </div>
    </div>
    </div>
  )
}

export default Reviews