// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const fs = require('fs');


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, lobby } = req.query;

  const destination = `/var/www/downloads/${lobby}/${id}.mp4`

  if (!fs.existsSync(destination)) {
    console.log('File don\'t exists at destination:', destination);
    res.status(200).json({ message: 'File don\'t exists' });
    return;
  }

  try {
    // Delete the file
    fs.unlinkSync(destination);

    // Send a success response
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (err) {
    // Send an error response
    res.status(500).json({ message: 'Error deleting file' });
  }

}

