import React from 'react'
import Banner from './Banner'
import Parts from './Parts'
import Summary from './Summary'

const Home = () => {
  return (
    <div className='container mx-auto p-4'>
      <Banner></Banner>
      <Summary></Summary>
      <Parts></Parts>
    </div>
  )
}

export default Home