// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity'
import {groq} from 'next-sanity'
import {Order, orderItem} from '../../typings'

type Data = {
 message: string
}

export default async function handler(  
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const data: orderItem[]= JSON.parse(req.body) 
    for (let i =0; i < data.length; i++){
      const mutations = [{
        create: {
          _type: 'orderItem',
          product: {_ref: data[i].product._id, _type:'reference'},
          size: {_ref: data[i].size._id,_type:'reference'},
          quantity: data[i].quantity,
          user: {_ref:data[i].user._id, _type:'reference'},
          placed:false
        }
      }]

      const result = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${'production'}`, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${process.env.Sanity_TOKEN}`
        },
        body: JSON.stringify({mutations})
        })  
      
    }

    const orderItemQuery = groq`*[_type=='orderItem' && user._ref=='${data[0].user._id}' && placed == false]`
    const userOrders = await client.fetch(orderItemQuery)
    const completeOrder = []
    for (let i = 0; i < userOrders.length; i++){
      const data = userOrders[i].product._ref
      completeOrder.push(data)
    }

    const mutations = [{
      create: {
        _type: 'order',
        completeOrder:completeOrder,
        user: {
          _ref: data[0].user._id,
          _type: 'reference'
        },
        paid: false
      }
    }, {
      "patch": {
        "query": `*[_type == 'orderItem' && user._ref == '${data[0].user._id}' && placed == false ]`,
        "set": {
          placed:true
        }
      }
    }
  ]

    const result = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${'production'}`, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${process.env.Sanity_TOKEN}`
        },
        body: JSON.stringify({mutations})
        })  
        const json = await result.json()
        
        const query = groq`*[_type == 'order' && user._ref == '${data[0].user._id}' ] | order(_createdAt desc) [0] ._id`
        const id = await client.fetch(query)
        console.log('the id baby', id)
    res.status(200).json({message: id})
}