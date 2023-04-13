import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the folder name from the request body
  const folderName = `${process.env.NEXT_PUBLIC_DOWNLOAD_PATH}${req.body.folderName}`;

  // Create the folder
  fs.mkdir(folderName, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating folder' });
    } else {
      res.status(200).json({ message: `Folder ${folderName} created successfully!` });
    }
  });
}