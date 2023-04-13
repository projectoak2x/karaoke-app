// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const fs = require('fs');
const ytdl = require('ytdl-core');

type Data = {
  name: string
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const { id } = req.query;

//   // Set the video URL based on the video ID
//   const url = `https://www.youtube.com/watch?v=${id}`;

//   try {
//     const videoInfo = await ytdl.getInfo(url);
//     const format = ytdl.chooseFormat(videoInfo.formats, { filter: 'videoonly' });
//     const contentLength = format.contentLength || 0;
//     res.setHeader('Content-Type', format.mimeType);
//     res.setHeader('Accept-Ranges', 'bytes');

//     const range = req.headers.range;
//     if (range) {
//       const parts = range.replace(/bytes=/, '').split('-');
//       const start = parseInt(parts[0], 10);
//       const end = parts[1] ? parseInt(parts[1], 10) : contentLength - 1;

//       res.setHeader('Content-Range', `bytes ${start}-${end}/${contentLength}`);
//       res.setHeader('Content-Length', (end - start) + 1);
//       res.status(206);

//       ytdl.downloadFromInfo(videoInfo, { format, range: { start, end } }).pipe(res);
//     } else {
//       res.setHeader('Content-Length', contentLength);
//       ytdl.downloadFromInfo(videoInfo, { format }).pipe(res);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  // Set the video URL based on the video ID
  const url = `https://www.youtube.com/watch?v=${id}`;

  // Use ytdl-core to create a readable stream for the video
  const videoStream = ytdl(url, { filter: 'audioandvideo', quality: 'highest' });

  // Set the response headers to indicate that we're streaming video data
  res.setHeader('Content-Type', 'video/webm');
  res.setHeader('Content-Disposition', `attachment; filename="${id}.webm"`);
  res.setHeader('Cache-Control', 'no-cache');

  // Pipe the video data to the response object as it's being streamed
  videoStream.pipe(res);
}
