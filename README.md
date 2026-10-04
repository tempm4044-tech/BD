# Bangladesh Explorer
Created By Motiur Rahman. Next.js 14 + TypeScript + Tailwind. No paid services, no API keys.

## Run
`npm install` then `npm run dev` (http://localhost:3000). Production: `npm run build` then `npm start`.

## Deploy
1. GitHub: create an empty repo, then in the project folder: `git init`, `git add .`, `git commit -m "first"`, `git branch -M main`, `git remote add origin <repo-url>`, `git push -u origin main`.
2. Vercel: vercel.com > Add New > Project > import the repo > Deploy. Optional env var: `NEXT_PUBLIC_SITE_URL` (your live address, used by the sitemap).

## Data (data)
- `districts.ts`: add facts per district (area, population, coordinates as `{ value, source }`). Leave null until verified.
- `destinations.ts`: one line per place `slug|Name|district-slug|category,category`. Fill description/bestTime/howToReach/budget/coordinates on the object when verified.
- Photos: automatically looked up on Wikipedia/Wikimedia Commons (license + author shown). To use your own, set `cover` / `gallery` on a destination: `{ url, alt, credit, source }`. Own cover wins over the auto photo only if you remove the auto lookup in the page.
- Map: `public/geo/bd-districts.geojson` (geoBoundaries ADM2, CC BY 4.0). Unmatched names are logged in the browser console; add spellings to `ALIAS` in `BangladeshMap.tsx`.

## Later: database / login
Replace the `localStorage` hook `lib/useMyBangladesh.ts` with calls to a backend (e.g. Supabase or Firebase Auth + a table of visited/favorites per user). Components don't need to change.
