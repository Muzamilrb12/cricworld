import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const dataPath = path.join(process.cwd(), 'data', 'rankings.json');
  
  try {
    const fileContent = await fs.readFile(dataPath, 'utf8');
    const rankings = JSON.parse(fileContent);
    
    return NextResponse.json(rankings);
  } catch (error) {
    console.error('Error reading rankings data:', error);
    return NextResponse.json({ error: 'Failed to fetch rankings' }, { status: 500 });
  }
}
