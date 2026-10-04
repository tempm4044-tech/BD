export type Badge = { id: string; label: string; desc: string; need: number };
export const badges: Badge[] = [
  { id: "first", label: "First Journey", desc: "Visit your first district", need: 1 },
  { id: "d10", label: "10 Districts", desc: "Visit 10 districts", need: 10 },
  { id: "d25", label: "25 Districts", desc: "Visit 25 districts", need: 25 },
  { id: "d50", label: "50 Districts", desc: "Visit 50 districts", need: 50 },
  { id: "d64", label: "All 64 Districts", desc: "Visit every district", need: 64 }];
// Nature / History / Food Explorer badges need destination data (categories) – add once destinations.ts is filled.
