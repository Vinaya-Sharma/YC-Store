import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ItemComp from '../components/ItemComp'
import Navbar from '../components/Navbar'
import { Category, CategoryVariant, Item, itemBody } from '../typings'
import FetchCategories from '../utils/FetchCategories'
import FetchQueryItems from '../utils/FetchQueryItems'

interface Props {
    items: Item[] | null,
    categories: CategoryVariant[]
}

const shop = ({items:theItems, categories}:Props) => {
    const [selectedTag, setselectedTag] = useState('Shop All')
    const [tagQuery, settagQuery] = useState('')
    const [filter, setFilter] = useState("_createdAt desc")
    const [items, setItems] = useState(theItems)
    

    const updateTag = (tag:CategoryVariant) => {
        setselectedTag(tag.title)
        settagQuery(tag._id)
    }

    const findItems = async() => {
        const items:Item[] = await FetchQueryItems(tagQuery, filter)
        setItems(items)
    }

    useEffect(() => {
        findItems()
    }, [tagQuery, filter])
    

  return (
    <div className='w-full flex h-full min-h-screen' >
            <div className='h-full min-h-screen w-2/6 md:w-1/6'>
               <div className='fixed' >
               <div className='w-full my-5  ' >
                    <p className='p-1' >Filter:</p>
                <select className='text-sm outline-none underline ' onChange={(e)=>setFilter(e.target.value)} >
                    <option value={'_createdAt desc'}>Newest</option>
                    <option value={'bestSeller == true'}>Best Sellers</option>
                    <option value={'cost asc'}>Price: low to high</option>
                    <option value={'cost desc'}>Price: high to low</option>
                    <option value={'_createdAt asc'}>Last Chance</option>
                </select>
                </div>
                <ul className='h-full p-1 flex flex-col space-y-5'>
                <li className={`${selectedTag=='Shop All' && 'font-bold'} cursor-pointer`} onClick={()=> {updateTag({title: 'Shop All', _id:''})}} >Shop All</li>
                    {
                        categories.map((category) => (
                            <li className={`${selectedTag==category.title && 'font-bold'} cursor-pointer`} onClick={()=> {updateTag(category)}} >{category.title}</li>
                        ))
                    }
                </ul>
               </div>
            </div>
            <div className='w-4/6 md:w-5/6' >
                    <h1 className='w-full justify-center text-center p-4 bg-blue-50 text-ycDblue flex lgTitle'>Welcome To The Shop!</h1>
                    <div className='w-full flex flex-wrap place-content-center space-x-4' >
                        {items?.map((item) => (
                            <Link href={`/products/${item.slug}`}><div className='w-64 mb-20 h-80' >
                                <ItemComp item={item}/></div></Link>
                        ))}
                    </div>
            </div>
        </div>
  )
}

export default shop

export const getServerSideProps = async() => {
    const tag = ''
    const filter = '_createdAt desc'
    const items:itemBody[] = await FetchQueryItems(tag, filter)
    const categories: Category[] = await FetchCategories()
    console.log(categories)
    return ({
        props: {
            items,
            categories
        }
    })
}