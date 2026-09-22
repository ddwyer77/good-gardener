# Retro art sources

The user supplied the horizon banner, bird, Yosemite image, penguins, potted plant, and chrome/black peace symbols. The first four appear once each on the homepage. Repeating plants and peace symbols are explicitly requested decorative exceptions to the earlier unique-photo rule.

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

## Original archive GIFs
Original downloaded bytes are kept unchanged. Buttons link to their archive pages, not obsolete advertisements or executable downloads. Archive hosting is provenance, not a claim of ownership or exclusive license. The live pages credit both archives.

- `000010.gif`: https://capstasher.neocities.org/88x31Buttons/000010.gif
- `1001freenewfontsbutton.gif`: https://capstasher.neocities.org/88x31Buttons/1001freenewfontsbutton.gif
- `123clipartbtn.gif`: https://capstasher.neocities.org/88x31Buttons/123clipartbtn.gif
- `a1animate3.gif`: https://capstasher.neocities.org/88x31Buttons/a1animate3.gif
- `adobe_asanim1.gif`: https://capstasher.neocities.org/88x31Buttons/adobe_asanim1.gif
- `alienow.gif`: https://capstasher.neocities.org/88x31Buttons/alienow.gif
- `amiga_anim.gif`: https://capstasher.neocities.org/88x31Buttons/amiga_anim.gif
- `animexchange.gif`: https://capstasher.neocities.org/88x31Buttons/animexchange.gif
- `any_browser.gif`: https://capstasher.neocities.org/88x31Buttons/any_browser.gif
- `any_browser_now.gif`: https://capstasher.neocities.org/88x31Buttons/any_browser_now.gif
- `anybestviewed.gif`: https://capstasher.neocities.org/88x31Buttons/anybestviewed.gif
- `animationstation.gif`: https://cyber.dabamos.de/88x31/animationstation.gif
- `bee.gif`: https://cyber.dabamos.de/88x31/bee.gif
- `beekeeping_in_ukraine.gif`: https://cyber.dabamos.de/88x31/beekeeping_in_ukraine.gif
- `best_viewed_with_eyes.gif`: https://cyber.dabamos.de/88x31/best_viewed_with_eyes.gif
- `best_viewed_with_monitor.gif`: https://cyber.dabamos.de/88x31/best_viewed_with_monitor.gif
- `besteyes_ani.gif`: https://cyber.dabamos.de/88x31/besteyes_ani.gif
- `bestlandscape.gif`: https://cyber.dabamos.de/88x31/bestlandscape.gif
- `bookmark_this_page.gif`: https://cyber.dabamos.de/88x31/bookmark_this_page.gif
- `books.gif`: https://cyber.dabamos.de/88x31/books.gif
- `catscape2.gif`: https://cyber.dabamos.de/88x31/catscape2.gif
- `color.gif`: https://cyber.dabamos.de/88x31/color.gif
- `coolarchive.gif`: https://cyber.dabamos.de/88x31/coolarchive.gif
- `cooltxt.gif`: https://cyber.dabamos.de/88x31/cooltxt.gif

## Viewer
Three.js 0.180.0 from npm, MIT license retained at `dist/vendor/THREE-LICENSE.txt`. Vendored runtime files and GLTF loader are used without CDN runtime dependencies.
