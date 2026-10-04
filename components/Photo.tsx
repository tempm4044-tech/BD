import type { Img } from "@/types";
import type { Wiki } from "@/lib/wiki";
export default function Photo({ img }: { img: Img | null }) {
  if (!img) return null;
  return <figure><img src={img.url} alt={img.alt} loading="lazy" className="max-h-[420px] w-full rounded-3xl object-cover" />
    <figcaption className="mt-1 text-xs opacity-60">Photo: {img.credit} · <a href={img.source ?? "#"} className="underline">Wikimedia Commons</a> · auto-matched, please verify</figcaption></figure>;
}
export function WikiText({ w }: { w: Wiki }) {
  if (!w.extract) return null;
  return <div><p>{w.extract}</p><p className="mt-1 text-xs opacity-60">Source: <a href={w.url} className="underline">Wikipedia: {w.title}</a> (CC BY-SA 4.0), auto-matched, please verify.</p></div>;
}
