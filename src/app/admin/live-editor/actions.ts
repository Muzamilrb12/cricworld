'use server';

import fs from 'fs/promises';
import path from 'path';

export async function updateMatchScore(matchId: string, updates: { score: string, overs: string, summary: string }) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'matches.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const matches = JSON.parse(fileData);

    const matchIndex = matches.findIndex((m: any) => m.id === matchId);
    if (matchIndex === -1) return { success: false, error: 'Match not found' };

    // Update the batting team's score (assuming simple logic for now)
    const teamIndex = matches[matchIndex].teams.findIndex((t: any) => t.isBatting);
    if (teamIndex !== -1) {
      matches[matchIndex].teams[teamIndex].score = updates.score;
      matches[matchIndex].teams[teamIndex].overs = updates.overs;
    }
    
    matches[matchIndex].summary = updates.summary;

    await fs.writeFile(filePath, JSON.stringify(matches, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Update failed:', error);
    return { success: false, error: 'Failed to update file' };
  }
}
