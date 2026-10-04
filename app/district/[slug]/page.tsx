import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { districts, getDistrict } from "@/data/districts";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { wiki, gallery } from "@/lib/wiki";
import Gallery from "@/components/Gallery";
import Photo, { WikiText } from "@/components/Photo";
import { divisions } from "@/data/divisions";
import { VisitedButtons, ShareButton } from "@/components/Actions";
export const generateStaticParams = () => districts.map((d) => ({ slug: d.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = getDistrict(params.slug); if (!d) return {};
  return { title: d.name, description: d.shortDescription ?? `Explore ${d.name} district, Bangladesh.` }; }
const Fact = ({ k, v }: { k: string; v: string | null }) => (
  <div className="rounded-2xl bg-white p-4 dark:bg-bd-900"><dt className="text-xs opacity-60">{k}</dt><dd className="font-semibold">{v ?? "To be verified"}</dd></div>);
export const revalidate = 86400;
export default async function DistrictPage({ params }: { params: { slug: string } }) {
  const d = getDistrict(params.slug); if (!d) notFound();
  const div = divisions.find((v) => v.id === d.division)!;
  const first = destinations.find((x) => x.district === d.slug && !x.categories.includes("food"));
  const [info, pic, gal] = await Promise.all([wiki(`${d.name} District Bangladesh`, false), first ? wiki(`${first.title} ${d.name} Bangladesh`) : null, gallery(`${d.name} District Bangladesh`, 4)]);
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-4 pb-28 md:p-8">
      <header className="rounded-3xl bg-gradient-to-br from-bd-700 to-bd-900 p-8 text-white">
        <p className="text-sm opacity-80"><Link href={`/division/${div.id}`} className="underline">{div.name} Division</Link></p>
        <h1 className="text-4xl font-bold">{d.name} <span className="font-normal opacity-80">{d.bn}</span></h1>
        <p className="mt-2 opacity-80">{d.shortDescription ?? "Description coming soon. Cover image placeholder."}</p>
      </header>
      <Photo img={pic?.image ?? null} />
      <Gallery imgs={gal} />
      {info?.extract && <WikiText w={info} />}
      <div className="flex flex-wrap gap-2"><VisitedButtons slug={d.slug} /><ShareButton title={d.name} /></div>
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Fact k="Division" v={div.name} /><Fact k="Area" v={d.area.value != null ? String(d.area.value) : null} />
        <Fact k="Population" v={d.population.value != null ? String(d.population.value) : null} />
        <Fact k="Coordinates" v={d.coordinates.value ? d.coordinates.value.join(", ") : null} /></dl>
      {destinations.some((x) => x.district === d.slug) && <section><h2 className="mb-2 font-semibold">Places in {d.name}</h2><div className="flex flex-wrap gap-2">{destinations.filter((x) => x.district === d.slug).map((x) => <Link key={x.slug} href={`/destination/${x.slug}`} className="rounded-full bg-white px-4 py-2 text-sm ring-1 ring-black/10 dark:bg-bd-900">{x.title}</Link>)}</div></section>}
    </main>); }
