"use client";
import { useState } from "react";
import { useMyBangladesh } from "@/lib/useMyBangladesh";
export function VisitedButtons({ slug }: { slug: string }) {
  const my = useMyBangladesh();
  const B = ({ k, on, off }: { k: "visited" | "favorites" | "wishlist"; on: string; off: string }) => {
    const a = my[k].includes(slug);
    return <button onClick={() => my.toggle(k, slug)} aria-pressed={a}
      className={`min-h-12 rounded-full px-5 text-sm font-medium transition active:scale-95 ${a ? "bg-bd-700 text-white" : "bg-white ring-1 ring-black/10 dark:bg-bd-900"}`}>{a ? on : off}</button>; };
  return <div className="flex flex-wrap gap-2"><B k="visited" on="✓ Visited" off="Mark visited" /><B k="wishlist" on="★ In wishlist" off="Want to visit" /><B k="favorites" on="♥ Favorite" off="Favorite" /></div>;
}
export function ShareButton({ title }: { title: string }) {
  const [msg, setMsg] = useState("");
  const go = async () => { const url = location.href;
    try { if (navigator.share) await navigator.share({ title, url }); else { await navigator.clipboard.writeText(url); setMsg("Link copied"); setTimeout(() => setMsg(""), 2000); } } catch {} };
  return <button onClick={go} className="min-h-12 rounded-full bg-white px-5 text-sm ring-1 ring-black/10 dark:bg-bd-900">{msg || "Share"}</button>;
}
export function DestActions({ slug, title }: { slug: string; title: string }) {
  const my = useMyBangladesh();
  const T = ({ k, on, off }: { k: "favorites" | "trip"; on: string; off: string }) => { const a = my[k].includes(slug);
    return <button onClick={() => my.toggle(k, slug)} aria-pressed={a} className={`min-h-12 rounded-full px-5 text-sm font-medium transition active:scale-95 ${a ? "bg-bd-700 text-white" : "bg-white ring-1 ring-black/10 dark:bg-bd-900"}`}>{a ? on : off}</button>; };
  return <div className="flex flex-wrap gap-2"><T k="favorites" on="♥ In My Places" off="Add to My Places" /><T k="trip" on="✓ In Trip" off="Add to Trip" /><ShareButton title={title} /></div>;
}
