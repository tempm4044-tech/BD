import { destinations } from "@/data/destinations";
import { getDistrict } from "@/data/districts";
import type { Destination } from "@/types";
export const interestList = ["Nature", "History", "Food", "Adventure", "Photography", "Relaxation"] as const;
const MAP: Record<string, string[]> = { Nature: ["nature", "forest", "waterfall", "river"], History: ["historical", "archaeology", "architecture"],
  Food: ["food"], Adventure: ["nature", "forest", "waterfall", "beach"], Photography: ["nature", "beach", "architecture", "historical"], Relaxation: ["beach", "nature", "river"] };
const SLOTS = ["Morning", "Afternoon", "Evening"];
export type Plan = { day: number; items: { slot: string; dest: Destination }[] }[];
export function makePlan(days: number, interests: string[], division?: string): Plan {
  const cats = new Set(interests.flatMap((i) => MAP[i] ?? []));
  const score = (d: Destination) => d.categories.filter((c) => cats.has(c)).length;
  let pool = destinations.filter((d) => !division || getDistrict(d.district)?.division === division);
  if (cats.size) pool = pool.filter((d) => score(d) > 0);
  const picks = [...pool].sort((a, b) => score(b) - score(a) || a.title.localeCompare(b.title)).slice(0, days * 3)
    .sort((a, b) => a.district.localeCompare(b.district)); // keep same-district places on the same day
  const out: Plan = [];
  for (let i = 0; i < picks.length; i += 3) out.push({ day: out.length + 1, items: picks.slice(i, i + 3).map((dest, j) => ({ slot: SLOTS[j], dest })) });
  return out;
}
