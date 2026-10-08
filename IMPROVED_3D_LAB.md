# Martian Map — 3D Lab Update

This build keeps the Home page mission hero structure, but replaces the placeholder/procedural Mars sphere with the bundled local NASA/Mars GLTF globe asset.

The **Mission Lab** now opens directly in **3D Terrain** mode. The terrain viewer was redesigned for the 7 supplied regional GLB datasets with:

- larger presentation-scale viewport
- oblique terrain camera for readable relief
- bottom dataset filmstrip with previews
- dedicated dark terrain stage
- improved lighting and contrast
- drag/orbit + scroll zoom controls
- simulator remains a separate tab

Regional models:
- Tharsis
- Valles Marineris
- Hellas / Isidis
- Elysium / Utopia
- Arabia / Meridiani
- North Pole
- South Pole

Run:

```powershell
npm install
npm run dev
```
