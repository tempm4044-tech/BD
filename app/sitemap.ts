import type { MetadataRoute } from "next";
import { districts } from "@/data/districts";
import { destinations } from "@/data/destinations";
import { categories } from "@/data/categories";
const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => ({ url: base + p });
  return [...["", "/explore", "/map", "/plan", "/my"].map(u), ...districts.map((d) => u(`/district/${d.slug}`)),
    ...destinations.map((d) => u(`/destination/${d.slug}`)), ...categories.map((c) => u(`/category/${c.id}`))];
}
