import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_AUTH_TOKEN || "",
});

const databaseID = process.env.NOTION_DATABASE_PRODUCT || "";

async function addItem(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseID },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error(`add-item error`);
    console.error(`=============================`);
    console.error(JSON.stringify(error));
    console.error(`=============================`);
  }
}

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query;

  if (name == null) {
    return res.status(400).json({ message: 'No name' });
  }

  try {
    await addItem(String(name));
    return res.status(200).json({ message: `Success ${name} added` });
  } catch (error) {
    return res.status(400).json({ message: `Failed ${name} added` });
  }
}
