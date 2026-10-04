import Link from "next/link";
import { notFound } from "next/navigation";
import { divisions } from "@/data/divisions";
import { districts } from "@/data/districts";
import { destinations } from "@/data/destinations";
import { wiki } from "@/lib/wiki";
import { WikiText } from "@/components/Photo";
export const revalidate = 86400;
export const generateStaticParams = () => divisions.map((d) => ({ id: d.id }));
export function generateMetadata({ params }: { params: { id: string } }) { return { title: `${divisions.find((d) => d.id === params.id)?.name} Division` }; }
export default async function Page({ params }: { params: { id: string } }) {
  const v = divisions.find((d) => d.id === params.id); if (!v) notFound();
  const ds = districts.filter((d) => d.division === v.id); const places = destinations.filter((x) => ds.some((d) => d.slug === x.district));
  const w = await wiki(`${v.name} Division Bangladesh`, false);
  const chip = "rounded-full bg-white px-4 py-2 text-sm ring-1 ring-black/10 dark:bg-bd-900";
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-4 pb-8 md:p-8">
      <header className="rounded-3xl bg-gradient-to-br from-bd-700 to-bd-900 p-8 text-white"><h1 className="text-4xl font-bold">{v.name} <span className="font-normal opacity-80">{v.bn}</span></h1><p className="opacity-80">{ds.length} districts</p></header>
      {w && <WikiText w={w} />}
      <section><h2 className="mb-2 font-semibold">Districts</h2><div className="flex flex-wrap gap-2">{ds.map((d) => <Link key={d.slug} href={`/district/${d.slug}`} className={chip}>{d.name}</Link>)}</div></section>
      {places.length > 0 && <section><h2 className="mb-2 font-semibold">Places ({places.length})</h2><div className="flex flex-wrap gap-2">{places.map((x) => <Link key={x.slug} href={`/destination/${x.slug}`} className={chip}>{x.title}</Link>)}</div></section>}
    </main>); }
