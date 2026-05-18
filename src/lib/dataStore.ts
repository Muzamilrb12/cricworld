// src/lib/dataStore.ts

/**
 * Simple abstraction over JSON files in the `data/` folder.
 * It can later be swapped for Supabase without changing callers.
 */
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');

export async function readJSON<T>(fileName: string): Promise<T | null> {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch (err) {
    // File does not exist or invalid JSON
    return null;
  }
}

export async function writeJSON<T>(fileName: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, fileName);
  const json = JSON.stringify(data, null, 2);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath, json, 'utf8');
}
