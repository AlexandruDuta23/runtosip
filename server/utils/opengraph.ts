export async function fetchOpenGraph(url: string, timeoutMs = 5000): Promise<{ title?: string; image?: string }> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'RunToSipBot/1.0 (+https://runtosip.example)'
      },
      signal: controller.signal,
    } as any);
    const html = await res.text();
    const ogTitleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i) ||
                         html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:title["'][^>]*>/i);
    const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i) ||
                         html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i);
    const titleTagMatch = html.match(/<title>([^<]+)<\/title>/i);
    const title = ogTitleMatch?.[1] || titleTagMatch?.[1];
    const image = ogImageMatch?.[1];
    return { title, image };
  } catch {
    return {};
  } finally {
    clearTimeout(id);
  }
}


