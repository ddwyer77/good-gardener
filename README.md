# Good Gardener

Static multi-page nonprofit website adapted from the observed Tom’s Place Resort layout. No build or third-party runtime dependencies. Serve `dist/` with an HTTP server.

## Design and content
Homepage preserves the reference's 776px left-aligned desktop composition, photo placement, navy Arial masthead, blue Georgia text panel, bordered announcement, green/red supporting copy, and brown two-row footer navigation. Mobile layouts reflow for readability. Shared styling is in `dist/style.css`.

Eleven HTML pages include the homepage, story, mission, community, monthly award, honoree index, three retained sample article URLs, the first actual honoree article, and clothing store. The homepage and honoree index feature the user as the first recipient for September 2026, using their supplied photo and self-description. The three older sample articles remain accessible at their existing URLs but are no longer linked from the honoree listings. Products remain labeled concepts. Generated workshop and collection photos do not represent actual inventory.

## Store boundary
The store supports size selection, adding items, quantities, and removal in a temporary in-memory preview bag. It has no payment collection, order creation, pricing, inventory system, or storage. Before sales launch, supply real products, photos, sizes, prices, fulfillment terms, and a payment provider. Add subsequent confirmed honoree articles to the homepage and honoree index. No nonprofit tax status, donations, contact details, or real-world programs are fabricated.

## Publishing
Sites identity and static directory live in `.openai/hosting.json`. Site is private. Publish with the Sites workflow. Keep real credentials outside source.

## Verification
Check local HTML links/assets and JS syntax; inspect desktop/mobile layout and exercise article navigation and store add/remove/size behavior.

## Image placement
Each content image is rendered once across the site: workshop banner on Home, supplied honoree portrait on Home, craft photo on Our Story, community photo on Community, collection photo on Store. Honoree articles use text rather than repeating the homepage portrait.
