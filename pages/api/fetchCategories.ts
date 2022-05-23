// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity'
import { Category, feature } from '../../typings'
import {groq} from 'next-sanity'

type Data = {
  category: Category[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = groq`*[_type=='category'] `
    const resp =  await client.fetch(query)
    res.status(200).json(resp)
}
