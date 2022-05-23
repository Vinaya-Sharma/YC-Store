import React, {useState} from 'react'
import {ArrowLeftIcon, HeartIcon, MenuAlt1Icon, MenuIcon, SearchIcon, ShoppingBagIcon} from '@heroicons/react/outline'
import Link from 'next/link'
import Cart from './Cart'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useStateContext } from '../context/stateContext'

const Navbar = () => {
  const {data: session} = useSession()
  const {user} = useStateContext()
  const [nav, setNav] = useState(false)
  const [cart, setCart] = useState(false)
  return (
    <div className='flex mb-12'>
      <div className='mr-auto' >
        <h1 className='text-5xl font-bold text-ycDblue' ><span className='text-ycLblue' >Y</span>C.</h1>
      </div>
      <div>
        <ul className='hidden md:flex space-x-10 font-semibold ml-auto mr-auto justify-center h-full place-items-center ' >
          <li><Link href={'/'}>Home</Link></li>
          <li><Link href={'/shop'}>Shop</Link></li>
          <li><Link href={'/blog'}>Blog</Link></li>
          <li><Link href={'/history'}>History</Link></li>
          <li><Link href={'/profile'}>My Profile</Link></li>
        </ul>
      </div>
      <div className='ml-auto' >
        <ul className='font-bold flex space-x-4 justify-center h-full place-items-center ' >
          <li className='hover:cursor-pointer'><Link href={'/shop'}><div><SearchIcon className='w-5 h-5 hover:cursor-pointer'/></div></Link></li>
          <li onClick={()=> setCart(true)} className='hover:cursor-pointer'><ShoppingBagIcon className='w-5 h-5 hover:cursor-pointer ' /></li>
          <li className='hover:cursor-pointer'><HeartIcon className='w-5 h-5 hover:cursor-pointer '/></li>
         <button onClick={() => {user.name!=''? signOut(): signIn() }}  className='mainBtn'>{user.name!=''? 'Sign Out': 'Login'}</button>
         <li onClick={() => setNav(true)}  className='flex md:hidden hover:cursor-pointer ' > <MenuIcon className='w-9 h-9 p-1 mainBtn ' /></li>
        </ul>
      </div>
      {
        nav && 
        <div className='md:hidden fixed transition-all delay-500 ease-in-out top-0 right-0 h-full min-h-screen w-96 bg-ycDblue z-10' >
        <ul className='flex-col relative text-white flex space-y-2 w-full font-semibold ml-auto mr-auto justify-center h-full place-items-center ' >
          <ArrowLeftIcon onClick={() => setNav(false)} className='w-6 absolute top-5 left-5 h-6'/>
          <li><Link href={'/'}>Home</Link></li>
          <li><Link href={'/shop'}>Shop</Link></li>
          <li><Link href={'/blog'}>Blog</Link></li>
          <li><Link href={'/history'}>History</Link></li>
        </ul>
        </div>
      }
      {
        cart && 
        <Cart setCart={setCart} />
      }
    </div>
  )
}

export default Navbar