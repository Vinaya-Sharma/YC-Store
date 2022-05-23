// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity'
import {groq} from 'next-sanity'
import {User} from '../../typings'

type Data = {
  user: User
}

export default async function handler(  
  req: NextApiRequest,
  res: NextApiResponse<Data>
){
    const data:User = JSON.parse(req.body)
    const mutations = [{
        create: {
          _type: 'user',
          name:data.name,
          pic: data.img,
            email:data.email,
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

        const user = await result.json()
        res.status(200).json(user)
}