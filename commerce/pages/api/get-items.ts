import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_AUTH_TOKEN || "",
});

const databaseID = process.env.NOTION_DATABASE_PRODUCT || "";

async function getItems() {
  try {
    const response = await notion.databases.query({
      database_id: databaseID,
      sorts: [
        {
          property: '가격',
          direction: 'ascending',
        },
      ],
    });
    return response;
  } catch (error) {
    console.error(`get-items error`);
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
    const response = await getItems();
    return res
      .status(200)
      .json({ items: response?.results, message: `Success` });
  } catch (error) {
    return res.status(400).json({ message: `Failed` });
  }
}
