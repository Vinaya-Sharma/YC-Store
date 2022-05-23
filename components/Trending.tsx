import Link from 'next/link'
import React from 'react'
import { Item } from '../typings'
import ItemComp from './ItemComp'

interface Props{
  items: Item[]
}

const Trending = ({items}:Props) => {
  return (
    <div className='mt-10'>
      <div className=' w-full text-center'>
      <h1 className='lgTitle text-3xl underline text-ycDblue'>Newly Added!</h1>
      </div>
      <div className='flex scrollbar-hide max-w-7xl flex-wrap place-content-center overflow-auto space-x-5' >
      {
              items.map((item) => {
              return (
                <Link href={`/products/${item.slug}`} ><div className='w-44 mb-20 h-64 ' >
                  <ItemComp item={item} /></div></Link>
              )}
            )
            }
      </div>
    </div>
  )
}

export default Trending