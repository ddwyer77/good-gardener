# Retro art sources

The user supplied the horizon banner, animated bird, Yosemite image, penguins, potted plant, several peace symbols, updated fish-holding honoree portrait, scuba diver, fish, house icon, flattened Good Gardener logo, textured Good Gardener logo, homepage layout references, typography references, and two renderings of the new four-piece clothing collection. The horizon, flattened logo, named clothing rendering, and honoree portrait each appear once on the homepage. The separate white-background clothing rendering supplies CSS-cropped views for the clothing, gallery, and four product-detail pages; its white field is visually removed with multiply blending over the site background. The Theodore Payne panel remains as a retained reference asset, while the homepage now renders the requested Good Gardener Foundation copy as accessible HTML. The textured logo supplies the browser favicon and Apple touch icon. The diver and fish were converted locally to transparent PNGs. Each page shows one plant, one rainbow peace sign, one scuba diver, one fish, and one animated bird. The house image is the fixed Home control. Yosemite, penguin, chrome peace, and black peace references are retained locally but are not visible on the site.

## 3D models
Generated from the user-approved plant and chrome peace references using fal Tripo P2 image-to-3D, one run per model. Meshy CLI was available but not authenticated; the existing fal connector handled generation. Upload to fal public CDN was explicitly approved in chat. Plant target: 2,500 faces, textured. Peace target: 1,500 faces, PBR textured. Actual provider charges were not returned; price API reported USD 0.01 per credit without a per-job credit count.

- Plant request: `01a0c7a6-926b-7712-8ccd-c329462f8f33`
- Peace request: `01a0c7a6-f87e-7d73-88a6-755783fa0e73`
- Local GLBs: `dist/assets/models/plant.glb`, `dist/assets/models/peace.glb`
- These model files are retained as earlier project artifacts. The visible animation layer now uses the supplied image assets so it can scroll natively with the document.

## Reference direction
- https://www.youtube.com/watch?v=choF4hqrbz4 — transcript reviewed; crude late-1990s 3D forms and short whimsical loops.
- https://marshdotcom.neocities.org/ — badge density, homemade layout and bright web graphics.
- https://neocities.org/browse?tag=y2k — supporting aesthetic reference.
- https://animationfactory.com/search.php?keys=animals&tl=all&results=40&safe=1 — reviewed; tested bee item 60021 reports no longer available. No watermarked preview has been copied into the site. Supplied bird and penguins provide the animal imagery.

## Removed archive GIFs
All archive GIF badges and their footer credits were removed at the user’s request. The original archives remain visual research only.

## Motion layer
All visible floating assets are local image files positioned in the page and animated with CSS. No third-party runtime or network request is needed for the decorations. The earlier vendored Three.js files and license remain in the repository as unused project history.
