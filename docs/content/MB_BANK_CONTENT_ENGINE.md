# MB Bank Evergreen Content Engine

Target: `https://1phutdangky.com`

Trigger command:

`Bắt đầu tạo bài mới MB Bank`

## Source of truth

Primary workbook:

`docs/content/1phutdangky_MB_Bank_Evergreen_Content_Engine.xlsx`

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

## Canonical owners

### Account Pillar

`https://1phutdangky.com/mo-tai-khoan/mo-tai-khoan-mb-bank-online/`

Owns the core intent around opening/registering/creating an MB Bank account online.

Keep the existing URL.

### Referral Pillar

`https://1phutdangky.com/ma-gioi-thieu-mb-bank/`

Owns referral/code/link intent.

Affiliate code: `MBAT113`.

This is the primary affiliate-conversion pillar.

### Card Pillar

`https://1phutdangky.com/mo-the-mb-bank-online/`

Owns generic MB card-opening intent.

Do not conflate account and card intent.

## One-run workflow

When the trigger command is received:

1. Read repository instructions.
2. Open workbook `Next Action`.
3. If a `Ready` item exists, select it.
4. Mark the matching `Evergreen Queue` row `In progress`.
5. Check current routes/canonical ownership and cannibalization risk.
6. Verify required current sources.
7. Decide: new URL, update existing URL, or merge as section.
8. Implement using the current UI/components.
9. Apply SEO/GEO, internal links, source blocks, disclosure, and CTA rules.
10. Run available lint/typecheck/tests/build.
11. Review git diff.
12. Commit and push if authorized.
13. Deploy using the existing Cloudflare workflow if authorized.
14. Verify production URL, canonical, UI, mobile, CTA, links, source references, and runtime.
15. Mark queue item `Done` or `Blocked`.
16. Append a `Run Log` record.
17. Stop after one content run unless the user asks for more.

## Evergreen behavior

The initial 60 items are only a starting backlog.

There is no Day 61 stop condition.

When no `Ready` item remains:

1. Enter `Discovery Mode`.
2. Use Search Console first when available.
3. Review current SERP/question patterns.
4. Review current MB official/MB247 sources.
5. Generate only 3–5 candidates.
6. Score demand, intent separation, business value, source readiness, content gap, and cannibalization.
7. If a topic overlaps an existing owner, add it as an update/section item rather than a new URL.
8. Append qualified candidates to `Evergreen Queue`.
9. Set exactly one best-qualified candidate to `Ready`.
10. Execute that item in the same run.

## Affiliate rules

Use `MBAT113` wherever the MB Bank referral code is required.

Account Pillar and Referral Pillar may use strong CTA placement according to `CTA Matrix`.

Eligibility and troubleshooting pages must answer the user first, then route to Account/Referral only when contextually appropriate.

Do not publish fixed reward amounts, promotions, or eligibility claims without current official MB terms.

If current official reward terms cannot be verified, use neutral status wording.

## Source rules

For financial/product/referral claims, prefer:

1. MB official pages.
2. MB247.
3. Current official regulatory source where relevant.

Third-party SERP results may be used to discover search intent, not as the sole source for fees, age, eligibility, referral reward, or current App flow.

## Safety and privacy

Never ask readers to send or disclose:

- OTP
- PIN
- password
- login credentials
- other banking authentication secrets

Do not provide bypass instructions for NFC, eKYC, CCCD verification, face verification, or other banking security controls.

## UI rules

Keep the current 1phutdangky.com UI/UX.

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
- affiliate disclosure
- structured data only when suitable
- sitemap/indexability

Question content should prefer:

Question → direct answer → conditions → details → source → next action.

Do not create a separate page merely because a wording variant exists.

## Git and deployment

Use the repository's existing GitHub and Cloudflare workflow.

Do not create a new Cloudflare project, change DNS, or change deployment architecture unless the repository explicitly requires it.

Do not commit secrets, `.env`, tokens, API keys, or unrelated local/debug files.

Do not force-push or rewrite history.

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
- CTA/MBAT113 changes
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
