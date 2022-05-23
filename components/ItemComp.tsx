import Link from 'next/link'
import React from 'react'
import {Item} from '../typings'

interface Props {
    item: Item
}

const ItemComp = ({item}: Props) => {
  return (
    <div className='w-full h-full hover:opacity-90 cursor-pointer active:scale-150 transition-all duration-300 ease-in-out mt-10 flex text-center items-center justify-center flex-col'>
       <Link href={`/products/${item.slug.current}`}><img className='min-w-full w-full h-full min-h-full object-cover rounded-lg' src={item.img}/></Link>
    <p className='font-bold flex' >{item.title}</p>
        <p className='flex text-sm font-bold text-ycDblue '>${item.cost}</p>
    </div>
  )
}

export default ItemComp