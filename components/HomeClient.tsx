"use client";
import { useState } from "react";
import Link from "next/link";
import BangladeshMap from "./BangladeshMap";
import { divisions } from "@/data/divisions";
import { search } from "@/lib/search";
import { useMyBangladesh } from "@/lib/useMyBangladesh";
export default function HomeClient() {
  const [q, setQ] = useState(""); const [div, setDiv] = useState<string>();
  const my = useMyBangladesh(); const hits = search(q);
  return (
    <main className="mx-auto grid max-w-6xl gap-6 p-4 pb-28 md:grid-cols-[1fr_1.1fr] md:p-8">
      <section className="space-y-5 self-start md:sticky md:top-8">
        <h1 className="text-3xl font-bold md:text-5xl">Bangladesh <span className="text-bd-700 dark:text-bd-500">Explorer</span></h1>
        <p className="text-lg opacity-80">Discover Bangladesh, One Place at a Time.</p>
        <div className="relative">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search districts, places, food…" aria-label="Search"
            className="h-14 w-full rounded-2xl bg-white px-5 shadow-sm ring-1 ring-black/5 dark:bg-bd-900" />
          {hits.length > 0 && <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-bd-900">
            {hits.map((h) => <li key={h.href}><Link href={h.href} className="block px-5 py-3 hover:bg-bd-50 dark:hover:bg-bd-700"><b>{h.title}</b> <span className="text-sm opacity-60">{h.sub}</span></Link></li>)}</ul>}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Divisions">
          {divisions.map((d) => <button key={d.id} onClick={() => setDiv(div === d.id ? undefined : d.id)} aria-pressed={div === d.id}
            className={`min-h-11 rounded-full px-4 text-sm transition ${div === d.id ? "bg-bd-700 text-white" : "bg-white ring-1 ring-black/10 dark:bg-bd-900"}`}>{d.name}</button>)}
        </div>
        <p className="text-sm">{my.visited.length} of 64 districts explored ({my.pct}%)</p>
      </section>
      <section><BangladeshMap visited={my.visited} activeDivision={div} /></section>
    </main>);
}
