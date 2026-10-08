# Martian Map — Integrated Regional 3D Models

The project now includes the seven regional GLB terrain models supplied with the Mars asset package.

## Where the assets live

- `public/models/regions/01_Tharsis.glb`
- `public/models/regions/02_Valles_Marineris.glb`
- `public/models/regions/03_Hellas_Isidis.glb`
- `public/models/regions/04_Elysium_Utopia.glb`
- `public/models/regions/05_Arabia_Meridiani.glb`
- `public/models/regions/06_North_Pole.glb`
- `public/models/regions/07_South_Pole.glb`

Preview images are in `public/models/regions/previews/`.

## Using them

Open the Mission Map and click **3D Terrain**. The regional terrain atlas appears over the viewer. Select a region to load its GLB model. Models are loaded lazily so the browser does not download all seven heavy files at startup.

**Globe** returns to the original interactive Mars globe, including site markers and route overlays.

The regional GLBs are normalized at runtime with a bounding box so the supplied models fit consistently inside the Three.js camera.
