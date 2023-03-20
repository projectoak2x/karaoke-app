// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const ytsr = require('ytsr');

type VideoType = {
  
}

type Data = {
  videos: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const firstResultBatch = await ytsr(req.query.s, { pages: 1 });
  console.log(firstResultBatch.items);
  res.status(200).json({ videos: firstResultBatch.items.filter((item:any)=>item.type==='video') })
}
