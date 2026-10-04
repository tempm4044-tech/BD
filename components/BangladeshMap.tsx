"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { geoMercator, geoPath } from "d3-geo";
import type { FeatureCollection } from "geojson";
import { districts } from "@/data/districts";
// PLUG-IN POINT: put a verified district GeoJSON at public/geo/bd-districts.geojson.
// Each feature needs properties.name (or shapeName) matching a district name. No boundaries are bundled.
const GEO_URL = "/geo/bd-districts.geojson";
// d3-geo needs exterior rings clockwise and holes counter-clockwise; many GeoJSON files use the opposite,
// which makes d3 draw "the whole world minus the district" (a giant filled square). Fix winding here.
type Ring = number[][];
const cw = (r: Ring) => r.reduce((a, [x1, y1], i) => { const [x2, y2] = r[(i + 1) % r.length]; return a + (x2 - x1) * (y2 + y1); }, 0) > 0;
const fixPoly = (rings: Ring[]) => rings.map((r, i) => (cw(r) === (i === 0) ? r : [...r].reverse()));
function rewind(fc: FeatureCollection): FeatureCollection {
  return { ...fc, features: fc.features.map((f) => {
    const g = f.geometry as any;
    if (g?.type === "Polygon") return { ...f, geometry: { ...g, coordinates: fixPoly(g.coordinates) } };
    if (g?.type === "MultiPolygon") return { ...f, geometry: { ...g, coordinates: g.coordinates.map(fixPoly) } };
    return f; }) };
}
const rawSlug = (s: string) => s.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
// Old/alternate spellings found in some GeoJSON files -> our slugs. Add more if the console warns "Unmatched map name".
const ALIAS: Record<string, string> = { comilla: "cumilla", bogra: "bogura", jessore: "jashore", chittagong: "chattogram", barisal: "barishal",
  jhalokati: "jhalakathi", jhalokathi: "jhalakathi", "chapai-nawabganj": "chapainawabganj", nawabganj: "chapainawabganj", netrakona: "netrokona",
  maulvibazar: "moulvibazar", "moulvi-bazar": "moulvibazar", khagrachari: "khagrachhari", narsinghdi: "narsingdi", jaipurhat: "joypurhat",
  bagherhat: "bagerhat", maymansingh: "mymensingh", laksmipur: "lakshmipur", "cox-s-bazar": "coxs-bazar", brahamanbaria: "brahmanbaria",
  jhenaidaha: "jhenaidah", sirajgonj: "sirajganj", kishorganj: "kishoreganj", gopalgonj: "gopalganj", panchagar: "panchagarh" };
const slugOf = (s: string) => ALIAS[rawSlug(s)] ?? rawSlug(s);
export default function BangladeshMap({ visited = [], activeDivision, onSelect }: { visited?: string[]; activeDivision?: string; onSelect?: (slug: string) => void }) {
  const [geo, setGeo] = useState<FeatureCollection | null>(null);
  const [missing, setMissing] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => { fetch(GEO_URL).then((r) => (r.ok ? r.json() : Promise.reject())).then(setGeo).catch(() => setMissing(true)); }, []);
  const paths = useMemo(() => {
    if (!geo) return [];
    const fixed = rewind(geo);
    const p = geoPath(geoMercator().fitSize([600, 760], fixed));
    return fixed.features.map((f) => { const name = (f.properties?.name ?? f.properties?.shapeName ?? "") as string;
      const slug = slugOf(name); if (!districts.some((d) => d.slug === slug)) console.warn("Unmatched map name:", name);
      return { slug, name, d: p(f) ?? "" }; });
  }, [geo]);
  if (missing) return <div className="rounded-3xl border border-dashed p-8 text-center text-sm">Map data not added yet. Place a district GeoJSON at <code>public/geo/bd-districts.geojson</code> (see README).</div>;
  if (!geo) return <div className="h-96 animate-pulse rounded-3xl bg-bd-50 dark:bg-bd-900" aria-busy="true" />;
  return (
    <figure className="relative">
      <svg id="bd-map-svg" viewBox="0 0 600 760" role="group" aria-label="Map of Bangladesh districts" className="max-h-[80vh] w-full">
        {paths.map((x) => { const dist = districts.find((d) => d.slug === x.slug);
          const on = visited.includes(x.slug), dim = activeDivision && dist?.division !== activeDivision;
          const go = () => dist && (onSelect ? onSelect(dist.slug) : router.push(`/district/${dist.slug}`));
          return <path key={x.slug} data-slug={x.slug} d={x.d} tabIndex={0} role="link" aria-label={x.name}
            onMouseEnter={() => setHover(x.name)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(x.name)}
            onClick={go} onKeyDown={(e) => e.key === "Enter" && go()}
            className={`cursor-pointer stroke-white/80 transition-all duration-200 hover:fill-accent ${on ? "fill-bd-700" : "fill-bd-500/60"} ${dim ? "opacity-25" : ""}`} />; })}
      </svg>
      {hover && <figcaption className="pointer-events-none absolute left-3 top-3 rounded-full bg-bd-900 px-3 py-1 text-sm text-white shadow">{hover}</figcaption>}
      <p className="mt-2 text-xs opacity-60">Map boundaries: geoBoundaries (CC BY 4.0), geoboundaries.org</p>
    </figure>);
}
