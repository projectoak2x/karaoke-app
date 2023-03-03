// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { OAuth2Client } from "google-auth-library";
const SERVICE_ACCOUNT_FILE = "./karaoke-app-378215-b9c1c7124285.json";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  token: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = new OAuth2Client(
    "395334158784-t7bhi84s9hqarnuuuv185n6234j8u1ll.apps.googleusercontent.com",
    "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"
    );
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/youtube.force-ssl',
      'https://www.googleapis.com/auth/youtube.readonly',
    ]
  });
  console.log('Authorize this app by visiting this URL:', authUrl);
  // const code = 'YOUR_AUTHORIZATION_CODE';
  // const {tokens} = await client.getToken(code);
  // const accessToken = tokens.access_token;
  // const refreshToken = tokens.refresh_token;
  // console.log('Access token:', accessToken);
  res.status(200).json({ token: "accessToken" || "" })
}
