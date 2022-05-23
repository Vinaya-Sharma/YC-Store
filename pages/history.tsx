import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import {useStateContext} from '../context/stateContext'
import { Order, orderItem } from '../typings'

const History = () => {
    const {data:session} = useSession()
    const {user} = useStateContext()
    const [pastOrders, setpastOrders] = useState<Order[]>([])

    const fetchOrderItem = async(item:string) => {
      console.log(item)
      const resp = await fetch('http://localhost:3000/api/fetchOrderItem', {
        method:'POST',
        body: item
    })
    const data:orderItem = await resp.json()
    return <p>
      {data.product.title}
    </p>
    }

    const fetchPastOrders = async() => {
        const body = user._id
        const resp = await fetch('http://localhost:3000/api/fetchPastOrder', {
            method:'POST',
            body: body
        })
        const data = await resp.json()
        setpastOrders(data)
        console.log(data)
        console.log(pastOrders)
    }

    useEffect(() => {
      fetchPastOrders()
    }, [])
    

  return (
    <div className='overflow-auto h-[80vh]' >
        <div className='lgTitle text-2xl font-light py-2'>Past Order History</div>
        <div>
            {
              pastOrders && pastOrders.slice(0,10).map((order) => {
               return ( <div key={order._id} >
                  <hr className='py-2' />
          <div className=''>  
          <p><span className='font-bold' >Date: </span>{order._createdAt}</p>
           <p><span className='font-bold'>Number of different items ordered:</span> {order.completeOrder.length}</p>
           </div>
                  </div>)
              })
            }
        </div>
    </div>
  )
}

export default History
