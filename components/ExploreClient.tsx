"use client";
import { useState } from "react";
import Link from "next/link";
import { districts, getDistrict } from "@/data/districts";
import { divisions } from "@/data/divisions";
import { destinations } from "@/data/destinations";
import { categories } from "@/data/categories";
import { useMyBangladesh } from "@/lib/useMyBangladesh";
export default function ExploreClient() {
  const [tab, setTab] = useState<"districts" | "places">("districts"); const [div, setDiv] = useState(""); const [q, setQ] = useState(""); const [cat, setCat] = useState(""); const my = useMyBangladesh();
  const ql = q.toLowerCase();
  const list = districts.filter((d) => (!div || d.division === div) && (d.name.toLowerCase().includes(ql) || d.bn.includes(q)));
  const places = destinations.filter((x) => (!cat || x.categories.includes(cat)) && (!div || getDistrict(x.district)?.division === div) && (x.title.toLowerCase().includes(ql) || (getDistrict(x.district)?.name ?? "").toLowerCase().includes(ql)));
  const pill = (on: boolean) => `min-h-11 shrink-0 rounded-full px-4 text-sm ${on ? "bg-bd-700 text-white" : "bg-white ring-1 ring-black/10 dark:bg-bd-900"}`;
  return (
    <main className="mx-auto max-w-6xl space-y-5 p-4 pb-8 md:p-8">
      <h1 className="text-3xl font-bold">Explore</h1>
      <div className="flex gap-2" role="tablist"><button role="tab" aria-selected={tab === "districts"} onClick={() => setTab("districts")} className={pill(tab === "districts")}>Districts (64)</button><button role="tab" aria-selected={tab === "places"} onClick={() => setTab("places")} className={pill(tab === "places")}>Places ({destinations.length})</button></div>
      <div className="flex flex-wrap gap-3"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={tab === "districts" ? "Search district…" : "Search place or district…"} aria-label="Search" className="h-12 w-full rounded-2xl bg-white px-4 ring-1 ring-black/10 dark:bg-bd-900 md:max-w-md" />
        {tab === "places" && <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Category" className="h-12 rounded-2xl bg-white px-3 ring-1 ring-black/10 dark:bg-bd-900"><option value="">All categories</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}</select>}</div>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1" role="group" aria-label="Division filter">{[{ id: "", name: "All divisions" }, ...divisions].map((d) => <button key={d.id} onClick={() => setDiv(d.id)} aria-pressed={div === d.id} className={pill(div === d.id)}>{d.name}</button>)}</div>
      {tab === "districts" ? <>
        <p className="text-sm opacity-70">{list.length} districts</p>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">{list.map((d) => <li key={d.slug}><Link href={`/district/${d.slug}`} className="block rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-bd-900"><span className="text-xs opacity-60">{d.division}</span><b className="block">{d.name} {my.visited.includes(d.slug) && "✓"}</b><span className="text-sm opacity-70">{d.bn}</span></Link></li>)}</ul></> : <>
        <p className="text-sm opacity-70">{places.length} places</p>
        <ul className="grid gap-3 md:grid-cols-3">{places.map((x) => <li key={x.slug}><Link href={`/destination/${x.slug}`} className="block rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-bd-900"><b>{x.title}</b><span className="block text-sm opacity-60">{getDistrict(x.district)?.name} · {x.categories.map((c) => categories.find((k) => k.id === c)?.emoji).join(" ")}</span></Link></li>)}</ul>
        {!places.length && <p className="opacity-70">No places match.</p>}</>}
    </main>); }
