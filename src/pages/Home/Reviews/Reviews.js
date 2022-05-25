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
          <div className='mt-12 container mx-auto'>
         <div className=' text-4xl pb-5 font-bold text-primary text-center '>SUMMARY</div>
            <hr /> 
        {reviews && reviews.map(review =><Review review={review}></Review>)}
    </div>
    </div>
  )
}

export default Reviews