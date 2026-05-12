import Link from "next/link";

interface MatchCardProps {
  match: any;
}

export default function MatchCard({ match }: MatchCardProps) {
  const isLive = match.status.toLowerCase() === "live";

  // Build a unified teams array from either innings[] or teams[]
  let displayTeams: { name: string; shortName: string; score: string; overs: string; isBatting: boolean }[] = [];

  if (match.innings) {
    // Group innings by team name
    const teamMap: Record<string, { scores: string[]; overs: string }> = {};
    match.innings.forEach((inn: any) => {
      if (!teamMap[inn.team]) teamMap[inn.team] = { scores: [], overs: '' };
      teamMap[inn.team].scores.push(inn.score);
      teamMap[inn.team].overs = inn.overs;
    });
    const lastInnings = match.innings[match.innings.length - 1];
    Object.entries(teamMap).forEach(([team, data]) => {
      displayTeams.push({
        name: team,
        shortName: team.substring(0, 3).toUpperCase(),
        score: data.scores.join(' & '),
        overs: data.overs,
        isBatting: lastInnings.team === team
      });
    });
  } else if (match.teams) {
    displayTeams = match.teams.map((t: any) => ({
      name: t.name,
      shortName: t.shortName,
      score: t.score || '',
      overs: t.overs || '',
      isBatting: t.isBatting || false
    }));
  }

  return (
    <Link href={`/match/${match.id}`} className="block">
      <div className="glass p-6 rounded-2xl hover:scale-[1.02] transition-all cursor-pointer group hover:bg-white/5 border border-transparent hover:border-accent/20">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1">{match.format}</span>
            <span className="text-[10px] text-muted-foreground font-medium">{match.date} • {match.venue}</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
            isLive ? "bg-accent/20 text-accent animate-pulse" : "text-muted-foreground"
          }`}>
            {match.status}
          </span>
        </div>

        {match.toss && (
          <div className="mb-4 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
            <p className="text-[9px] text-muted-foreground italic leading-tight">
              <span className="text-accent font-bold uppercase mr-1 not-italic">Toss:</span>
              {match.toss}
            </p>
          </div>
        )}
        
        <div className="space-y-4 mb-6">
          {displayTeams.map((team, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] font-bold">
                  {team.shortName}
                </div>
                <span className={`font-bold ${team.isBatting ? "text-white" : "text-muted-foreground"}`}>
                  {team.shortName}
                  {team.isBatting && <span className="text-accent ml-1">*</span>}
                </span>
              </div>
              <div className="text-right">
                <span className={`text-xl font-bold ${!team.score ? "text-muted-foreground" : "text-white"}`}>
                  {team.score || 'Yet to bat'}
                </span>
                {team.overs && team.overs !== "0" && (
                  <p className="text-[10px] text-muted-foreground">{team.overs} Ov</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-white/5">
          <p className={`text-xs font-medium ${isLive ? "text-accent" : "text-muted-foreground"}`}>
            {match.summary}
          </p>
        </div>
      </div>
    </Link>
  );
}
