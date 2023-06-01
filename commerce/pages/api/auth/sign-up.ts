import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwtDecode from 'jwt-decode';

const prisma = new PrismaClient()

async function signUp(credential: string) {  
  const decoded: { name: string; email: string; picture: string } =
  jwtDecode(credential)

  try {
    const response = await prisma.user.upsert({
      where: {
        email: decoded.email,
      },
      update: {
        name: decoded.name,
        image: decoded.picture,
      },
      create: {
        email: decoded.email,
        name: decoded.name,
        image: decoded.picture,
      },
    })

    return response;
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
    const userInfo = await signUp(String(credential));
    res.status(200).json({ items: userInfo, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: 'Failed' });
  }
}
