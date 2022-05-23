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
    const data: string= req.body
    console.log('id pf paid ', data)
    const mutations = [ {
      "patch": {
        "query": `*[_type == 'order' && _id == '${data}'][0]`,
        "set": {
          paid:true
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
        console.log(json)

    res.status(200).json({message: json._id})
}