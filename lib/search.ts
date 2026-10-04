import { districts } from "@/data/districts";
import { divisions } from "@/data/divisions";
import { destinations } from "@/data/destinations";
export type Hit = { type: "district" | "division" | "destination"; title: string; sub: string; href: string };
const n = (s: string) => s.toLowerCase().replace(/['’\s-]/g, "");
export function search(q: string, limit = 12): Hit[] {
  const t = n(q); if (!t) return [];
  const hits: Hit[] = [];
  districts.forEach((d) => (n(d.name).includes(t) || d.bn.includes(q.trim())) &&
    hits.push({ type: "district", title: d.name, sub: `${d.bn} · ${d.division}`, href: `/district/${d.slug}` }));
  divisions.forEach((v) => n(v.name).includes(t) &&
    hits.push({ type: "division", title: v.name + " Division", sub: v.bn, href: `/?division=${v.id}` }));
  destinations.forEach((x) => (n(x.title).includes(t) || x.categories.some((c) => n(c).includes(t))) &&
    hits.push({ type: "destination", title: x.title, sub: x.district, href: `/destination/${x.slug}` }));
  return hits.slice(0, limit);
}
