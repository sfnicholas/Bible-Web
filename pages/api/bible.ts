import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { version, bookId } = req.query;

  if (!version || !bookId || typeof version !== 'string' || typeof bookId !== 'string') {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  try {
    const filePath = path.join(process.cwd(), 'data', version, `${bookId}.json`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(404).json({ error: 'Book not found' });
  }
}
