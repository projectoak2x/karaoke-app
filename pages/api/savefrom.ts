// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import { GoogleAuth } from "google-auth-library";
const SERVICE_ACCOUNT_FILE = "./karaoke-app-378215-b9c1c7124285.json";
import type { NextApiRequest, NextApiResponse } from 'next'
import ytdl from "ytdl-core";

type Data = {
  token: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const videoId = req.query.id; 
  res.setHeader('Content-Disposition', `attachment; filename=${videoId}.mp4`);
  res.setHeader('Content-Type', 'video/mp4');

  // Create a stream of the video file using ytdl-core
  const stream = ytdl(`https://www.youtube.com/watch?v=${videoId}`, {
    format: 'mp4',
    quality: 'highest',
  });

  // Pipe the stream to the response object
  stream.pipe(res);
}
