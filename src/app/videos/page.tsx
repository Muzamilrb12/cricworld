import videosData from "../../../data/videos.json";

export default function VideosPage() {
  const videos = videosData || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2 italic uppercase tracking-tighter">Video Highlights</h1>
        <p className="text-muted-foreground">Watch the best moments and latest cricket news in high definition</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {videos.map((video: any) => (
          <div key={video.id} className="group cursor-pointer">
            <div className="relative aspect-video rounded-3xl overflow-hidden glass mb-4 border border-white/5">
              <div className="absolute inset-0 bg-zinc-900/40 group-hover:bg-zinc-900/10 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,255,136,0.4)] group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-background ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-[10px] font-bold">
                {video.duration}
              </div>
            </div>
            <div className="px-2">
              <span className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1 block">{video.category}</span>
              <h3 className="text-xl font-bold group-hover:text-accent transition-colors leading-tight">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
