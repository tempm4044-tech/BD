import type { Img } from "@/types";
// Runtime lookup on Wikipedia/Wikimedia (free, no key). Images are shown ONLY if Wikimedia Commons returns a license for the file;
// credit text comes from Commons metadata, never invented. Results are cached for 24h by Next.
const strip = (h: string) => h.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
async function j(url: string) { const r = await fetch(url, { next: { revalidate: 86400 }, signal: AbortSignal.timeout(8000) }); if (!r.ok) throw new Error("http"); return r.json(); }
export type Wiki = { title: string; url: string; extract: string | null; image: Img | null; lat?: number; lon?: number };
export async function wiki(query: string, withImage = true): Promise<Wiki | null> {
  try {
    const d = await j(`https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrlimit=1&gsrsearch=${encodeURIComponent(query)}&prop=pageimages|extracts|coordinates&colimit=1&piprop=name|thumbnail&pithumbsize=1200&exintro=1&explaintext=1&exsentences=3`);
    const p: any = Object.values(d?.query?.pages ?? {})[0]; if (!p) return null;
    let image: Img | null = null;
    if (withImage && p.thumbnail?.source && p.pageimage) {
      const c = await j(`https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=extmetadata&iiextmetadatafilter=Artist|LicenseShortName&titles=${encodeURIComponent("File:" + p.pageimage)}`);
      const m: any = (Object.values(c?.query?.pages ?? {})[0] as any)?.imageinfo?.[0]?.extmetadata;
      if (m?.LicenseShortName?.value) image = { url: p.thumbnail.source, alt: p.title, credit: `${m.Artist ? strip(m.Artist.value) : "Unknown author"} (${m.LicenseShortName.value})`,
        source: "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(p.pageimage) };
    }
    return { title: p.title, url: "https://en.wikipedia.org/wiki/" + encodeURIComponent(String(p.title).replace(/ /g, "_")), extract: p.extract || null, image, lat: p.coordinates?.[0]?.lat, lon: p.coordinates?.[0]?.lon };
  } catch { return null; }
}

// Several licensed JPG photos from Wikimedia Commons for a query. Credit/license come from Commons metadata. Auto-matched: verify.
export async function gallery(query: string, limit = 6): Promise<Img[]> {
  try {
    const d = await j(`https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=${limit * 2}&gsrsearch=${encodeURIComponent(query)}&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=1000&iiextmetadatafilter=Artist|LicenseShortName`);
    const pages: any[] = Object.values(d?.query?.pages ?? {});
    return pages.sort((a, b) => a.index - b.index).flatMap((p): Img[] => { const i = p.imageinfo?.[0]; const m = i?.extmetadata;
      if (!i || i.mime !== "image/jpeg" || !m?.LicenseShortName?.value) return [];
      return [{ url: i.thumburl || i.url, alt: String(p.title).replace(/^File:/, "").replace(/\.[a-z]+$/i, ""),
        credit: `${m.Artist ? strip(m.Artist.value) : "Unknown author"} (${m.LicenseShortName.value})`, source: i.descriptionurl || null }]; }).slice(0, limit);
  } catch { return []; }
}
