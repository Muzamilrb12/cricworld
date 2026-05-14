import GoogleNewsFeed from "@/components/GoogleNewsFeed";

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-accent">Cricket News &amp; Articles</h1>
        <p className="text-muted-foreground font-medium">Breaking news, expert analysis, and exclusive interviews — live from Google News</p>
      </div>

      <GoogleNewsFeed limit={30} layout="grid" showHeader={true} />
    </div>
  );
}
