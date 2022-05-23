// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity'
import { size } from '../../typings'
import {groq} from 'next-sanity'

type Data = {
  sizes: size[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const sizeRequest:string[] = JSON.parse(req.body)
    const sizes:size[] = []

    for (let i=0; i<sizeRequest.length; i++){
        const query = groq`*[_type=='sizeVariant' && _id=="${sizeRequest[i]}" ][0]`
        const resp =  await client.fetch(query)
        sizes.push(resp)
    }
    res.status(200).json({sizes})
}
