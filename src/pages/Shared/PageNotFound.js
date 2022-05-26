import React from 'react'
import notFound from '../../Images/pageNotFound/404.png'
const PageNotFound = () => {
  return (
      <div className='container mx-auto '>
          
    <div className='flex flex-col items-center justify-center' style={{minHeight: 'calc(100vh - 64px - 100px)'}}>
            <img className='w-50' src={notFound} alt="" />
            <h4 className='text-primary pt-3'>PAGE NOT FOUND</h4>
    </div>
      </div>
  )
}

export default PageNotFound
