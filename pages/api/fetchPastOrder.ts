// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity'
import { CategoryVariant, Order } from '../../typings'
import {groq} from 'next-sanity'

type Data = {
  orders: Order[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const userID = req.body
    const query = groq`*[_type=='order' && user._ref=="${userID}" && paid == true ]`
    const orders = await client.fetch(query)
    res.status(200).json(orders)
}
