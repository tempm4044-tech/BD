import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
export const metadata: Metadata = {
  title: { default: "Bangladesh Explorer", template: "%s · Bangladesh Explorer" },
  description: "Discover Bangladesh, One Place at a Time. Explore 8 divisions and 64 districts.",
  openGraph: { title: "Bangladesh Explorer", description: "Discover Bangladesh, One Place at a Time.", type: "website" } };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('bdx:theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}" }} /></head><body><Nav />{children}<footer className="px-4 pb-24 pt-2 text-center text-sm md:pb-6"><span className="opacity-70">Created By</span> <b className="font-bold text-bd-700 dark:text-bd-500">Motiur Rahman</b></footer></body></html>; }
