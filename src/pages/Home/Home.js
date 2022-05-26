import React, { useEffect } from 'react'
import Banner from './Banner/Banner'
import Parts from './Parts/Parts'
import Summary from './Summary/Summary'
import Reviews from './Reviews/Reviews'
import { TopClients } from './TopClients/TopClients'
import Certificates from './Certificates/Certificates'
import Quotation from './Quotation/Quotation'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div>
      <Banner></Banner>
      <div className='container mx-auto p-4'>
        <Summary></Summary>
        <TopClients></TopClients>
        <Parts></Parts>
        <Reviews></Reviews>
        <Certificates></Certificates>
        <Quotation></Quotation>
      </div>
    </div>
  )
}

export default Home