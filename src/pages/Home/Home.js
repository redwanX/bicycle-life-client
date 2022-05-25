import React from 'react'
import Banner from './Banner/Banner'
import Parts from './Parts/Parts'
import Summary from './Summary/Summary'
import Reviews from './Reviews/Reviews'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className='container mx-auto p-4'>
        <Summary></Summary>
        <Parts></Parts>
        <Reviews></Reviews>
      </div>
    </div>
  )
}

export default Home