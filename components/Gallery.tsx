"use client";
import { useCallback, useEffect, useState } from "react";
import type { Img } from "@/types";
export default function Gallery({ imgs }: { imgs: Img[] }) {
  const [i, setI] = useState<number | null>(null); const [tx, setTx] = useState(0);
  const go = useCallback((d: number) => setI((v) => (v === null ? v : (v + d + imgs.length) % imgs.length)), [imgs.length]);
  useEffect(() => { if (i === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setI(null); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [i, go]);
  if (!imgs.length) return null;
  const cur = i === null ? null : imgs[i];
  const fs = () => { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.(); };
  const nb = "grid size-12 place-items-center rounded-full bg-white/15 text-xl";
  return (
    <section aria-label="Photo gallery"><h2 className="mb-2 font-semibold">Photos</h2>
      <ul className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-3 md:px-0">{imgs.map((m, n) => <li key={m.url} className="w-56 shrink-0 snap-start md:w-auto">
        <button onClick={() => setI(n)} aria-label={`Open photo ${n + 1}`} className="block w-full"><img src={m.url} alt={m.alt} loading="lazy" className="h-40 w-full rounded-2xl object-cover transition hover:opacity-90" /></button></li>)}</ul>
      <p className="mt-1 text-xs opacity-60">Photos from Wikimedia Commons with their licenses, auto-matched, please verify.</p>
      {cur && <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white"
        onTouchStart={(e) => setTx(e.touches[0].clientX)} onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); }}>
        <div className="flex items-center justify-between p-3"><span className="text-sm">{(i ?? 0) + 1} / {imgs.length}</span>
          <div className="flex gap-2"><button onClick={fs} aria-label="Fullscreen" className={nb}>⛶</button><button onClick={() => setI(null)} aria-label="Close" className={nb}>✕</button></div></div>
        <div className="flex min-h-0 flex-1 items-center justify-center px-2"><img src={cur.url} alt={cur.alt} className="max-h-full max-w-full object-contain" /></div>
        <div className="flex items-center justify-between gap-3 p-3"><button onClick={() => go(-1)} aria-label="Previous photo" className={nb}>‹</button>
          <p className="truncate text-center text-xs opacity-80">Photo: {cur.credit} {cur.source && <a href={cur.source} className="underline">source</a>}</p>
          <button onClick={() => go(1)} aria-label="Next photo" className={nb}>›</button></div></div>}
    </section>);
}
