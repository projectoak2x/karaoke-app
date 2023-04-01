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

//   try {
//     const videoUrl = `http://www.youtube.com/watch?v=${id}`;
//     const videoStream = ytdl(`http://www.youtube.com/watch?v=${id}`, { filter: 'videoandaudio' });
//     const videoData = await new Promise((resolve, reject) => {
//       const chunks = [];
//       videoStream.on('data', (chunk) => chunks.push(chunk));
//       videoStream.on('end', () => resolve(Buffer.concat(chunks)));
//       videoStream.on('error', reject);
//     });
//     res.status(200).send(videoData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, lobby } = req.query;

  const destination = `./public/downloads/${lobby}/${id}.mp4`

  // Set the video URL based on the video ID
  // const file = fs.createWriteStream(`./public/downloads/${id}.mp4`);
  if (fs.existsSync(destination)) {
    console.log('File already exists at destination:', destination);
    res.status(200).json({ message: 'File already exists' });
    return;
  }

  const video = ytdl(`http://www.youtube.com/watch?v=${id}`, { filter: 'videoandaudio' });
  const stream = fs.createWriteStream(destination);

  let finished = false;
  let counter = 0

  stream.on('finish', () => {
    finished = true;
    // if(!res.headersSent) res.status(200).json({ name: 'John Doe' })
    console.log("download finish")
  });

  video.pipe(stream);

  const downloadPromise = new Promise<void>((resolve) => {
    const intervalId = setInterval(() => {
      console.log(counter++)
      if(finished){
        clearInterval(intervalId);
        resolve();
      }
      // fs.stat(destination, (err:any, stats:any) => {
      //   if (err) {
      //     console.error(err);
      //     return;
      //   }
      //   const fileSizeInBytes = stats.size;
      //   if(fileSizeInBytes>50000){
      //     clearInterval(intervalId);
      //     resolve();
      //   }
      // });
    }, 1000);
  });

  await downloadPromise;

  res.status(200).json({ message: 'Download finished' });
}

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const { id } = req.query;

//   // Set the video URL based on the video ID
//   const url = `https://www.youtube.com/watch?v=${id}`;

//   // Use ytdl-core to create a readable stream for the video
//   const videoStream = ytdl(url, { filter: 'audioandvideo', quality: 'highest' });

//   // Set the response headers to indicate that we're streaming video data
//   res.setHeader('Content-Type', 'video/webm');
//   res.setHeader('Content-Disposition', `attachment; filename="${id}.webm"`);
//   res.setHeader('Cache-Control', 'no-cache');

//   // Pipe the video data to the response object as it's being streamed
//   videoStream.pipe(res);
// }
