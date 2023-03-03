// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GoogleAuth } from "google-auth-library";
const SERVICE_ACCOUNT_FILE = "./karaoke-app-378215-b9c1c7124285.json";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  token: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const auth = new GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ['https://www.googleapis.com/auth/youtube','https://www.googleapis.com/auth/youtube.force-ssl','https://www.googleapis.com/auth/youtubepartner'],
  });
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  const token = accessToken.token;
  console.log(token)
  res.status(200).json({ token: token || "" })
}
