import path from 'path';
import { promises as fs } from 'fs';

export interface BibleBook {
  id: string;
  name: string;
  abv: string;
}

export interface BibleData {
  cuv: BibleBook[];
  esv: BibleBook[];
}

export async function getBookList(): Promise<BibleData> {
  const indexPath = path.join(process.cwd(), 'data', 'index.json');
  try {
    const fileContents = await fs.readFile(indexPath, 'utf-8');
    const data: BibleData = JSON.parse(fileContents);
    return data;
  } catch (error) {
    console.error('Error reading or parsing index.json:', error);
    throw error;
  }
}