import MatchCard from "@/components/MatchCard";
import matchesData from "../../../data/matches.json";

export default function LivePage() {
  const matches = matchesData || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Live Cricket Scores</h1>
        <p className="text-muted-foreground">Real-time updates from ongoing matches worldwide</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.length > 0 ? (
          matches.map((match: any) => (
            <MatchCard key={match.id} match={match} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center glass rounded-2xl">
            <p className="text-muted-foreground">No live matches at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
