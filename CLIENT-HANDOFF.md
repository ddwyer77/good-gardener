# Good Gardener Website — Client/Cowork Handoff

Last audited: October 23, 2026  
Production site: <https://good-gardener.org/>  
Sites project title: **Good Gardener World**  
Audited functional Sites baseline: **version 25**  
Audited functional code commit: `5a961807c82d46fdfa164e68bcd2eb43c8fb5283`

## Read this first

This file is the durable handoff for continuing the Good Gardener website in a new Cowork desktop chat. It contains project identity, design intent, architecture, routes, content rules, validation, publishing steps, and the access requirements for a new computer.

The Markdown file is documentation, not the complete website. A working handoff requires at least one of these:

1. The complete `good-gardener` project folder, including `.git`, `.openai`, `dist`, `README.md`, and `ASSET-SOURCES.md`; or
2. Editor/owner access to the existing Sites project so the new chat can retrieve its source repository.

The `dist/assets` directory is about 46 MB and contains the actual product photography, GIFs, logos, and other media. Do not try to recreate the site from this document when the source can be copied or retrieved.

## Opening prompt for the new primary Cowork chat

Start a new Work/Cowork chat with the project folder attached or opened, attach this file if needed, and send:

> Continue the existing Good Gardener website as its new primary work chat. Read `CLIENT-HANDOFF.md`, `README.md`, `ASSET-SOURCES.md`, `.openai/hosting.json`, and inspect the current source before changing anything. This is an existing Sites project; preserve its project ID and public audience, and do not create a replacement Site unless access to the current project is impossible and I explicitly approve a migration. Treat the documented design rules and product limitations as non-regression requirements. For each requested change, edit the existing system, validate the relevant desktop and mobile behavior, commit the source, and publish through the installed Sites workflow unless I explicitly ask for local-only work.

The new chat should reconstruct state from the repository and Sites tools rather than asking the client to repeat facts already recorded here.

## Access and ownership

The production Site is currently owned by the ChatGPT/Sites account that created it. The current Sites access mode is **public**, meaning anyone can visit the website, but public visitor access does not grant editing or publishing permission.

### Same account or same workspace

If the client signs into Cowork with the same account/workspace and has owner or editor access:

1. Enable or connect the **Sites** plugin if it is not already available.
2. Open/copy the project folder, or have the chat open the existing Sites source using the project ID below.
3. Let the chat call `get_site` before editing to confirm access and the current version.
4. Continue publishing to the existing project.

### Separate client account

If the client uses a different ChatGPT account:

1. Add the client as a Site editor when both accounts are in a compatible workspace, then confirm the new account can call `get_site` for the project.
2. If cross-workspace editing is unavailable, transfer the full project folder and create a new Site owned by the client only as a deliberate migration.
3. A migration also requires moving `good-gardener.org` from the old Sites project to the new one and updating Cloudflare DNS. Test the new generated Sites URL before changing DNS to avoid unnecessary downtime.
4. The client will also need appropriate access to the Cloudflare account that owns the domain if they are expected to manage DNS, renew the domain, or migrate hosting.

Do not assume that knowing the project ID bypasses access control. Do not copy short-lived repository tokens, login cookies, Cloudflare credentials, or Sites bypass tokens into this file or source control.

## Hosted project identity

These values identify the existing hosted Site and are safe to keep in source:

| Item | Value |
| --- | --- |
| Sites project ID | `appgprj_6ab20461a6c481918b13a21f8b57ee46` |
| Sites title | `Good Gardener World` |
| Sites slug | `good-gardener` |
| Production URL | `https://good-gardener.org/` |
| Generated Sites URL | `https://good-gardener.possiblylater.chatgpt.site/` |
| Access mode | Public |
| Static output directory | `dist` |
| Source branch | `main` |
| Audited functional baseline | Sites version 25 |
| Audited functional code commit | `5a961807c82d46fdfa164e68bcd2eb43c8fb5283` |

`.openai/hosting.json` is the canonical local hosting manifest:

```json
{
  "project_id": "appgprj_6ab20461a6c481918b13a21f8b57ee46",
  "static": { "directory": "dist" }
}
```

Preserve this project ID. Never call `create_site` for routine edits to this project.

## Domain and Cloudflare state

The registered and connected domain is **`good-gardener.org`**. `good-gardener.com` was not purchased or connected.

The domain was purchased through Cloudflare Registrar. At the last audit, Sites reported:

- Custom domain status: `active`
- Provider route: `active`
- SSL: `active`
- Apex A targets: `162.159.143.30` and `172.66.3.26`
- Sites verification TXT name: `_openai-site-verification.good-gardener.org`
- CNAME target for a future subdomain, if needed: `custom-domains.chatgpt.site.`

Cloudflare credentials are not needed for normal content deployments while the domain remains attached to the existing Sites project. They are needed for registrar ownership, DNS changes, or a hosting migration. Before changing DNS, ask Sites for the current domain records; do not rely only on values recorded here because hosting requirements can change.

## Product and visual direction

The site deliberately resembles a homemade late-1990s/early-2000s website for a beloved restaurant or local institution. Its humor and charm come from being specific, left aligned, slightly awkward, and full of playful web objects. It should feel intentional rather than polished into a generic modern store.

Non-regression design rules:

- Preserve the warm beige background: `#f0e5d2`.
- Preserve the narrow, **776 px left-aligned desktop composition**. Do not center the whole site or turn it into a conventional full-width ecommerce template.
- The top identity uses dark navy text, the hillside garden banner, the flattened hand-drawn Good Gardener logo, and this address:

  ```text
  970 N. Broadway Suite 213
  Los Angeles, California, 90012
  ```

- Preserve the retro typography mix: Arial/Helvetica for much of the masthead and interface, Georgia/Times-style serif type for editorial and product areas.
- The main navigation must contain exactly these ten items, in this order:

  ```text
  Home, Our Mission, Clothing, Gallery, Honorees, Events, FAQ, Size Guide, Contact, Partners
  ```

- Keep the brown beveled navigation buttons.
- The house image is the Home control. On product pages it belongs beside the cart/search/menu area; on mobile product pages the product should appear before the large navigation area.
- Featured homepage products are intentionally large. New products should continue horizontally to the right beyond the core left alignment; this overflow is a deliberate joke/detail.
- The homepage Foundation section intentionally looks like a blue Wikipedia article.
- Preserve the supplied punctuation and tone where copy was explicitly approved, especially the honoree text and welcome panel.
- Do not reintroduce ad-like archive GIF banners, the old “Welcome to our little corner of the world” line, Yosemite, penguins, or the removed three-image footer.
- Browser title: `Good Gardener World`.
- Favicon and Apple touch icon use the textured Good Gardener mark.

## Technology and architecture

This is a buildless static multi-page website:

- HTML, CSS, and plain browser JavaScript only.
- No `package.json`, framework, database, server, or build step.
- Sites serves the contents of `dist/`.
- All visible site assets are local; the decorative layer does not depend on a third-party runtime.
- The repo retains vendored Three.js files and two `.glb` models as history, but the current visible decorations use ordinary images/GIFs and CSS rather than Three.js.

### Key files

| Path | Purpose |
| --- | --- |
| `.openai/hosting.json` | Existing Sites identity and `dist` publishing configuration. |
| `dist/index.html` | Homepage and primary visual reference for the site. |
| `dist/style.css` | Main layout, page, navigation, catalog, and responsive styles. |
| `dist/retro.css` | Background, Home control, decorative overlay, animation, and some product/mobile refinements. |
| `dist/floating-garden.js` | Deterministic decorative placement, equal vertical distribution, collision scoring, dragging, and per-tab saved positions. |
| `dist/retro.js` | Ensures motion is active; it removes the legacy `motion-paused` class. |
| `dist/product.js` | Product thumbnail switching, size selection, cart-preview count, status messages, and mobile menu toggle. |
| `dist/assets/catalog/` | Separate homepage, front, back, and detail images for all four products. |
| `dist/assets/floaters/` | Rainbow peace, scuba diver GIF, fish GIF, and bird GIF. |
| `dist/assets/retro/` | Hillside banner, plant, and retained/removed visual references. |
| `dist/assets/brand/` | Flattened Good Gardener logo. |
| `dist/assets/ui/` | House-shaped Home button. |
| `README.md` | Current product and architecture summary. |
| `ASSET-SOURCES.md` | Asset provenance, generated-model request IDs, and license/context notes. |
| `work/` | Local design/reference artifacts; intentionally ignored by Git and not part of the deployed Site. |

The production source contains 21 HTML routes and about 95 files in `dist`.

## Routes and page roles

Primary linked pages:

| Route | Role |
| --- | --- |
| `index.html` | Homepage: brand, four featured products, Foundation panel, announcement, first honoree, navigation. |
| `mission.html` | Our Mission. |
| `store.html` | Clothing collection overview. |
| `gallery.html` | Gallery. |
| `honorees.html` | Honoree listing. |
| `events.html` | Events. |
| `faq.html` | FAQ. |
| `size-guide.html` | Preview size guide. |
| `contact.html` | Contact/location information. |
| `partners.html` | Partners. |

Product pages:

| Route | Product | Preview price |
| --- | --- | ---: |
| `logo-t-shirt.html` | Logo T-shirt | $58.00 |
| `universe-t-shirt.html` | Universe T-shirt | $58.00 |
| `peace-cult-hoodie.html` | Peace Cult Hoodie | $168.00 |
| `leafcutter-hoodie.html` | Leafcutter Hoodie | $168.00 |

Story and retained routes:

- `first-good-gardener.html` — September 2026 first honoree story.
- `monthly-award.html` — monthly award information.
- `about.html` and `community.html` — retained older informational routes.
- `honoree-community-artist.html`, `honoree-dedicated-maker.html`, and `honoree-neighborhood-teacher.html` — retained sample stories, currently not linked from the honoree listing.

When changing shared navigation or headers, update every applicable HTML file. There is no template engine.

## Homepage content state

The homepage currently contains:

- Hillside garden banner.
- “GOOD GARDENER” wordmark and squashed logo.
- Los Angeles address.
- Four large linked featured products.
- Blue Good Gardener Foundation panel with accessible HTML text and Wikipedia styling.
- Bordered welcome/size-guide panel.
- First Good Gardener of the Month image and story link.
- Exact approved copy:

  ```text
  The best time to plant a tree was 20 years ago.......
  The next best time is now!!!
  Please join us in celebrating our Good Gardener of the month :-)
  ```

- The ten-item navigation and a small footer line.

The first honoree is dated September 2026. Confirm with the owner before replacing that content or changing its date.

## Product system

Each product has a folder at `dist/assets/catalog/<product-slug>/`.

All products include:

- `front-home.png` — homepage card image.
- `front.png` — main product view.
- `back.png` — separate back view.
- `graphic.png` — artwork detail.
- `neckline.png` — neckline detail.
- `fabric.png` — fabric detail.
- `cuff.png` for hoodies or `sleeve.png` for T-shirts.

The current images were carefully derived from supplied composite artwork to demonstrate a real product gallery. They are intentionally separate saved files; thumbnails must switch the main image source. Do not replace this with CSS zooming of a single image. Eventually, replace these provisional images with properly photographed product views while keeping the same filenames or updating every reference.

`product.js` provides:

- Independent thumbnail selection.
- Size choices S, M, L, XL, and XXL.
- “Add to Cart” preview feedback.
- An in-memory cart count.
- Mobile menu expansion.

### Important commerce boundary

This is **not yet a transactional store**.

- No payment provider.
- No checkout.
- No persistent cart.
- No inventory or SKU system.
- No order creation, confirmation, fulfillment, tax, or shipping calculation.
- Prices are collection-preview content.
- Size measurements and product details must be confirmed before sales launch.
- Cart count resets on reload/navigation.

Do not tell visitors that an order was placed or payment was collected. A real sales launch is a separate milestone requiring product data, legal/fulfillment decisions, and a payment/ecommerce integration.

## Decorative animation system

Every visible page should contain exactly one of each of these five decorative objects:

1. Potted plant.
2. Rainbow peace sign.
3. Scuba diver looping GIF.
4. Fish looping GIF.
5. Rainbow bird looping GIF.

The overlay markup is repeated in each HTML page under `.garden-overlay`. Avoid duplicate objects when copying or editing pages.

`floating-garden.js`:

- Seeds placement from the route path, so the default layout is stable for a page.
- Splits the page into five vertical bands to distribute the objects evenly from top to bottom.
- Keeps them inside the left-aligned content width.
- Uses control/content overlap scoring. Playful overlap with copy and imagery is allowed; purchase controls receive stronger protection.
- Prevents the objects from stacking heavily on each other.
- Lets visitors drag every object with mouse, touch, or pen.
- Stores manually moved positions in `sessionStorage` for the life of the browser tab.
- Recalculates placement after images load and when the window resizes.

`retro.css` supplies continuous motion. The plant and peace sign spin. GIF assets loop indefinitely. The objects are positioned inside the document rather than as a fixed canvas so they scroll naturally with the page.

Design priority: the objects should be evenly distributed and remain a recurring playful theme. Do not exile most of them to the page bottom merely to avoid all overlap. Users can drag them if desired.

## Responsive/product-page rules

- Desktop retains the narrow left-aligned site and intentionally awkward charm.
- Mobile product pages prioritize the product itself at the top.
- On mobile, the large desktop brand/navigation area moves below the primary product content.
- A small Good Gardener logo remains at the top so the page still feels branded.
- The old “Back to Clothing” control is hidden on mobile; Home and the bottom navigation provide exits.
- Product images and thumbnails must remain large enough to demonstrate the product clearly.
- The Home house belongs beside the cart/search/menu group on product pages, not floating far away from the layout.
- Do not embed an extra plant inside a mobile header; the plant must remain one independent draggable decorative object.

## How to make common changes

### Add a new product

1. Create `dist/assets/catalog/<new-slug>/` with separate `front-home`, `front`, `back`, `graphic`, `neckline`, `fabric`, and cuff/sleeve images.
2. Copy the closest existing product HTML page.
3. Update the document title, metadata, H2, price, description, detail copy, asset paths, alt text, and `data-product` value.
4. Ensure `product.js`, `style.css`, `retro.css`, `retro.js`, and `floating-garden.js` remain included.
5. Add the product to `store.html`.
6. Add it to the homepage `.featured-product-grid`. New items should extend to the right in the existing two-row horizontal flow.
7. Update “You Might Also Like” links where appropriate.
8. Keep exactly one set of five decorative objects.
9. Check desktop and mobile layouts and every thumbnail before publishing.

### Add or update a honoree

1. Copy `first-good-gardener.html` or another story route.
2. Use a real supplied photo and approved biography/copy.
3. Update `honorees.html` and, when requested, the homepage feature.
4. Confirm the month/year with the owner.
5. Avoid inventing nonprofit status, programs, awards, quotes, or biographical facts.

### Add a standard content page

Copy the closest `.inner` page and update its title, description, active navigation state, heading, and body. Include the shared styles/scripts and exactly one `.garden-overlay` group. Verify all relative links from the new route.

### Change navigation

The navigation is copied across HTML files. Update all linked pages together, preserve the approved ten-item order, and verify `aria-current="page"` on each route.

### Replace a product photograph

Replace the relevant saved file while preserving transparency, framing, and filename when practical. Keep the homepage image separate from the 1:1 product-gallery image. Do not use a browser-scaled crop as a fake detail thumbnail.

## Validation before every publication

At minimum:

1. Confirm the working tree contains only intended changes.
2. Run JavaScript syntax checks:

   ```sh
   find dist -maxdepth 1 -name '*.js' -exec node --check {} \;
   ```

3. Run:

   ```sh
   git diff --check
   ```

4. Serve `dist` locally when visual QA is needed:

   ```sh
   python3 -m http.server 4173 --directory dist
   ```

5. Inspect at least:

   - Homepage at a desktop width.
   - Homepage at a narrow mobile width.
   - Clothing page.
   - One T-shirt product and one hoodie product on desktop and mobile.
   - Product thumbnail switching.
   - Size selection and cart-preview feedback.
   - Mobile menu location/behavior.
   - Five unique looping/draggable objects, evenly distributed.
   - Home controls and every primary navigation link.
   - No accidental white rectangles around transparent assets.

6. Inspect the final diff.
7. Commit the source before publication.
8. Publish through Sites and confirm a successful deployment result.

The current JavaScript passes `node --check`, and the repository was clean at the October 23, 2026 audit before this handoff file was added.

## Publishing through Sites

The Sites plugin can change over time. The new chat should first read its currently installed **Sites** skill and follow that version’s workflow. Do not hardcode an old plugin installation path from another computer.

For an existing-project update, the workflow is conceptually:

1. Read `.openai/hosting.json` and select project `appgprj_6ab20461a6c481918b13a21f8b57ee46`.
2. Call `get_site` and confirm:
   - the project is active,
   - the current user is owner/editor,
   - public access should be preserved,
   - the current live URL is `https://good-gardener.org/`.
3. Obtain a fresh short-lived source repository write credential from Sites.
4. Use the Sites source workflow helper to open/synchronize or push the `main` branch and package the exact committed `dist` output.
5. Pass credentials through the helper’s hidden standard input only. Never put a token in a command argument, file, Git config, Markdown, or chat response.
6. Save a new Site version using the exact pushed commit SHA and generated archive.
7. Deploy that saved version with the normal public deployment tool, preserving the current audience.
8. If the deployment is pending/building/publishing, poll its deployment status until terminal. A `succeeded` result is the publication verification.
9. Confirm or report the returned production URL.

For this buildless Site, the packaging command list is normally empty (`commands: []`) after validation because `dist` is already the deployable output.

The local Git checkout currently has no permanent credential-bearing remote configured. That is intentional. The Sites workflow mints short-lived repository access for each synchronization/publish operation.

## Retrieving source on a new computer

If the client has Sites editor/owner access but does not receive the folder:

1. Create an empty local project directory.
2. Start a Cowork chat in that directory and provide this handoff file.
3. Ask the chat to read the installed Sites skill, call `get_site` with the existing project ID, request a source repository credential, and open the existing source using the Sites source helper.
4. Use the helper’s returned checkout path.
5. Verify that `.openai/hosting.json`, `dist/index.html`, `README.md`, and the full `dist/assets` tree are present.
6. Verify the retrieved HEAD against the live Site/version before editing.

If the client lacks Sites access, retrieve the source from the previous owner as a full folder/archive. Do not create a new project with only the HTML and omit the media.

## Credentials and services

Routine editing requires:

- Cowork desktop with filesystem access to the project.
- Sites plugin connected to an account with owner/editor rights.
- Git available locally for history and commits.

Only certain work requires additional access:

- Cloudflare: domain renewal, DNS changes, or hosting migration.
- Image/3D providers: only if generating new media. Existing assets are local and need no provider credentials.
- Payment/ecommerce provider: only for the future real store milestone.

Never commit `.env` files, API keys, access tokens, Cloudflare credentials, or short-lived Sites repository credentials. No such secrets are required by the current static runtime.

## Known limitations and future milestones

The site is visually ready for client continuation, but these are still future product decisions:

- Replace provisional product renders/details with real product photography.
- Confirm final product prices, measurements, materials, inventory, and availability.
- Choose and implement the real ecommerce/payment/fulfillment system.
- Add real checkout, persistent cart, orders, taxes, shipping, returns, and legal policies.
- Add future honorees, events, gallery work, partners, and real contact methods only when approved.
- Consider removing unused Three.js/vendor/model artifacts in a deliberate cleanup after confirming they are no longer wanted.

Do not expand these milestones automatically during routine visual edits.

## Final handoff checklist for the current owner

Before declaring the client fully independent:

- [ ] Send the full project folder/archive or grant Sites editor access.
- [ ] Confirm the client can open `CLIENT-HANDOFF.md` in the new Cowork chat.
- [ ] Confirm the new chat can call `get_site` for the existing project.
- [ ] Confirm the client can make a harmless test edit, validate it, and publish a new version.
- [ ] Give the client Cloudflare access or transfer domain responsibility if they will manage DNS/renewal.
- [ ] Keep the old owner access until the client has completed one successful deployment.
- [ ] Do not change the domain or delete the old Site during the handoff test.

## Canonical-source order

When information conflicts, use this order:

1. Current code and assets in `dist`.
2. `.openai/hosting.json` and live Sites `get_site` / custom-domain results.
3. This handoff document.
4. `README.md` and `ASSET-SOURCES.md`.
5. Old screenshots, mockups, and ignored `work/` files.

The client owns future creative direction. Preserve the established visual joke and functional behavior unless the client explicitly changes them.
