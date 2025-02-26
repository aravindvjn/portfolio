import React from 'react'
import me from '@/assets/me.png'
import Image from 'next/image'

const Photo = () => {
  return (
    <div className='w-[100px] sm:min-w-[150px] md:min-w-[200px] lg:min-w-[250px]'>
      <Image src={me} alt="Aravind Vijayan's profile picture"  />
    </div>
  )
}

export default Photo
