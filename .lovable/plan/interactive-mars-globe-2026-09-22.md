# Interactive Mars Globe

## Goal
Replace the static map preview on the main page with a real, textured 3D Mars explorer using the uploaded model, while keeping the existing mission-control visual style.

## What I’ll build
- A large interactive Mars globe that users can drag to rotate and scroll or pinch to zoom.
- Gentle automatic rotation that pauses during interaction, plus a reset-view control.
- Selectable mission locations on the globe, including Jezero Crater, Olympus Mons, Valles Marineris, Gale Crater, and Utopia Planitia.
- A synchronized information panel showing each location’s coordinates, terrain, scientific importance, main survival concern, and useful resources.
- A compact Mars facts strip covering gravity, day length, atmosphere, average temperature, and Earth distance.
- Clear loading and unsupported-device states so the page never appears blank.
- Mobile and desktop layouts that preserve readable details and usable touch controls.
- Visible attribution for the uploaded CC BY 4.0 Mars model by Nestaeric.

## Technical details
- Convert the uploaded multi-file glTF package into one optimized GLB, then serve it through the project asset system.
- Add React Three Fiber, Three.js, and Drei for rendering, model loading, labels, and orbit controls.
- Keep the 3D view client-only to avoid server-rendering issues.
- Use accessible HTML controls and information panels over the 3D canvas rather than rendering text inside WebGL.
- Preserve the existing color tokens, typography, navigation, and supporting site cards.
- Complete required social metadata on all content pages while touching the routes.

## Verification
- Check the globe loads with its texture and lighting rather than a blank canvas.
- Test rotation, zoom, location selection, reset, and information updates.
- Verify desktop and mobile layouts and confirm there are no browser errors or missing model files.
