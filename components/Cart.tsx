import { ArrowLeftIcon, XIcon } from '@heroicons/react/outline'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useStateContext } from '../context/stateContext'
import { orderItem } from '../typings'
import { loadStripe, Stripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';

interface Props {
  setCart: Dispatch<SetStateAction<boolean>>
}

const Cart = ({setCart}:Props) => {
  const {orders, setorders,cartTotal, toggleQuantity, deleteItem, setCartTotal} = useStateContext()
  const [orderId, setorderId] = useState<string | null>(null)
  const [cookies, setCookie, removeCookie] = useCookies();

  const getStripePromise = () => {
    let stripePromise: Promise<Stripe | null | undefined >  = null; 
    if (!stripePromise){
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    }
    return stripePromise
}

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>, order: orderItem) => {
    if (parseInt(e.target.value) > (order.quantity)) {
      toggleQuantity('inc', order)
    }  else if (parseInt(e.target.value) < (order.quantity) && order.quantity>1) {
      toggleQuantity('dec', order)
    }
  }

const inputOrder = async() => {
  const resp = await fetch ('http://localhost:3000/api/placeOrder', {
    method:'POST',
    body: JSON.stringify(orders)
  })

  const data = await resp.json()
  setCookie('testing', 'test') 
  console.log('data', data.message)
  setCookie('orderId', data.message) 
  placeOrder()
}


const placeOrder = async () => {
  const stripe = await getStripePromise()
  const resp = await fetch('http://localhost:3000/api/checkout_session', {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(orders)
  })
  if (resp.status == 500) {toast('error'); return} 
  const data = await resp.json()
  toast.loading('redirecting...')
  stripe?.redirectToCheckout({sessionId:data.id})
}

  return (
    <div className='fixed transition-all text-white delay-500 ease-in-out top-0 right-0 h-full min-h-screen w-96 bg-ycDblue z-10' >
    <ArrowLeftIcon onClick={() => setCart(false)} className='w-6 absolute top-5 left-5 h-6'/>
   <div className='w-full mt-20 h-full flex flex-col items-center' >
      <p className='text-lg font-bold mb-10 ' >Your Cart.</p>
      { orders?.map((order) => (
        <div className='w-80 mb-3 relative  items-center h-20 bg-white px-3 py-2 flex rounded-lg' >
          <img className='w-2/6 rounded-lg h-16 object-cover flex ' src={order.product.img} />
          <p className={`items-center absolute bg-white bottom-3 left-[74px] p-1 text-sm w-8 h-8 text-center border-2 border-ycLblue text-black rounded-full`}>
                   {order.size.shortForm}
                  </p>
          <div className='items-center w-4/6 text-black flex justify-between px-5 flex-row'>
                <div className='flex flex-col' >
                  <p className='text-large mt-1 font-bold' >{order.product.title}</p>
                        <div className='mt-1 space-x-2 flex w-12 '>
                          <p>Quantity: </p>
                          <input onChange={(e) => handleQuantity(e, order)} className='w-8 outline-none' type={'number'} value={order.quantity}/>
                          </div>
                    </div>
            <p className='text-lg text-ycDblue font-bold' >${order.product.cost}</p>
          </div>
          <XIcon onClick={() => deleteItem(order)} className='absolute -top-3 -left-3 w-6 h-6 bg-white p-1 rounded-full text-ycDblue ' />
        </div>
      ))}
      {
        orders?.length ?
        <div className='flex space-x-4 items-center place-content-center ' >
      <p className='text-white place-self-center italic flex mt-10 text-lg' >Subtotal: ${cartTotal}</p>
      <button  onClick={inputOrder} className='mainBtn text-white border-white w-36 mt-10 py-3'>Checkout</button>
        </div> : 
        <div>
           <p className='text-white place-self-center italic flex mt-10 text-lg'>Your Bag Is Currently Empty 🛍️ </p>
        </div>
      }
   </div>
      
   </div>
  )
}

export default Cart