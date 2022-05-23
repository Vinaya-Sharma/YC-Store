
import React, { useEffect, useState } from 'react'
import { client } from '../../sanity'
import { CategoryVariant, Item, itemBody, orderItem, sizeVarient } from '../../typings'
import FetchProductCategories from '../../utils/FetchProductCategories'
import FetchSizes from '../../utils/FetchSizes'
import {useSession} from 'next-auth/react'
import toast from 'react-hot-toast'
import { useStateContext } from '../../context/stateContext'

interface Props {
  product: Item
}

const productPage = ({product}: Props) => {

  const {data:session} = useSession()
  const {addToOrder, user} = useStateContext()
  const [sizes, setSizes] = useState<sizeVarient[] | null>([])
  const [selectedSize, setSelectedSize] = useState<sizeVarient | null>()
  const [quantity, setQuantity] = useState(1)
  const [categories, setCategories] = useState<CategoryVariant[] | null>([])

  const getSizes = async() => {
    let theSizes = []
    for (let i =0; i < product.size.length; i++){
      theSizes.push(product.size[i]._ref)
    }
    const data = await FetchSizes(theSizes)
    const theAccSizes = await data.json()
    setSizes(theAccSizes.sizes)
  }

  const getCategories = async() => {
    let theCategories = []
    for (let i =0; i < product.categories.length; i++){
      theCategories.push(product.categories[i]._ref)
    }
    const data = await FetchProductCategories(theCategories)
    const theAccCategories = await data.json()
    setCategories(theAccCategories.categories)
  }

  const addToBag = () => {
    if (user.name=='' || !session || !user ) {toast('Sign In To Add This To Bag', {
      icon:'🏃'
    })
    return
  }
    if (quantity<1 || !selectedSize ) {
      toast('Select An Available Size', {
        icon: '🤔'
      })
      return}
    const theOrderItem:orderItem = {
      product: product,
      quantity: quantity,
      size: selectedSize,
      user: user
    }
    addToOrder(theOrderItem)
    toast(`${quantity} ${product.title}${quantity>1? "'s were":''} added`, {
      icon:'🛍️'
    })
  }

  useEffect(() => {
    getSizes()
    getCategories()
  }, [])
  
  return (
         <div className='place-content-center w-screen mb-10 flex-wrap md:flex-nowrap md:h-screen flex'>
          <div className='md:h-5/6 h-4/6 flex w-full pr-4 md:w-3/6 ' >
              <img src={product.img} className='h-full mb-10 min-w-full min-h-full w-2/6 object-cover ' />
          </div>
          <div className='w-4/6 p-2 md:h-4/6 flex md:ml-32 items-center'>
              <div>
                <h1 className='lgTitle text-3xl' >{product.title}</h1>
                <p>{product.blurb}</p>
                <p className='text-lg text-ycDblue font-bold' >${product.cost}</p>
                <hr className='my-2' />
                <p className='text-lg my-2' >Sizes Available:</p>
       <div className='w-full space-x-2 flex'>
                   {
                 sizes && sizes?.map((size) => (
                  <p onClick={() => {size.quantity!==0 && setSelectedSize(size)}}  key={size._id} className={`${size.quantity==0? 'opacity-70': 'cursor-pointer shadow-lg'} ${selectedSize==size && 'font-bold'}  items-center p-1 text-sm w-8 h-8 text-center border-2 border-ycLblue text-black rounded-full`}>
                   {size.shortForm}
                  </p>
                   ))}
       </div>
       <hr className='my-2' />
       <div className='w-full space-x-2 flex'>
                   {
                 categories && categories?.map((cat) => (
                  <p className='bg-ycDblue px-2 py-1 text-sm text-white rounded-full'  key={cat._id} >#{cat.title}</p>
                   ))}
       </div>
       <div className='flex rounded-lg mt-10 ' >
                  <input type={'number'} value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className='rounded-l-lg p-1 border-2 border-ycDblue w-12 text-center outline-none' />
                  <input type={'submit'} value='Add To Bag' onClick={addToBag} className= {`${selectedSize? 'cursor-pointer': 'opacity-80'} bg-ycDblue text-white px-3 py-2 rounded-r-lg`} />
       </div>
              </div>
          </div>
         </div>
  )
}

export const getStaticPaths = async () => {
  const query = "*[_type=='product'{slug{current}}]"

  const products = await client.fetch(query)

  const paths = products.map((item:Item) => (
    {
      params: {
        slug:item.slug.current
      }
    }
  ))

  return {
    paths, fallback:'blocking'
  }
} 

interface IParams {
  params:{slug:string},
}

export const getStaticProps = async({params}:IParams) => {
  const query = `*[_type=='product' && slug.current == "${params.slug}"][0]`
  const product = await client.fetch(query)

  return ({
    props: {
      product
    }
  })
}

export default productPage