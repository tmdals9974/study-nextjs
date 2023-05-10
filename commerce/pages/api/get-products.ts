import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getProducts() {
  try {
    const response = await prisma.products.findMany();
    return response;
  } catch (error) {
    console.error(`get-products error`);
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
  try {
    const products = await getProducts();
    return res.status(200).json({ items: products, message: `Success` });
  } catch (error) {
    return res.status(400).json({ message: `Failed` });
  }
}
