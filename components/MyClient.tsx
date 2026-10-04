"use client";
import Link from "next/link";
import TravelMap from "./TravelMap";
import { districts } from "@/data/districts";
import { badges } from "@/lib/achievements";
import { useMyBangladesh } from "@/lib/useMyBangladesh";
const nm = (s: string) => districts.find((d) => d.slug === s)?.name ?? s;
export default function MyClient() {
  const my = useMyBangladesh(); const n = my.visited.length, C = 2 * Math.PI * 52;
  const List = ({ t, ids }: { t: string; ids: string[] }) => <section><h2 className="mb-2 font-semibold">{t} ({ids.length})</h2>
    <div className="flex flex-wrap gap-2">{ids.length ? ids.map((s) => <Link key={s} href={`/district/${s}`} className="rounded-full bg-white px-3 py-1.5 text-sm ring-1 ring-black/10 dark:bg-bd-900">{nm(s)}</Link>) : <span className="text-sm opacity-60">None yet</span>}</div></section>;
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-4 pb-28 md:p-8">
      <h1 className="text-3xl font-bold">My Bangladesh</h1>
      <div className="flex items-center gap-6 rounded-3xl bg-white p-6 dark:bg-bd-900">
        <svg viewBox="0 0 120 120" className="size-28 -rotate-90" role="img" aria-label={`${my.pct}% explored`}>
          <circle cx="60" cy="60" r="52" fill="none" strokeWidth="10" className="stroke-bd-50 dark:stroke-bd-700/40" />
          <circle cx="60" cy="60" r="52" fill="none" strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - n / 64)} className="stroke-bd-500 transition-all duration-700" /></svg>
        <div><p className="text-3xl font-bold">{my.pct}%</p><p>{n} of 64 districts explored</p><p className="text-sm opacity-60">{64 - n} remaining</p></div></div>
      <TravelMap my={my} />
      <section><h2 className="mb-2 font-semibold">Achievements</h2>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">{badges.map((b) => { const u = n >= b.need;
          return <li key={b.id} className={`rounded-2xl p-4 ${u ? "bg-bd-700 text-white" : "bg-white opacity-60 dark:bg-bd-900"}`}><span className="text-2xl">{u ? "🏅" : "🔒"}</span><b className="block">{b.label}</b><span className="text-xs">{b.desc}</span></li>; })}</ul></section>
      <List t="Visited" ids={my.visited} /><List t="Wishlist" ids={my.wishlist} /><List t="Favorites" ids={my.favorites} />
      <p className="text-xs opacity-60">Saved only in this browser. No login needed.</p>
    </main>);
}
