# Good Gardener

Static multi-page nonprofit website adapted from the observed Tom’s Place Resort layout. No build or third-party runtime dependencies. Serve `dist/` with an HTTP server.

## Design and content
Homepage preserves the reference's 776px left-aligned desktop composition, photo placement, navy Arial masthead, blue Georgia text panel, bordered announcement, green/red supporting copy, and brown two-row footer navigation. Mobile layouts reflow for readability. Shared styling is in `dist/style.css`.

Ten HTML pages include the homepage, story, mission, community, monthly award, honoree index, three sample articles, and clothing store. All sample honorees and products are explicitly labeled. Generated illustrative photos are not representations of actual honorees or inventory.

## Store boundary
The store supports size selection, adding items, quantities, and removal in a temporary in-memory preview bag. It has no payment collection, order creation, pricing, inventory system, or storage. Before sales launch, supply real products, photos, sizes, prices, fulfillment terms, and a payment provider. Replace sample articles with confirmed honoree content. No nonprofit tax status, donations, contact details, or real-world programs are fabricated.

## Publishing
Sites identity and static directory live in `.openai/hosting.json`. Site is private. Publish with the Sites workflow. Keep real credentials outside source.

## Verification
Check local HTML links/assets and JS syntax; inspect desktop/mobile layout and exercise article navigation and store add/remove/size behavior.
