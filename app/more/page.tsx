import Link from "next/link";
import { categories } from "@/data/categories";
import { divisions } from "@/data/divisions";
export const metadata = { title: "More" };
const chip = "min-h-11 rounded-full bg-white px-4 py-2.5 text-sm ring-1 ring-black/10 dark:bg-bd-900";
export default function P() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 p-4 pb-8 md:p-8">
      <h1 className="text-3xl font-bold">More</h1>
      <Link href="/plan" className="block rounded-3xl bg-bd-700 p-6 text-white"><b className="text-xl">Plan my trip →</b><span className="block opacity-80">Pick days, interests and division to get a suggested itinerary.</span></Link>
      <section><h2 className="mb-2 font-semibold">Categories</h2><div className="flex flex-wrap gap-2">{categories.map((c) => <Link key={c.id} href={`/category/${c.id}`} className={chip}>{c.emoji} {c.label}</Link>)}</div></section>
      <section><h2 className="mb-2 font-semibold">Divisions</h2><div className="flex flex-wrap gap-2">{divisions.map((d) => <Link key={d.id} href={`/division/${d.id}`} className={chip}>{d.name}</Link>)}</div></section>
      <section><h2 className="mb-2 font-semibold">Browse</h2><div className="flex flex-wrap gap-2"><Link href="/explore" className={chip}>All 64 districts</Link><Link href="/map" className={chip}>Map</Link><Link href="/my" className={chip}>My Bangladesh</Link></div></section>
      <p className="text-sm opacity-70">Bangladesh Explorer is an independent, original project. Facts and photos are added only when verified or sourced; empty fields say "To be verified". Photos and summaries come from Wikipedia and Wikimedia Commons with credit.</p>
    </main>); }
