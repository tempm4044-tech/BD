"use client";
import { useState } from "react";
import Link from "next/link";
import { divisions } from "@/data/divisions";
import { interestList, makePlan } from "@/lib/planner";
export default function PlanClient() {
  const [days, setDays] = useState(2); const [sel, setSel] = useState<string[]>([]); const [div, setDiv] = useState(""); const [budget, setBudget] = useState("Medium");
  const [go, setGo] = useState(false); const plan = go ? makePlan(days, sel, div || undefined) : [];
  const chip = (on: boolean) => `min-h-11 rounded-full px-4 text-sm ${on ? "bg-bd-700 text-white" : "bg-white ring-1 ring-black/10 dark:bg-bd-900"}`;
  return (
    <main className="mx-auto max-w-3xl space-y-5 p-4 pb-28 md:p-8">
      <h1 className="text-3xl font-bold">Plan my trip</h1>
      <label className="block">Days: <b>{days}</b><input type="range" min={1} max={7} value={days} onChange={(e) => setDays(+e.target.value)} className="mt-2 block w-full accent-bd-700" /></label>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Interests">{interestList.map((i) => <button key={i} aria-pressed={sel.includes(i)} onClick={() => setSel(sel.includes(i) ? sel.filter((x) => x !== i) : [...sel, i])} className={chip(sel.includes(i))}>{i}</button>)}</div>
      <div className="flex flex-wrap gap-3">
        <select value={div} onChange={(e) => setDiv(e.target.value)} aria-label="Division" className="h-12 rounded-2xl bg-white px-3 ring-1 ring-black/10 dark:bg-bd-900"><option value="">Any division</option>{divisions.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select>
        <select value={budget} onChange={(e) => setBudget(e.target.value)} aria-label="Budget" className="h-12 rounded-2xl bg-white px-3 ring-1 ring-black/10 dark:bg-bd-900"><option>Low</option><option>Medium</option><option>High</option></select></div>
      <p className="text-xs opacity-60">Budget is saved for later; costs aren't estimated until verified cost data is added.</p>
      <button onClick={() => setGo(true)} className="min-h-12 rounded-full bg-bd-700 px-6 font-medium text-white active:scale-95">Suggest itinerary</button>
      {go && !plan.length && <p>No matching destinations yet. Add more destinations or change interests.</p>}
      {plan.map((d) => <section key={d.day} className="rounded-3xl bg-white p-5 dark:bg-bd-900"><h2 className="font-bold">Day {d.day}</h2>
        <ul className="mt-2 space-y-2">{d.items.map((i) => <li key={i.dest.slug}><span className="text-xs opacity-60">{i.slot}</span> <Link href={`/destination/${i.dest.slug}`} className="block font-medium underline-offset-2 hover:underline">{i.dest.title}</Link></li>)}</ul></section>)}
      {plan.length > 0 && <p className="text-xs opacity-60">Travel times between places are not estimated.</p>}
    </main>);
}
