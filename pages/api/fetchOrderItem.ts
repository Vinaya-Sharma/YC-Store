// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity'
import { CategoryVariant, Order, orderItem } from '../../typings'
import {groq} from 'next-sanity'

type Data = {
  orderItem: orderItem
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const orderId = req.body
    const query = groq`*[_type=='orderItem' && ._id=="${orderId}"]`
    console.log(query)
    const orders = await client.fetch(query)
    res.status(200).json(orders)
}
