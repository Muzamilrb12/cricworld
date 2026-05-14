import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

// Force dynamic — never cache this route, always fetch fresh
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Cricket-themed fallback images (royalty-free cricket photos)
const CRICKET_IMAGES = [
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?q=80&w=800&auto=format&fit=crop',
];

function getRelativeTime(dateStr: string): string {
  try {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return 'Recently';
  }
}

function extractImageFromHtml(html: string): string | null {
  try {
    if (!html) return null;
    const $ = cheerio.load(html);
    const imgSrc = $('img').first().attr('src');
    if (imgSrc && imgSrc.startsWith('http')) return imgSrc;
    return null;
  } catch {
    return null;
  }
}

function categorizeArticle(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('ipl') || lower.includes('premier league')) return 'IPL';
  if (lower.includes('t20') || lower.includes('twenty20')) return 'T20';
  if (lower.includes('odi') || lower.includes('one day')) return 'ODI';
  if (lower.includes('test') || lower.includes('test match')) return 'Test Cricket';
  if (lower.includes('world cup')) return 'World Cup';
  if (lower.includes('injury') || lower.includes('injured') || lower.includes('fitness')) return 'Injury Update';
  if (lower.includes('transfer') || lower.includes('auction') || lower.includes('retained')) return 'Transfers';
  if (lower.includes('record') || lower.includes('milestone') || lower.includes('century') || lower.includes('wicket')) return 'Records';
  if (lower.includes('women') || lower.includes('wpl')) return "Women's Cricket";
  if (lower.includes('score') || lower.includes('result') || lower.includes('beat') || lower.includes('won')) return 'Match Report';
  return 'Cricket';
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // Accept a comma‑separated list of Google News topic IDs. If omitted, fall back to a default set covering men's and women's cricket.
    const topicsParam = searchParams.get('topics');
    const defaultTopics = [
      'CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtVnVHZ0pWVXlnQVAB', // general cricket
      'CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKSlRpZ0FQAQ', // women's cricket (example)
    ];
    const topics = topicsParam
      ? topicsParam.split(',').map((t) => encodeURIComponent(t.trim()))
      : defaultTopics;

    const newsItems: any[] = [];

    for (const topic of topics) {
      const rssUrl = `https://news.google.com/rss/topics/${topic}?hl=en-IN&gl=IN&ceid=IN:en`;
      const response = await fetch(rssUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        },
        cache: 'no-store',
      });
      if (!response.ok) continue; // skip if a particular topic fails
      const xml = await response.text();
      const $ = cheerio.load(xml, { xmlMode: true });
      $('item').each((i, el) => {
        if (newsItems.length >= 50) return false; // overall limit
        const title = $(el).find('title').text().trim();
        const link = $(el).find('link').text().trim();
        const pubDate = $(el).find('pubDate').text().trim();
        const description = $(el).find('description').text().trim();
        const source = $(el).find('source').text().trim();
        const sourceUrl = $(el).find('source').attr('url') || '';
        if (!title) return;
        const extractedImage = extractImageFromHtml(description);
        const imageUrl = extractedImage || CRICKET_IMAGES[newsItems.length % CRICKET_IMAGES.length];
        let summary = '';
        try {
          const descHtml = cheerio.load(description);
          const summaryTexts = descHtml('li').map((_, li) => descHtml(li).text().trim()).get();
          summary = summaryTexts.length > 0
            ? summaryTexts.slice(0, 2).join(' | ')
            : descHtml.text().trim().substring(0, 200);
        } catch {
          summary = source || 'Cricket News';
        }
        const id = `gn-${Buffer.from(link).toString('base64url').substring(0, 16)}-${newsItems.length}`;
        const relativeTime = getRelativeTime(pubDate);
        const dateString = new Date(pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        const category = categorizeArticle(title);
        newsItems.push({
          id,
          title,
          summary: summary || `Latest cricket news from ${source || 'Google News'}`,
          imageUrl,
          category,
          time: relativeTime,
          author: source || 'Google News',
          authorUrl: sourceUrl,
          date: dateString,
          link,
          publishedAt: pubDate,
          isLive: true,
        });
      });
    }

    // Sort by publication date descending and enforce the 50‑item cap.
    newsItems.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return NextResponse.json({
      articles: newsItems.slice(0, 50),
      fetchedAt: new Date().toISOString(),
      count: newsItems.length,
      source: 'Google News RSS',
    });
  } catch (error: any) {
    console.error('Error fetching Google News RSS:', error?.message || error);
    return NextResponse.json({
      articles: [],
      fetchedAt: new Date().toISOString(),
      count: 0,
      source: 'fallback',
      error: 'Failed to fetch live news. Showing cached data.',
    }, { status: 200 });
  }
}
