# Martian Map — Mission Lab Pro Expansion

This is the full React + Vite / TanStack Router project, upgraded with an expanded Mission Lab workspace.

## What's new
- Mission Lab is now a multi-page workspace with Overview, 3D Terrain, Survival Simulator, Region Library, Landing Sites, Mission Planner, and Research & Data.
- The 3D Terrain page uses the existing interactive `MarsExplorer` component in regional mode and gives it a larger viewing area.
- The Region Library includes all 46 supplied Mars location images under `public/mars-terrain-library/`, with category filters and direct image links.
- The existing 7 bundled regional GLB terrain models remain under `public/models/regions/`.
- The home route and other existing pages were left in place.

## Run locally
Requirements: Node.js 20+ (Node.js 22 recommended).

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

## Mission Lab navigation
- Overview — workspace dashboard and quick-launch cards.
- 3D Terrain — immersive regional model viewer.
- Survival Sim — existing sol-by-sol survival simulator.
- Region Library — 46 image references grouped by geological category.
- Landing Sites — mission location reference cards.
- Mission Planner — client-side draft planner; generate and copy a mission brief.
- Research — science context and data provenance notes.

## Asset limitations
The 46 PNGs are image references, not interactive 3D models. The 3D viewer continues to use the 7 existing GLB files. Planning scores and brief values are illustrative, not operational recommendations. Verify scientific claims against authoritative mission datasets before using them outside this educational project.

## Build verification
The Mission Lab TSX file passed a TypeScript/JSX syntax transpilation check. A full dependency install and production build could not be completed in this environment because `npm install` timed out, so please run `npm install` and `npm run build` locally before deployment.
