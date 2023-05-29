import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwtDecode from 'jwt-decode';

async function getToken(credential: string) {  
  try {
    const decoded = jwtDecode(credential);
    return decoded;
  } catch (error) {
    console.error(`get-token error`);
    console.error(`=============================`);
    console.error(JSON.stringify(error));
    console.error(`=============================`);
  }
}

type Data = {
  items?: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { credential } = req.query;
  try {
    const userInfo = await getToken(String(credential));
    res.status(200).json({ items: userInfo, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: 'Failed' });
  }
}
