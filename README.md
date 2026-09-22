# Good Gardener

Static multi-page nonprofit website adapted from the observed Tom’s Place Resort layout. No build step. Three.js 0.180.0 is vendored locally for the decorative 3D viewer. Serve `dist/` with an HTTP server.

## Design and content
Homepage preserves the reference's 776px left-aligned desktop composition, navy Arial masthead, blue Georgia text panel, bordered announcement, green/red supporting copy, and brown two-row footer navigation. The requested retro expansion adds a hillside horizon banner and six floating 3D decorations scattered across the page. Mobile layouts reflow for readability. Shared styling is in `dist/style.css`.

Eleven HTML pages include the homepage, story, mission, community, monthly award, honoree index, three retained sample article URLs, the first actual honoree article, and clothing store. The homepage and honoree index feature the user as the first recipient for September 2026, using their supplied photo and self-description. The three older sample articles remain accessible at their existing URLs but are no longer linked from the honoree listings. Products remain labeled concepts. Generated workshop and collection photos do not represent actual inventory.

## Store boundary
The store supports size selection, adding items, quantities, and removal in a temporary in-memory preview bag. It has no payment collection, order creation, pricing, inventory system, or storage. Before sales launch, supply real products, photos, sizes, prices, fulfillment terms, and a payment provider. Add subsequent confirmed honoree articles to the homepage and honoree index. No nonprofit tax status, donations, contact details, or real-world programs are fabricated.

## Publishing
Sites identity and static directory live in `.openai/hosting.json`. Site is private. Publish with the Sites workflow. Keep real credentials outside source.

## Verification
Check local HTML links/assets and JS syntax; inspect desktop/mobile layout and exercise article navigation and store add/remove/size behavior.

## Image placement and motion
The supplied horizon banner and honoree portrait each appear once on the homepage. The bird, Yosemite, and penguin images are currently removed from the visible site at the user's request. Craft, community, and clothing photos remain on their respective pages. Repeated plant and peace-sign models are intentional user-requested exceptions to the earlier no-repeat rule.

`retro.js` implements the pause control for the 3D animation layer. `floating-garden.js` uses one transparent WebGL canvas for six low-poly model instances at a capped 24 fps. Seeded positions spread them across each page and deliberately let them overlap text and images while keeping all links and controls clickable. There are no animation API calls at runtime. Offscreen tabs stop rendering. The OS reduced-motion preference is respected; a local motion preference may override it. A static image fallback appears if WebGL or model loading fails. Plant and peace images/model files stay local to the deployed site.

`retro.css` adds the transparent decoration layer and the user-supplied warm background color, #f0e5d2. The welcome line, archive GIF badges, and three small nature images were removed at the user’s request. See `ASSET-SOURCES.md` for source URLs, model request IDs, and license notes. Homepage and honoree content, clothing preview logic, and private access are preserved.

## Domain
On September 21, 2026 (Pacific), Porkbun search showed `goodgardener.world` available at $2.57 first year and $33.47 renewal. Cloudflare live search also confirmed availability at $32.20 registration and $32.20 annual renewal. The user prefers Cloudflare or their existing registrar. The user requested pricing and registrar choice; no purchase has been made. Domain is not bought or connected. A custom-domain setup will require ownership and DNS records from Sites. No hosting-price guarantee has been made.
