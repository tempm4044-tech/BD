import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { destinations, getDestination } from "@/data/destinations";
import { getDistrict } from "@/data/districts";
import { categories } from "@/data/categories";
import { wiki, gallery } from "@/lib/wiki";
import Gallery from "@/components/Gallery";
import Photo, { WikiText } from "@/components/Photo";
import { DestActions } from "@/components/Actions";
export const generateStaticParams = () => destinations.map((d) => ({ slug: d.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = getDestination(params.slug); if (!d) return {};
  return { title: d.title, description: d.description ?? `${d.title}, ${getDistrict(d.district)?.name}, Bangladesh.` }; }
const Fact = ({ k, v }: { k: string; v: string | null }) => <div className="rounded-2xl bg-white p-4 dark:bg-bd-900"><dt className="text-xs opacity-60">{k}</dt><dd className="font-semibold">{v ?? "To be verified"}</dd></div>;
export const revalidate = 86400;
export default async function Page({ params }: { params: { slug: string } }) {
  const d = getDestination(params.slug); if (!d) notFound();
  const dist = getDistrict(d.district); const w = d.categories.includes("food") ? null : await wiki(`${d.title} ${dist?.name ?? ""} Bangladesh`); const pics = d.categories.includes("food") ? [] : await gallery(`${d.title} ${dist?.name ?? ""} Bangladesh`); const near = destinations.filter((x) => x.district === d.district && x.slug !== d.slug);
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-4 pb-28 md:p-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "TouristAttraction", name: d.title, containedInPlace: dist?.name }) }} />
      <header className="rounded-3xl bg-gradient-to-br from-bd-700 to-bd-900 p-8 text-white">
        <p className="text-sm opacity-80"><Link href={`/district/${dist?.slug}`} className="underline">{dist?.name}</Link></p>
        <h1 className="text-4xl font-bold">{d.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">{d.categories.map((c) => { const k = categories.find((x) => x.id === c); return k && <Link key={c} href={`/category/${c}`} className="rounded-full bg-white/15 px-3 py-1 text-sm">{k.emoji} {k.label}</Link>; })}</div></header>
      <Photo img={w?.image ?? d.cover} />
      <Gallery imgs={d.gallery.length ? d.gallery : pics} />
      <DestActions slug={d.slug} title={d.title} />
      {d.description ? <p>{d.description}</p> : w?.extract ? <WikiText w={w} /> : <p className="opacity-70">Description coming soon (needs a verified source).</p>}
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-3"><Fact k="Best time to visit" v={d.bestTime} /><Fact k="How to get there" v={d.howToReach} /><Fact k="Estimated budget" v={d.budget} /></dl>
      {w?.lat != null && w.lon != null && <section><h2 className="mb-2 font-semibold">Location</h2>
        <iframe title={`Map of ${d.title}`} loading="lazy" className="h-64 w-full rounded-3xl" src={`https://www.openstreetmap.org/export/embed.html?bbox=${w.lon - 0.05}%2C${w.lat - 0.05}%2C${w.lon + 0.05}%2C${w.lat + 0.05}&layer=mapnik&marker=${w.lat}%2C${w.lon}`} />
        <p className="mt-1 text-xs opacity-60">© OpenStreetMap contributors · auto-located from Wikipedia, please verify · <a className="underline" href={`https://www.openstreetmap.org/?mlat=${w.lat}&mlon=${w.lon}#map=13/${w.lat}/${w.lon}`}>Open larger map</a></p></section>}
      {near.length > 0 && <section><h2 className="mb-2 font-semibold">Nearby in {dist?.name}</h2><div className="flex flex-wrap gap-2">{near.map((n) => <Link key={n.slug} href={`/destination/${n.slug}`} className="rounded-full bg-white px-3 py-1.5 text-sm ring-1 ring-black/10 dark:bg-bd-900">{n.title}</Link>)}</div></section>}
    </main>); }
