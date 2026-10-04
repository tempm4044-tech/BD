"use client";
import { useEffect, useState } from "react";
import { districts } from "@/data/districts";
import BangladeshMap from "./BangladeshMap";
import type { useMyBangladesh } from "@/lib/useMyBangladesh";
type My = ReturnType<typeof useMyBangladesh>;
const BG = "#f6f2e9", OFF = "#e5ddcd", ON = "#17805c", DARK = "#06281a", RED = "#e5383b";
const F = '"Nirmala UI","Noto Sans Bengali","Hind Siliguri",system-ui,sans-serif';
const bn = (v: number) => v.toLocaleString("bn-BD");
async function draw(visited: string[], name: string) {
  const src = document.getElementById("bd-map-svg") as unknown as SVGSVGElement | null; if (!src) throw new Error("no map");
  const clone = src.cloneNode(true) as SVGSVGElement; const a = src.querySelectorAll("path"), b = clone.querySelectorAll("path");
  const pts: { t: string; x: number; y: number }[] = [];
  a.forEach((p, i) => { const s = p.getAttribute("data-slug") || ""; const on = visited.includes(s);
    b[i].removeAttribute("class"); b[i].setAttribute("fill", on ? ON : OFF); b[i].setAttribute("stroke", BG); b[i].setAttribute("stroke-width", "0.7");
    if (on) { const bb = (p as unknown as SVGGraphicsElement).getBBox(); pts.push({ t: districts.find((d) => d.slug === s)?.bn ?? s, x: bb.x + bb.width / 2, y: bb.y + bb.height / 2 }); } });
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg"); clone.setAttribute("width", "600"); clone.setAttribute("height", "760");
  const img = new Image(); img.src = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: "image/svg+xml" })); await img.decode();
  const n = visited.length, pct = Math.round((n / 64) * 100);
  const dn = new Set(districts.filter((d) => visited.includes(d.slug)).map((d) => d.division)).size;
  const c = document.createElement("canvas"); c.width = 1200; c.height = 1500; const x = c.getContext("2d")!;
  x.fillStyle = BG; x.fillRect(0, 0, 1200, 1500); x.textAlign = "left"; x.textBaseline = "alphabetic";
  x.fillStyle = "#7b857f"; x.font = `600 28px ${F}`; x.fillText("Bangladesh Explorer", 80, 100);
  x.fillStyle = DARK; x.font = `800 84px ${F}`; x.fillText("আমার বাংলাদেশ", 80, 195);
  if (name) { x.fillStyle = ON; x.font = `700 40px ${F}`; x.fillText(name, 80, 255); }
  x.textAlign = "right"; x.font = `700 48px ${F}`; const w = x.measureText("/" + bn(64)).width; x.fillStyle = "#7b857f"; x.fillText("/" + bn(64), 1120, 205);
  x.fillStyle = ON; x.font = `800 150px ${F}`; x.fillText(bn(n), 1120 - w - 10, 205);
  const s = 1030 / 760, ox = (1200 - 600 * s) / 2, oy = 300; x.drawImage(img, ox, oy, 600 * s, 760 * s);
  x.textAlign = "center";
  pts.forEach((p) => { const px = ox + p.x * s, py = oy + p.y * s;
    x.beginPath(); x.arc(px, py, 7, 0, 7); x.fillStyle = RED; x.fill(); x.lineWidth = 3; x.strokeStyle = "#fff"; x.stroke();
    x.font = `700 24px ${F}`; x.lineWidth = 6; x.strokeStyle = "#fff"; x.strokeText(p.t, px, py - 16); x.fillStyle = DARK; x.fillText(p.t, px, py - 16); });
  x.fillStyle = OFF; x.beginPath(); x.roundRect(80, 1370, 1040, 22, 11); x.fill();
  if (n) { x.fillStyle = "#0a6a47"; x.beginPath(); x.roundRect(80, 1370, Math.max(40, (1040 * n) / 64), 22, 11); x.fill(); }
  x.textAlign = "left"; x.fillStyle = DARK; x.font = `700 36px ${F}`; x.fillText(`বাংলাদেশের ${bn(pct)}% ঘোরা হয়েছে`, 80, 1450);
  x.textAlign = "right"; x.fillStyle = "#7b857f"; x.font = `500 28px ${F}`; x.fillText(`${bn(n)}টি জেলা · ৮টির মধ্যে ${bn(dn)}টি বিভাগ`, 1120, 1450);
  x.textAlign = "center"; x.globalAlpha = 0.55; x.font = `500 18px ${F}`; x.fillText("Created By Motiur Rahman · Boundaries: geoBoundaries (CC BY 4.0)", 600, 1486);
  return c;
}
export default function TravelMap({ my }: { my: My }) {
  const [name, setName] = useState("");
  useEffect(() => { try { setName(localStorage.getItem("bdx:name") || ""); } catch {} }, []);
  const rename = (v: string) => { setName(v); try { localStorage.setItem("bdx:name", v); } catch {} };
  const save = async (type: "image/png" | "image/jpeg") => { try { const c = await draw(my.visited, name.trim());
    c.toBlob((b) => { if (!b) return; const l = document.createElement("a"); l.href = URL.createObjectURL(b); l.download = `my-bangladesh-map.${type === "image/png" ? "png" : "jpg"}`; l.click(); }, type, 0.92); } catch { alert("Map is not loaded yet."); } };
  const pdf = async () => { try { const c = await draw(my.visited, name.trim()); const w = window.open("", "_blank"); if (!w) return;
    w.document.write(`<img src="${c.toDataURL("image/png")}" style="width:100%;max-width:700px">`); w.document.close(); setTimeout(() => w.print(), 500); } catch { alert("Map is not loaded yet."); } };
  const btn = "min-h-12 rounded-full bg-white px-5 text-sm font-medium ring-1 ring-black/10 active:scale-95 dark:bg-bd-900";
  return (
    <section className="space-y-3"><h2 className="font-semibold">Select districts you have visited</h2>
      <p className="text-sm opacity-70">Tap a district on the map (or tick it in the list below), type your name, then download your travel map.</p>
      <BangladeshMap visited={my.visited} onSelect={(s) => my.toggle("visited", s)} />
      <input value={name} onChange={(e) => rename(e.target.value)} maxLength={40} placeholder="Your name (shown on the image)" aria-label="Your name" className="h-12 w-full rounded-2xl bg-white px-4 ring-1 ring-black/10 dark:bg-bd-900 md:max-w-sm" />
      <div className="flex flex-wrap gap-2">
        <button className={btn} onClick={() => districts.filter((d) => !my.visited.includes(d.slug)).forEach((d) => my.toggle("visited", d.slug))}>Select all</button>
        <button className={btn} onClick={() => [...my.visited].forEach((s) => my.toggle("visited", s))}>Clear</button>
        <button className={`${btn} !bg-bd-700 !text-white`} onClick={() => save("image/png")}>↓ PNG</button>
        <button className={`${btn} !bg-bd-700 !text-white`} onClick={() => save("image/jpeg")}>↓ JPG</button>
        <button className={`${btn} !bg-bd-700 !text-white`} onClick={pdf}>↓ PDF (Save as PDF)</button></div>
      <details className="rounded-2xl bg-white p-4 dark:bg-bd-900"><summary className="cursor-pointer font-medium">Choose from list</summary>
        <ul className="mt-3 grid grid-cols-2 gap-1 md:grid-cols-3">{districts.map((d) => <li key={d.slug}><label className="flex min-h-11 items-center gap-2"><input type="checkbox" checked={my.visited.includes(d.slug)} onChange={() => my.toggle("visited", d.slug)} className="size-5 accent-bd-700" />{d.name}</label></li>)}</ul></details>
    </section>);
}
