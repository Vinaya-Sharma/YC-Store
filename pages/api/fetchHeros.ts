// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity'
import { feature } from '../../typings'
import {groq} from 'next-sanity'

type Data = {
  features: feature[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = groq`*[_type=='hero'] | order(_createdAt asc) `
    const resp =  await client.fetch(query)
    res.status(200).json(resp)
}
