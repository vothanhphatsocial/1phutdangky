# TPBank Evergreen Content Engine

Target: `https://1phutdangky.com`

Trigger command:

`Bắt đầu tạo bài mới TPBank`

## Source of truth

Primary workbook:

`docs/content/1phutdangky_TPBank_Evergreen_Content_Engine.xlsx`

This setup and quoted trigger examples do not start a content cycle. Start only on the user's actual trigger invocation.

Read in this order:

1. `Next Action`
2. `Evergreen Queue`
3. `Execution Briefs`
4. `CTA Matrix`
5. `Publish Source Matrix`
6. `Seed-to-Question Map`
7. `Unified Strategy`
8. `Discovery Rules`
9. `Run Log`

## Starting state

There is no existing TPBank content pillar on `1phutdangky.com` at engine setup time.

Recheck actual articles and products before every run. This is the setup baseline, not an instruction to recreate a pillar that already exists.

The first runs create the foundation pages before dependent support content.

There is no dedicated TPBank keyword file in the current brief. Initial topics are research-seeded from current TPBank products, official documentation, SERP/question patterns and product intent.

Never describe research-seeded topics as original keyword data from the user.

## Canonical owners

### Account Pillar

Planned canonical:

`https://1phutdangky.com/mo-tai-khoan/mo-tai-khoan-tpbank-online/`

Owns the core intent around opening/registering/creating a TPBank account online.

Because the page does not yet exist, validate the repository routing convention before creating it. Keep this canonical once created unless the repository already has a conflicting canonical structure that requires an equivalent route.

### Credit Card Pillar

Planned canonical:

`https://1phutdangky.com/the-tin-dung/mo-the-tin-dung-tpbank-online/`

Owns generic TPBank credit-card opening/application intent.

Do not conflate payment-account opening and credit-card application intent.

### Official promotion content

There is no TPBank referral pillar for 1 Phút Đăng Ký.

1 Phút Đăng Ký does not use a TPBank referral code. Never create, request, configure, or wait for one.

Current TPBank promotions normally belong inside the relevant Account or Credit Card owner. Create a standalone promotion page only when a current official campaign has distinct search intent and enough standalone utility.

Official TPBank campaign codes may be described only as TPBank campaign codes, with current dates, eligibility and source. They are never a referral code owned by 1 Phút Đăng Ký.

## One-run workflow

When the trigger command is received:

1. Read repository instructions.
2. Open workbook `Next Action`.
3. Validate `Next Action` against actual queue statuses and select the best eligible `Ready` item by priority, dependency, source readiness and intent. Respect the seeded order unless these checks justify a different choice; log the reason.
4. Mark the matching `Evergreen Queue` row `In progress`.
5. Check foundation dependency. If a support page depends on a canonical pillar that does not yet exist, create/complete the parent foundation first instead of publishing an orphan support page.
6. Check current routes/canonical ownership and cannibalization risk.
7. Verify required current sources.
8. Decide: new URL, update existing URL, merge as section, or block.
9. Implement using the current UI/components.
10. Apply SEO/GEO, internal links, source blocks, disclosure, and CTA rules.
11. Run available lint/typecheck/tests/build.
12. Review git diff.
13. Commit and push if authorized.
14. Deploy using the existing Cloudflare workflow if authorized.
15. Verify production URL, canonical, UI, mobile, CTA, links, source references, and runtime.
16. Mark queue item `Done` or `Blocked`.
17. Append a `Run Log` record.
18. Stop after one content run unless the user asks for more.

## Foundation dependency rule

Because TPBank starts with no content on the site, dependent support pages should not be published before their owner exists.

Preferred initial sequence:

1. Account Pillar.
2. Credit Card Pillar.
3. Account preparation/troubleshooting support.
4. Card cost/eligibility/comparison support.
5. LiveBank support.
6. Official promotion content when current and useful.

If queue order and repository state conflict, preserve canonical architecture rather than blindly publishing an orphan page.

## Evergreen behavior

The initial 60 items are only a starting backlog.

There is no Day 61 stop condition.

When no `Ready` item remains:

1. Enter `Discovery Mode`.
2. Use Search Console first when available.
3. Review current SERP/question patterns.
4. Review current TPBank official pages, FAQs, fee documents, campaigns and product lineup.
5. Generate only 3–5 candidates.
6. Score demand, intent separation, business value, source readiness, content gap, and cannibalization.
7. If a topic overlaps an existing owner, add it as an update/section item rather than a new URL.
8. Append qualified candidates to `Evergreen Queue`.
9. Set exactly one best-qualified candidate to `Ready`.
10. Execute that item in the same run.

## Account rules

The Account Pillar owns generic online-account-opening intent.

Support topics may include:

- requirements/preparation
- App TPBank flow
- OTP
- QR/CCCD scanning
- NFC
- eKYC/face verification
- fees
- timing
- App vs LiveBank vs branch
- account number selection
- official App/link safety
- current official promotion information when relevant

Do not create synonym pages for `mở`, `đăng ký`, `tạo`, or equivalent phrases when the intent is the same.

## Credit-card rules

The Credit Card Pillar owns generic TPBank credit-card application intent.

Support topics may include:

- current eligibility
- whether proof of income is required for a specific current product/channel
- current product comparison
- fees and interest
- annual fee
- late-payment fee
- cash advance
- installment conversion
- statement and due date
- minimum payment
- card activation/first use
- application rejection/support

Do not generalize one product's fee, limit, approval process or promotional wording to every TPBank card.

Do not promise approval, a user-specific limit, or a fixed approval time.

## Promotion rules

1 Phút Đăng Ký does not use a TPBank referral code.

Never create, request, configure, or wait for one.

When covering an active TPBank promotion:

- verify the official source immediately before publish
- state start/end dates
- state eligibility
- state any official campaign code only as TPBank's campaign code
- state reward only if current official terms verify it
- remove/update expired promo claims when the campaign ends

Promotion content normally stays inside the relevant Account or Credit Card owner unless a current campaign has distinct standalone intent.

## Source rules

For financial/product/promotion claims, prefer:

1. Current TPBank official product pages.
2. Current TPBank official guides/PDFs.
3. Current TPBank fee/interest documents applicable to the specific product.
4. TPBank FAQ and official customer-service/contact pages.
5. Current official campaign terms for promotions and campaign codes.

Third-party SERP results may be used to discover search intent, not as the sole source for fees, eligibility, interest, promo rewards, card limits or current App flow.

High-volatility claims must be checked again at publish time:

- account fees
- card fees
- credit-card interest
- card product lineup
- limits/marketing offers
- promotions/campaign codes
- App flow

## CTA and affiliate rules

TPBank content on 1 Phút Đăng Ký does not use a referral code. CTA implementation must not depend on one.

Use only approved project actions, configured affiliate links if they exist, or official/product links consistent with the site's business setup.

Do not invent affiliate URLs or referral codes.

If monetized links are configured, update `Plan Settings` and `CTA Matrix` first, then use them according to page intent.

The owner-approved affiliate link for downloading/opening App TPBank is:

`https://nganhangso.tpb.vn/7s6k/1yg2b1ta`

Store its exact value in `Plan Settings` → `Affiliate Link`; use the same setting from `CTA Matrix`. Keep the short URL intact rather than replacing it with an expanded App Store/Google Play destination. The action is App download/open; a credit-card application remains a separate task within its verified product/channel flow. No referral-code field is required.

Product pillars may use stronger CTA placement.

Eligibility and troubleshooting pages must answer the user first, then route to the relevant pillar/action only when contextually appropriate.

## Safety and privacy

Never ask readers to send or disclose:

- OTP
- PIN
- password
- login credentials
- other banking authentication secrets

Do not provide bypass instructions for NFC, eKYC, CCCD verification, face verification, underwriting, or other banking security controls.

For unresolved cases, route users to current official TPBank customer-support channels.

## UI rules

Keep the current `1phutdangky.com` UI/UX.

Do not redesign:

- typography
- colors
- spacing system
- navigation
- header/footer
- global layout
- existing CTA/button system

Reuse current article, CTA, FAQ, table, author, disclosure, source, breadcrumb, and related-content components whenever they exist.

## SEO/GEO rules

For every relevant content run check:

- title
- meta description
- H1/H2/H3
- canonical
- internal links
- author/reviewer if supported
- source references
- last-reviewed date when appropriate
- affiliate disclosure when applicable
- structured data only when suitable
- sitemap/indexability

Question content should prefer:

Question → direct answer → conditions → details → source → next action.

Do not create a separate page merely because a wording variant exists.

## Repository integration

- Articles use `src/content/articles/<category>/<slug>.mdx` and `/<category>/<slug>/`, matching frontmatter `category`. Use `mo-tai-khoan` for account topics and `the-tin-dung` for credit-card topics.
- Reuse `src/pages/[...article].astro`, `src/content.config.ts`, `ArticleLayout.astro`, `BaseLayout.astro` and the current article/commercial components. Product data, when needed for a verified action, belongs in `src/data/products/`.
- Use one frontmatter `title` for H1, listing cards and generated OG/Twitter/schema images. Seeded SEO-title and H1 suggestions are editorial options, not separate visual titles. Keep article titles ending in `online` under the owner's current convention. Social images come from `src/pages/article-images/[...image].png.ts`; do not create a separate legacy cover for a title update.
- Reuse the existing author, sources, disclosure and consent-aware analytics. Existing commercial components support offers without `referralCode` and official-action fallback. Do not create a referral code to satisfy a CTA or copy another bank's product/offer into TPBank.
- Workbook event names are planning labels. Map actions to existing `affiliate_click` / `official_link_click` behavior, or existing internal navigation; do not add tags or bypass consent to implement planning labels.
- Read `README.md`, `DEPLOYMENT.md` and current source before implementation. The current quality gate is `npm run check`: Astro build, Pagefind and build validation. No separate lint/typecheck/test scripts exist; report checks actually performed.
- Preserve workbook sheets, formulas, validations, formatting and history. `Next Action` currently selects through queue row 164. Validate caches against all actual rows and extend dependent ranges when the backlog exceeds that template. Use empty pre-numbered `Run Log` rows first; write by TPBank's actual column headers rather than copying another engine's column positions.
- Mark a content item `Done` only after its quality and production checks pass. Otherwise keep the appropriate unfinished status with the exact blocker. Record the content commit hash, then persist post-deployment state in a subsequent commit when possible; do not record a commit's own hash inside itself.

## Git and deployment

Use the repository's existing GitHub and Cloudflare workflow.

Do not create a new Cloudflare project, change DNS, or change deployment architecture unless the repository explicitly requires it.

Do not commit secrets, `.env`, tokens, API keys, or unrelated local/debug files.

Do not force-push or rewrite history.

Documentation/instruction/workbook-only setup does not publish a TPBank article or require manual production deployment. An authorized push may trigger the existing automatic Cloudflare workflow; leave that workflow unchanged and do not force or suppress deployment.

If credentials are unavailable, report the exact blocked step instead of claiming push/deploy succeeded.

## Required run report

After every run report:

- Queue #
- Asset ID
- Topic/task
- Decision: new URL / update / merge / blocked
- Files changed
- Route created/updated
- Sources checked
- SEO changes
- CTA/affiliate changes
- Internal links
- Quality checks
- Git branch
- Commit hash
- Push status
- Cloudflare deployment status
- Production verification
- Queue status
- Outstanding issues
- Next `Ready` item
