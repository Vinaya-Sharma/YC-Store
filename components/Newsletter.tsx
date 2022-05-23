import { SupportIcon, TruckIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { AiOutlineMoneyCollect } from 'react-icons/ai'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  return (
    <div className='w-full text-center items-center justify-center' >
      <h1 className='lgTitle text-4xl text-ycDblue w-full mt-10 underline mb-5 '>Newsletter</h1>
      <p>Sign up to stay informed on our newest products and latest updates</p>
      <form className='mt-10'>
        <input value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='email' type={'text'} className='w-64 px-4 h-12 py-2 outline-none border-ycDblue border-2' />
        <input type={'submit'}  className='w-36 text-white px-4 py-2 h-12 bg-ycDblue' />
      </form>
      <div className='w-full  mb-10 mt-20 flex h-32 rounded-full border-2 border-ycDblue items-center justify-evenly '>
        <div className='flex flex-col md:flex-row ' >
          <TruckIcon className='w-[50px] mr-2 h-[50px] p-2 place-self-center rounded-full bg-white shadow-lg' />
          <div>
          <p className='font-bold text-left' >Free shipping</p>
          <p className='text-sm text-left'>on orders over 30</p>
          </div>
        </div>
        <div className='flex flex-col md:flex-row ' >
          <AiOutlineMoneyCollect className='w-[50px] mr-2 h-[50px] p-2 place-self-center  rounded-full bg-white shadow-lg' />
          <div>
          <p className='font-bold text-left' >Easy payments</p>
          <p className='text-sm text-left'>100% secure payments</p>
          </div>
        </div>
        <div className='flex flex-col md:flex-row ' >
          <SupportIcon className='w-[50px] mr-2 h-[50px] p-2 rounded-full place-self-center  bg-white shadow-lg' />
          <div>
          <p className='font-bold text-left' >24/7 Support</p>
          <p className='text-sm text-left'>Call or email us</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newsletter