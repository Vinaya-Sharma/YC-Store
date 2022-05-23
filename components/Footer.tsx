import React from 'react'
import {AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='w-full h-[180px] bg-ycDblue items-center justify-between px-2 md:px-10  flex' >
        <h1 className='text-white text-4xl font-bold w-1/6' >YC.</h1>
        <div className='text-white text-center w-2/6'>
            <p className='font-bold' >Our Company</p>
            <ul>
                <li>about</li>
                <li>team</li>
                <li>values</li>
                <li>promises</li>
            </ul>
        </div>
        <div className='text-white w-2/6 text-center '>
            <p className='font-bold' >Contact</p>
            <ul>
                <li>email</li>
                <li>message</li>
                <li>form</li>
            </ul>
        </div>
        <div className='text-white place-items-center text-center w-1/6 '>
                <div className='flex space-x-2 w-full place-items-cemter items-center' >
                <AiOutlineInstagram className='w-6 h-6' />
                <AiOutlineFacebook className='w-6 h-6'/>
                <AiOutlineTwitter className='w-6 h-6'/>
                </div>
        </div>
    </div>
  )
}

export default Footer