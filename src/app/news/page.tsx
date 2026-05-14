import GoogleNewsFeed from "@/components/GoogleNewsFeed";

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;

  const title = topic === 'international' ? 'International Cricket News' 
              : topic === 'leagues' ? 'Cricket Leagues & T20 News'
              : 'Latest Cricket News & Articles';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-accent">{title}</h1>
        <p className="text-muted-foreground font-medium italic uppercase tracking-tight text-xs">
          {topic ? `Filtered by ${topic}` : 'Breaking news, expert analysis, and exclusive interviews'} — Live from Google News
        </p>
      </div>

      <GoogleNewsFeed limit={30} layout="grid" showHeader={true} topic={topic} />
    </div>
  );
}

