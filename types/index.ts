export type Img = { url: string; alt: string; credit: string | null; source: string | null; placeholder?: boolean };
export type Sourced<T> = { value: T | null; source: string | null }; // null until verified
export type Division = { id: string; name: string; bn: string; cover: Img | null; description: string | null };
export type District = { slug: string; name: string; bn: string; division: string;
  shortDescription: string | null; area: Sourced<number>; population: Sourced<number>;
  coordinates: Sourced<[number, number]>; cover: Img | null; gallery: Img[]; destinations: string[] };
export type Destination = { slug: string; title: string; district: string; categories: string[];
  description: string | null; history: string | null; coordinates: Sourced<[number, number]>;
  bestTime: string | null; howToReach: string | null; budget: string | null;
  cover: Img | null; gallery: Img[]; sources: string[] };
export type Category = { id: string; label: string; emoji: string };
