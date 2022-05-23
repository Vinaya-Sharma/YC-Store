// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity'
import { CategoryVariant, User } from '../../typings'
import {groq} from 'next-sanity'

type Data = {
  user: User
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {email} = req.query

    const query = groq`*[_type=='user' && email=="${email}" ][0]`
    const user:User =  await client.fetch(query)
    res.status(200).json({user})
}
