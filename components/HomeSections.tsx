import Link from "next/link";
import { categories } from "@/data/categories";
import { destinations } from "@/data/destinations";
import { getDistrict } from "@/data/districts";
import { wiki } from "@/lib/wiki";
export default async function HomeSections() {
  const list = destinations.slice(0, 9); const info = await Promise.all(list.map((d) => wiki(`${d.title} ${getDistrict(d.district)?.name} Bangladesh`)));
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 pb-8 md:px-8">
      <section><h2 className="mb-3 text-xl font-bold">Explore by category</h2>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">{categories.map((c) => <Link key={c.id} href={`/category/${c.id}`} className="min-h-11 shrink-0 rounded-full bg-white px-4 py-2.5 text-sm ring-1 ring-black/10 dark:bg-bd-900">{c.emoji} {c.label}</Link>)}</div></section>
      <section><h2 className="mb-3 text-xl font-bold">Places to discover</h2>
        <ul className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:px-0">{list.map((d, i) => { const im = info[i]?.image; return <li key={d.slug} className="w-64 shrink-0 snap-start md:w-auto">
          <Link href={`/destination/${d.slug}`} className="block overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:bg-bd-900">
            {im ? <img src={im.url} alt={im.alt} loading="lazy" className="h-40 w-full object-cover" /> : <div className="h-40 bg-bd-50 dark:bg-bd-700/30" />}
            <div className="p-4"><b>{d.title}</b><span className="block text-sm opacity-60">{getDistrict(d.district)?.name}</span>{im && <span className="mt-1 block truncate text-[10px] opacity-50">Photo: {im.credit}</span>}</div></Link></li>; })}</ul></section>
      <Link href="/plan" className="block rounded-3xl bg-bd-700 p-6 text-white"><b className="text-xl">Plan your trip →</b><span className="block opacity-80">Pick days and interests, get a suggested itinerary.</span></Link>
    </div>); }
