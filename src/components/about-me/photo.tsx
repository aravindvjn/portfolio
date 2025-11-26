import React from 'react'

const Photo = () => {
  return (
    <div className='w-[100px] sm:min-w-[150px] md:min-w-[200px] lg:min-w-[250px]'>
      <img src='/image.png' loading='eager' alt="Aravind Vijayan's profile picture"  />
    </div>
  )
}

export default Photo
