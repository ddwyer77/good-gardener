# Good Gardener

Static multi-page nonprofit website adapted from the observed Tom’s Place Resort layout. No build step. Serve `dist/` with an HTTP server.

## Design and content
Homepage preserves the reference's 776px left-aligned desktop composition, navy Arial masthead, blue Wikipedia-inspired Foundation panel, bordered announcement, green/red supporting copy, and brown two-row footer navigation. The supplied flattened Good Gardener mark sits beside the name, with the Los Angeles address immediately below it. The supplied four-piece collection appears directly below the masthead with the product names Logo T-shirt, Universe T-shirt, Peace Cult Hoodie, and Leafcutter Hoodie. The announcement box uses the requested Georgia and Arial typography, welcome copy, and size-guide link. The requested retro expansion adds a hillside horizon banner and five floating decorations scattered across the page: one plant, one rainbow peace sign, one scuba diver, one fish, and one animated bird. A fixed house-shaped Home control appears at the top right on every page. Mobile layouts reflow for readability. Shared styling is in `dist/style.css`.

Twenty-one HTML pages include the homepage, mission, clothing, gallery, honorees, events, FAQ, size guide, contact, partners, four product details, and retained story/article URLs. The shared navigation contains exactly Home, Our Mission, Clothing, Gallery, Honorees, Events, FAQ, Size Guide, Contact, and Partners. The homepage and honoree index feature the user as the first recipient for September 2026, using their supplied photo and self-description. The three older sample articles remain accessible at their existing URLs but are no longer linked from the honoree listings. The clothing page previews the same four Good Gardener designs shown on the homepage and links each one to a dedicated catalog-style product page. On mobile product pages, the product gallery and purchasing preview appear first; the brand header and full navigation move below the product content.

## Store boundary
Each product page supports size selection and adding the item to a temporary in-memory preview bag. The linked size guide clearly labels its body-chest ranges as a general preview and states that final garment measurements will be added before launch. The store has no payment collection, order creation, confirmed pricing, inventory system, or storage. Before sales launch, supply real product photos, final measurements, prices, fulfillment terms, and a payment provider. Add subsequent confirmed honoree articles to the homepage and honoree index. No nonprofit tax status, donations, contact details beyond the supplied address, or real-world programs are fabricated.

## Publishing
Sites identity and static directory live in `.openai/hosting.json`. The site is public at `https://good-gardener.org/`, with `https://good-gardener.possiblylater.chatgpt.site/` retained as the Sites address. Publish with the Sites workflow. Keep real credentials outside source.

## Verification
Check local HTML links/assets and JS syntax; inspect desktop/mobile layout and exercise article navigation and store add/remove/size behavior.

## Image placement and motion
The supplied horizon banner, flattened logo, named four-product image, and updated fish-holding honoree portrait each appear once on the homepage. The separate supplied four-product composite is cropped with CSS for the clothing, gallery, and product-detail views; multiply blending lets the warm page color replace its white image field without altering the garments. The newer textured logo is used for the browser favicon and Apple touch icon, and the browser title is “Good Gardener World.” Yosemite and penguin images remain removed from the visible site. Craft and community photos remain on their respective pages. Each page has exactly one plant, one rainbow peace sign, one scuba diver, one fish, and one animated bird in its decorative layer. On the homepage, the single plant is positioned beside the banner to match the supplied layout reference.

`floating-garden.js` gives each page a stable seeded arrangement of five ordinary image elements and deliberately lets them overlap text and images. Every object can be dragged with a mouse, pen, or finger and remembers its moved position for the rest of the browser tab's session. The objects are positioned inside the document and use CSS motion, so they move with the page during native browser scrolling without a fixed canvas or scroll handler. The plant and rainbow peace sign spin continuously, and the bird asset carries an explicit infinite-loop GIF instruction. All images stay local to the deployed site.

`retro.css` adds the transparent decoration layer and the user-supplied warm background color, #f0e5d2. The welcome line, archive GIF badges, and three small nature images were removed at the user’s request. See `ASSET-SOURCES.md` for source URLs, model request IDs, and license notes. Homepage and honoree content, clothing preview logic, and private access are preserved.

## Domain
The user purchased `good-gardener.org` through Cloudflare Registrar. The public Sites project is connected to that apex domain with two proxied A records and the Sites validation TXT record. Sites reports the domain, provider route, and SSL certificate active. `good-gardener.com` was not purchased or connected.
