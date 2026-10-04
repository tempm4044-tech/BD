import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { destinations } from "@/data/destinations";
import { getDistrict } from "@/data/districts";
export const generateStaticParams = () => categories.map((c) => ({ id: c.id }));
export function generateMetadata({ params }: { params: { id: string } }) { return { title: categories.find((c) => c.id === params.id)?.label }; }
export default function Page({ params }: { params: { id: string } }) {
  const c = categories.find((x) => x.id === params.id); if (!c) notFound();
  const list = destinations.filter((d) => d.categories.includes(c.id));
  return <main className="mx-auto max-w-4xl space-y-4 p-4 pb-28 md:p-8"><h1 className="text-3xl font-bold">{c.emoji} {c.label}</h1>
    {list.length ? <ul className="grid gap-3 md:grid-cols-2">{list.map((d) => <li key={d.slug}><Link href={`/destination/${d.slug}`} className="block rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 dark:bg-bd-900"><b>{d.title}</b><span className="block text-sm opacity-60">{getDistrict(d.district)?.name}</span></Link></li>)}</ul>
      : <p className="opacity-70">No places in this category yet.</p>}</main>; }
