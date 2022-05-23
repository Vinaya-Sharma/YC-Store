import React from 'react'
import { useStateContext } from '../context/stateContext'

const profile = () => {
    const {user} = useStateContext()
    if (!user) return null
  return (
         <div className='h-[80vh] overflow-auto' > 
           <h1 className='lgText font-light text-2xl mb-4 ' >Profile Page</h1>
          <div className='flex w-full ' >
            <img className=' rounded-lg h-80 w-full object-cover flex md:w-2/6'  src={user.img} alt='img'/>
<div className='w-full h-80 mt-10 ml-4' >
            <p >Name: <span className='font-bold'>{user.name}</span></p>
            <p>Email: <span className='font-bold'>{user.email}</span></p>   
</div>
          </div>
        </div>
  )
}

export default profile