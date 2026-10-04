"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const items = [["/", "Home", "🏠"], ["/explore", "Explore", "🧭"], ["/map", "Map", "🗺️"], ["/my", "My Bangladesh", "✅"], ["/more", "More", "⋯"]] as const;
function Theme() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const flip = () => { const d = !dark; setDark(d); document.documentElement.classList.toggle("dark", d);
    try { localStorage.setItem("bdx:theme", d ? "dark" : "light"); } catch {} };
  return <button onClick={flip} aria-label="Toggle dark mode" className="grid size-11 place-items-center rounded-full bg-white ring-1 ring-black/10 dark:bg-bd-900">{dark ? "☀️" : "🌙"}</button>;
}
export default function Nav() {
  const path = usePathname(); const on = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  return (<>
    <header className="sticky top-0 z-30 flex items-center justify-between bg-[#fbfaf6]/85 px-4 py-2 backdrop-blur dark:bg-[#0b1410]/85 md:px-8">
      <Link href="/" className="flex items-center gap-2 font-bold"><span className="grid size-9 place-items-center rounded-xl bg-bd-700 text-white">B<span className="ml-0.5 size-1.5 rounded-full bg-accent" /></span>Explorer</Link>
      <nav aria-label="Main" className="hidden gap-1 md:flex">{items.map(([h, l]) =>
        <Link key={h} href={h} className={`rounded-full px-4 py-2 text-sm ${on(h) ? "bg-bd-700 text-white" : "hover:bg-bd-50 dark:hover:bg-bd-900"}`}>{l}</Link>)}</nav>
      <Theme />
    </header>
    <nav aria-label="Mobile" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-black/5 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur dark:bg-bd-900/95 md:hidden">
      {items.map(([h, l, i]) => <Link key={h} href={h} aria-current={on(h) ? "page" : undefined}
        className={`flex min-h-16 flex-col items-center justify-center text-[11px] ${on(h) ? "font-semibold text-bd-700 dark:text-bd-500" : "opacity-70"}`}><span className="text-lg">{i}</span>{l === "My Bangladesh" ? "Mine" : l}</Link>)}
    </nav></>);
}
