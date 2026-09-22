# Good Gardener

Static multi-page nonprofit website adapted from the observed Tom’s Place Resort layout. No build step. Three.js 0.180.0 is vendored locally for the decorative 3D viewer. Serve `dist/` with an HTTP server.

## Design and content
Homepage preserves the reference's 776px left-aligned desktop composition, navy Arial masthead, blue Georgia text panel, bordered announcement, green/red supporting copy, and brown two-row footer navigation. The requested retro expansion adds a hillside horizon banner and four floating decorations scattered across the page: one 3D plant, one 3D peace sign, one scuba diver, and one fish. A fixed brown Home button appears at the top right on every page. Mobile layouts reflow for readability. Shared styling is in `dist/style.css`.

Eleven HTML pages include the homepage, story, mission, community, monthly award, honoree index, three retained sample article URLs, the first actual honoree article, and clothing store. The homepage and honoree index feature the user as the first recipient for September 2026, using their supplied photo and self-description. The three older sample articles remain accessible at their existing URLs but are no longer linked from the honoree listings. Products remain labeled concepts. Generated workshop and collection photos do not represent actual inventory.

## Store boundary
The store supports size selection, adding items, quantities, and removal in a temporary in-memory preview bag. It has no payment collection, order creation, pricing, inventory system, or storage. Before sales launch, supply real products, photos, sizes, prices, fulfillment terms, and a payment provider. Add subsequent confirmed honoree articles to the homepage and honoree index. No nonprofit tax status, donations, contact details, or real-world programs are fabricated.

## Publishing
Sites identity and static directory live in `.openai/hosting.json`. The site is public at `https://good-gardener.org/`, with `https://good-gardener.possiblylater.chatgpt.site/` retained as the Sites address. Publish with the Sites workflow. Keep real credentials outside source.

## Verification
Check local HTML links/assets and JS syntax; inspect desktop/mobile layout and exercise article navigation and store add/remove/size behavior.

## Image placement and motion
The supplied horizon banner and updated fish-holding honoree portrait each appear once on the homepage. The bird, Yosemite, and penguin images are currently removed from the visible site at the user's request. Craft, community, and clothing photos remain on their respective pages. Each page has exactly one plant, one peace sign, one scuba diver, and one fish in its decorative animation layer.

`retro.js` applies the OS reduced-motion preference. `floating-garden.js` uses one transparent WebGL canvas for the plant and peace-sign models at a capped 24 fps; the scuba diver and fish use local transparent PNGs with CSS motion. Seeded positions spread the four objects across each page and deliberately let them overlap text and images while keeping all links and controls clickable. There are no animation API calls at runtime. Offscreen tabs stop rendering. A static image fallback appears if WebGL or model loading fails. All images and model files stay local to the deployed site.

`retro.css` adds the transparent decoration layer and the user-supplied warm background color, #f0e5d2. The welcome line, archive GIF badges, and three small nature images were removed at the user’s request. See `ASSET-SOURCES.md` for source URLs, model request IDs, and license notes. Homepage and honoree content, clothing preview logic, and private access are preserved.

## Domain
The user purchased `good-gardener.org` through Cloudflare Registrar. The public Sites project is connected to that apex domain with two proxied A records and the two TXT validation records supplied by Sites. Sites reports the domain, provider route, and SSL certificate active. `good-gardener.com` was not purchased or connected.
