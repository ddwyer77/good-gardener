# Retro art sources

The user supplied the horizon banner, bird, Yosemite image, penguins, potted plant, and chrome/black peace symbols. The horizon appears once on the homepage. The bird, Yosemite, and penguin references are retained in the local asset folder but are currently removed from the visible site. Repeating plants and peace symbols are explicitly requested decorative exceptions to the earlier unique-photo rule.

## 3D models
Generated from the user-approved plant and chrome peace references using fal Tripo P2 image-to-3D, one run per model. Meshy CLI was available but not authenticated; the existing fal connector handled generation. Upload to fal public CDN was explicitly approved in chat. Plant target: 2,500 faces, textured. Peace target: 1,500 faces, PBR textured. Actual provider charges were not returned; price API reported USD 0.01 per credit without a per-job credit count.

- Plant request: `01a0c7a6-926b-7712-8ccd-c329462f8f33`
- Peace request: `01a0c7a6-f87e-7d73-88a6-755783fa0e73`
- Local GLBs: `dist/assets/models/plant.glb`, `dist/assets/models/peace.glb`
- The black peace variant uses the same mesh with a matte-black material.

## Reference direction
- https://www.youtube.com/watch?v=choF4hqrbz4 — transcript reviewed; crude late-1990s 3D forms and short whimsical loops.
- https://marshdotcom.neocities.org/ — badge density, homemade layout and bright web graphics.
- https://neocities.org/browse?tag=y2k — supporting aesthetic reference.
- https://animationfactory.com/search.php?keys=animals&tl=all&results=40&safe=1 — reviewed; tested bee item 60021 reports no longer available. No watermarked preview has been copied into the site. Supplied bird and penguins provide the animal imagery.

## Removed archive GIFs
All archive GIF badges and their footer credits were removed at the user’s request. The original archives remain visual research only.

## Viewer
Three.js 0.180.0 from npm, MIT license retained at `dist/vendor/THREE-LICENSE.txt`. Vendored runtime files and GLTF loader are used without CDN runtime dependencies.
