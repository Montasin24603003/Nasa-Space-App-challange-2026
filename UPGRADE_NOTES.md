# Mars // Survive — Frontend Upgrade

## What changed
- Reworked the homepage into a mission-control experience.
- Added live-style telemetry cards for suit power, water, temperature, radiation, wind, slope, science targets, and relay status.
- Added interactive map-layer toggles: Terrain, Hazards, Resources, Rovers, Route.
- Added an interactive route arc between indexed Martian waypoints.
- Added richer waypoint cards with terrain, resources, rover, science, radiation, and temperature context.
- Added a simulated route-planning panel.
- Added a Marswalk briefing overlay for hackathon demonstrations.
- Added a science brief and EVA readiness checklist.
- Added a procedural Mars 3D fallback so the website still runs when the hosted GLB is unavailable.
- Added local GLB loading support from `public/models/mars.glb`.

## Run locally

```bash
npm install
npm run dev
```

## Add your 3D model

Copy your `.glb` file to:

```text
public/models/mars.glb
```

The frontend loads that file automatically. If it is missing, the app falls back to a procedural Mars globe.

## Data note

The mission telemetry, route values, and some planning figures in this demo are simulated UI values. Replace them with validated NASA datasets/APIs before presenting them as operational data.
