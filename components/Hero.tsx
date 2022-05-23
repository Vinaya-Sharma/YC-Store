import Link from 'next/link'
import React from 'react'
import { urlFor } from '../sanity'
import { feature } from '../typings'

interface Props {
  feature:feature
}

const Hero = ({feature}:Props) => {
  return (
    <div className='bg-blue-200 rounded-lg h-full flex relative' >
        <img className='w-full h-full object-top object-cover rounded-lg' src={feature.img } />
        <div className='w-full h-full absolute  top-0 left-0 bg-black/25  '></div>
      <div className='absolute text-white  top-0 bottom-0 h-80 right-5 text-right md:right-20 justify-center flex flex-col ' >
        <h1 className='lgTitle' ><span className='block' >{feature.title1}</span>{feature.title2}</h1>
      <Link href={'/shop'} ><button className='shopBtn border-white ml-auto mt-5'>{feature.btn}</button></Link>
        <p>{feature.desc}</p>
      </div>
    </div>
  )
}

export default Hero