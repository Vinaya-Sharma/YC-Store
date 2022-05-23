// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity'
import { CategoryVariant } from '../../typings'
import {groq} from 'next-sanity'

type Data = {
  categories: CategoryVariant[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const CategoryRequest:string[] = JSON.parse(req.body)
    const categories:CategoryVariant[] = []

    for (let i=0; i<CategoryRequest.length; i++){
        const query = groq`*[_type=='category' && _id=="${CategoryRequest[i]}" ][0]`
        const resp =  await client.fetch(query)
        categories.push(resp)
    }
    res.status(200).json({categories})
}
