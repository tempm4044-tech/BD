"use client";
import { useEffect, useState, useCallback } from "react";
type S = { visited: string[]; favorites: string[]; wishlist: string[]; trip: string[] };
const KEY = "bdx:my"; const empty: S = { visited: [], favorites: [], wishlist: [], trip: [] };
export function useMyBangladesh() {
  const [s, setS] = useState<S>(empty);
  useEffect(() => { try { setS({ ...empty, ...JSON.parse(localStorage.getItem(KEY) || "{}") }); } catch {} }, []);
  const toggle = useCallback((k: keyof S, id: string) => setS((p) => {
    const next = { ...p, [k]: p[k].includes(id) ? p[k].filter((x) => x !== id) : [...p[k], id] };
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {} return next; }), []);
  return { ...s, toggle, pct: Math.round((s.visited.length / 64) * 10000) / 100 };
}
