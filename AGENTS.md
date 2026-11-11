## Article URL structure

- Every article must use `/<category>/<slug>/`, with exactly one category segment matching its `category` frontmatter: `mo-tai-khoan`, `the-tin-dung`, or `vay-tien-mat`.
- Store article files and their cover assets in `src/content/articles/<category>/`. Do not publish articles at the site root or override their slug to bypass the category directory.
- When moving a published article, add a direct 301 redirect for its old URL and update internal links, canonical, breadcrumb data, sitemap and active engine references. Preserve historical run logs.

## Article citation links

- For all new and updated articles, render external citations in article prose, lists, tables and FAQs as plain text, preserving the visible wording when removing a citation hyperlink.
- Keep citation URLs only in the final Sources/verification section, using the existing source block.
- Keep internal links, existing action buttons/CTA components (download, open, register, directions) and telephone/email support links functional. Prose references to provider contact pages follow the citation rule above; keep their URLs in Sources.
- Identify external actions by the existing CTA event/product attributes or an explicit `data-link-purpose="action"` attribute on an action button, not by button styling alone.

## Article title visuals

- Use frontmatter `title` as the only title for article H1, listing cards and social images. `ArticleTitleVisual.astro` and `src/utils/articleVisual.mjs` provide the shared title-only visual and palette; do not add separate card titles or restore brand panels, marks or category eyebrows inside article title visuals.
- Article OG/Twitter/schema images are generated automatically at build time by `src/pages/article-images/[...image].png.ts`. Existing legacy `cover` assets are not used for these surfaces; do not create or edit a separate cover to update an article title.
- Use `src/utils/categoryVisual.mjs` as the single category palette for category panels, article cards/heroes, product cards and generated social images. Product cards inside an article inherit that article's category palette, even when their product data belongs to a different product type. Do not add provider-specific or article-specific palette overrides.

## Maintenance gate and evidence dates (all content engines)

- Before selecting work for an MB Bank, Home Credit or TPBank content run, read `Next Action` first, then review that bank's published articles and shared product data for expired campaigns, replaced tariffs and unsupported freshness dates. This gate takes precedence over selecting the next `Ready` item or entering Discovery Mode.
- Run `npm run content:review` and inspect `docs/content/source-review.json` for recorded source versions, expiry and review dates. An overdue/expired result requires source review before selecting work; the ledger covers only recorded claims, so also check the relevant published content and official sources. Do not clear a warning by advancing a date without opening and checking the source. This advisory gate does not disable CTAs or change affiliate links.
- Prioritize a verified substantive correction to an existing canonical URL over a new URL. That correction is the one content run; do not also publish a new article. Reuse a matching unfinished queue item or record a maintenance update using the workbook's existing queue columns/statuses and log format. Preserve completed rows, formulas, formatting and historical logs; record the reason for overriding `Next Action` and refresh it after the run. If evidence is unavailable, record the exact blocker rather than inventing replacement terms or declaring verification complete.
- Record the URLs actually opened, applicable version/effective or campaign dates, claims checked and affected pages/product data. A source check supports only the claims actually reviewed, not every claim on a page or every article using that provider.
- After a source review, update the matching `docs/content/source-review.json` record with the checked scope, source URLs/version, actual `checkedAt`, known validity window and next editorial review date. Do not advance dates for unfinished checks or leave superseded source versions in the active record. Preserve historical evidence as `historical` when it is still useful for explaining a retired claim.
- Set `updatedAt` only for a substantive editorial change, such as correcting financial terms or materially revising guidance. Cosmetic, layout, typography or citation-link-only changes do not advance it. Set `lastVerifiedAt` only when the relevant sources have actually been opened and checked for the scope that date represents; a partial check must not refresh a broader verification date. Keep displayed dates, schema and sitemap consistent with those meanings; neither field automatically advances the other.
- For new or changed timestamps, use the actual publication/revision time with explicit `+07:00`; never use a future instant. Display dates in `Asia/Ho_Chi_Minh` so UTC build environments do not shift the visible calendar day. Keep historical timestamps unless correcting a verified error.
- These are internal maintenance rules, not a requirement to add public disclaimers. A documentation/setup request alone does not start a content run or change workbook state.

## MB Bank Evergreen Content Engine

When the user says exactly or substantially:

`Bắt đầu tạo bài mới MB Bank`

read `AGENTS.md`, then the playbook, then the workbook, and run one MB Bank content cycle using these repository sources of truth:

- `docs/content/MB_BANK_CONTENT_ENGINE.md`
- `docs/content/1phutdangky_MB_Bank_Evergreen_Content_Engine.xlsx`

Operating rules:

- Read `Next Action` in the workbook first.
- Validate `Next Action` against actual `Evergreen Queue` statuses; select the best eligible `Ready` item by priority, dependencies, source readiness, and intent fit. Respect the seeded order unless these checks justify a different selection; log the reason.
- Mark it `In progress` before implementation.
- Execute exactly one content run unless the user explicitly requests more.
- Treat the 60-item schedule only as the initial backlog; the engine is evergreen.
- When no `Ready` item remains, run `Discovery Mode`, append 3–5 evidence-based candidates, set one best-qualified item to `Ready`, and execute that item.
- Keep current 1phutdangky.com UI/design system and reuse existing components.
- Respect Account / Referral / Card canonical ownership.
- Use affiliate code `MBAT113` everywhere the MB Bank referral code is required.
- Do not publish referral reward amounts unless current official MB terms verify them.
- For troubleshooting pages, solve the user's problem before affiliate CTA.
- Verify volatile financial/product/App-flow claims with current official MB/MB247 sources.
- Run repository lint/typecheck/tests/build as available.
- Review git diff, commit only relevant files, push if authenticated, and deploy through the existing Cloudflare workflow if authorized.
- Verify production after deploy.
- Mark the item `Done` only after successful checks and production verification; otherwise record `Blocked` with the exact blocker. Update `Evergreen Queue` and append `Run Log` with asset, URL, files changed, sources checked, checks, content commit hash, push, deployment status, production verification, and result. Refresh `Next Action` for the next run.

Additional requirements from the engine setup:

- A setup request or a quoted trigger example does not start a content cycle. Wait for the user's actual trigger invocation.
- Use only the two repository-local engine paths above. The workbook is the engine's state/database and source of truth; preserve its sheets, formulas, validations, formatting, and history.
- Account owner: `https://1phutdangky.com/mo-tai-khoan/mo-tai-khoan-mb-bank-online/` (keep URL); Referral owner: `https://1phutdangky.com/mo-tai-khoan/ma-gioi-thieu-mb-bank/`; Card owner: `https://1phutdangky.com/the-tin-dung/mo-the-mb-bank-online/`.
- For comparable opportunities, prefer Referral/MBAT113 conversion, Account task completion, Account acquisition, Card acquisition, then informational traffic. Never sacrifice intent or utility for affiliate value.
- Check source gates and canonical/cannibalization before choosing a new article, an update, or a merge as a section. Follow all SEO/GEO checks and the intent-based `CTA Matrix` in the playbook/workbook.
- In Discovery Mode, check accessible Search Console/query data, current SERP, current MB sources, and existing content. Cover new questions, troubleshooting, referral/conversion, account, card, and post-registration tasks; remove synonym duplicates and score demand, intent separation, user utility/content gap, affiliate value, source readiness, and cannibalization using `Discovery Rules`. Do not force content when no candidate qualifies.
- `Next Action` currently has formula ranges through queue row 164. Validate cached values against all actual queue rows, extend dependent ranges when appending beyond the template, and refresh the selector after state changes. Use empty pre-numbered `Run Log` rows before appending. The template capacity is not an engine stop condition.
- Read `README.md`, `DEPLOYMENT.md`, and current source before changes. Existing integration points: `src/pages/[...article].astro`, `src/content.config.ts`, `src/content/articles/`, `src/data/products/`, `src/layouts/ArticleLayout.astro`, `src/layouts/BaseLayout.astro`, and existing article/commercial components. Reuse author/source/disclosure/analytics behavior; do not invent reviewer credentials or bypass analytics consent.
- Current quality gate is `npm run check` (build, Pagefind, build validator). Focused regression commands are `npm run test:validator` and `npm run test:maintenance`; run them when their rules change. No separate lint/typecheck scripts exist; report checks actually performed.
- Commit only relevant engine/content files, never secrets or unrelated changes; never force-push. Log the content commit hash, then persist post-deployment status/log updates in a subsequent state commit when possible; do not attempt to record a commit's own hash inside itself.
- Documentation/instruction/workbook-only setup needs no manual production deployment. Do not change domain, DNS, environment variables, Cloudflare project, deployment branch, or configuration to force/prevent automatic deployment.

## TPBank Evergreen Content Engine

When the user says exactly or substantially:

`Bắt đầu tạo bài mới TPBank`

run exactly one TPBank content cycle using these repository sources of truth:

- `docs/content/TPBANK_CONTENT_ENGINE.md`
- `docs/content/1phutdangky_TPBank_Evergreen_Content_Engine.xlsx`

Operating rules:

- A setup request or a quoted trigger example does not start a content cycle. Wait for the user's actual trigger invocation.
- Read `AGENTS.md`, then the TPBank playbook, then the workbook. Inspect `Next Action` before the other sheets and validate its cached selection against all actual `Evergreen Queue` statuses.
- Select the best eligible `Ready` item by priority, foundation dependencies, source readiness and intent fit. Respect the seeded order unless these checks justify a different selection; log the reason. Do not ask the user to choose a topic, keyword, title or URL when the available data is sufficient.
- Mark the selected item `In progress` before implementation. Execute exactly one content run unless the user explicitly requests more.
- No TPBank articles or products existed at setup. Recheck the actual repository on every run; create missing Account and Credit Card foundations before dependent support pages, rather than assuming they remain absent or creating duplicates.
- Account owner: `https://1phutdangky.com/mo-tai-khoan/mo-tai-khoan-tpbank-online/`. Credit Card owner: `https://1phutdangky.com/the-tin-dung/mo-the-tin-dung-tpbank-online/`. Keep payment-account opening and credit-card application intent separate; route support content to its corresponding owner.
- 1 Phút Đăng Ký does not use a TPBank referral code. Never create, request, configure, or wait for one; do not create a Referral Pillar or a default `/ma-gioi-thieu-tpbank/` URL.
- An independently configured, valid TPBank affiliate link may be used without a referral code. Inspect existing project configuration first; never invent a link or reuse another bank's offer/code. Official product actions may use existing components without a referral code or monetized offer.
- Owner-approved TPBank App affiliate URL: `https://nganhangso.tpb.vn/7s6k/1yg2b1ta`. Preserve this exact URL for App download/open actions and keep `Plan Settings` / `CTA Matrix` aligned. Do not replace it with an expanded store URL or describe an App-download click as a submitted account/card application.
- Discuss official TPBank campaign codes only as TPBank campaign codes, with current official sources, dates and eligibility; never present them as a code owned by this website. Promotion content normally belongs to the relevant Account or Credit Card owner.
- Check canonical ownership, cannibalization and standalone utility before deciding between a new URL, an update or a section. Follow the workbook's `Execution Briefs` and `CTA Matrix` within the repository's current content and visual contracts.
- Keep current UI/UX and reuse existing components. Frontmatter `title` remains the single title for H1, listing cards and generated social images; seeded SEO-title/H1 suggestions are not separate visual titles. Keep article titles ending in `online` under the owner's current convention.
- For troubleshooting pages, answer the problem before any CTA. Verify volatile fees, interest, product lineup, promotions and App-flow claims with current official TPBank sources before publication.
- Reuse existing author, source, disclosure and consent-aware analytics behavior. Treat workbook event names as planning labels to map to existing tracking; do not add unapproved tags, bypass consent or change shared UI to implement them.
- Read `README.md`, `DEPLOYMENT.md` and current source before implementation. Current quality gate: `npm run check` (Astro build, Pagefind and build validator); focused regression commands are `npm run test:validator` and `npm run test:maintenance`. No separate lint/typecheck scripts exist. Report the checks actually available and performed.
- Review git diff, commit only relevant files and push if authenticated and authorized. Never commit secrets, force-push or rewrite history. Use the existing GitHub/Cloudflare workflow; do not create a repository/project or change DNS, domain, environment variables or production branch.
- Verify production URL, CTA, mobile layout, canonical, internal links and runtime after deployment. Mark `Done` only after the applicable quality and production checks pass; otherwise record `Blocked` or the appropriate unfinished status with the exact blocker.
- Update `Evergreen Queue`, append `Run Log` and refresh `Next Action` after state changes. Use TPBank's actual sheet headers; its log columns differ from the other engines. Record asset, URL, files, sources, checks, content commit hash, push, deployment and production verification. Persist post-deployment state in a subsequent commit when possible; never record a commit's own hash inside itself.
- Preserve workbook sheets, formulas, validations, formatting and history. Validate selector caches against all actual queue rows, extend dependent ranges when appending beyond the current row-164 selector capacity, and use empty pre-numbered log rows before appending. The template capacity is not an engine stop condition.
- The initial 60-item queue is a starting backlog. When no eligible `Ready` item remains, run `Discovery Mode`: inspect accessible Search Console/query data, current SERP, official TPBank products/policies/fees/FAQs and existing content; append 3–5 evidence-based candidates scored for demand, intent separation, utility, conversion value, source readiness and cannibalization. Set one qualified item `Ready` and execute it; do not force thin content when no candidate qualifies.
- Documentation/instruction/workbook-only setup does not run the first article or require manual production deployment. Preserve any automatic Cloudflare workflow triggered by an authorized push; do not force or suppress it.

## Home Credit evergreen content engine

When the user says exactly or substantially:

> Bắt đầu tạo bài mới Home Credit

run the Home Credit evergreen content workflow without asking the user to choose a topic.

Source of truth:
- `docs/content/1phutdangky_Home_Credit_Evergreen_Content_Engine.xlsx`
- `docs/content/HOME_CREDIT_CONTENT_ENGINE.md`

Required behavior:
1. Read `Next Action` in the workbook.
2. Select the first `Ready` item from `Evergreen Queue`.
3. Mark it `In progress` before implementation.
4. Validate canonical ownership, current official Home Credit sources, and URL-vs-section gate.
5. Reuse the existing 1phutdangky.com UI/components; do not redesign.
6. Implement exactly one content run unless the user asks for more.
7. Run the repository's existing lint/typecheck/test/build checks.
8. Commit, push, and deploy through the repository's existing GitHub/Cloudflare workflow when credentials and permissions are already available.
9. Verify production.
10. Mark the queue item `Done` or `Blocked` and append a row to `Run Log` with URL, sources, checks, commit, push, deploy, and verification result.
11. If no `Ready` item exists, run Discovery Mode from the workbook, append 3-5 evidence-based candidates, set exactly one qualified item to `Ready`, then execute it.

Do not create a new URL merely to maintain publishing cadence. Conditional items remain sections/updates unless their intent/source/cannibalization gate passes.

Additional requirements from the Home Credit engine setup:

- A setup request or a quoted trigger example does not start a content cycle. Wait for the user's actual trigger invocation.
- Read `AGENTS.md`, then `docs/content/HOME_CREDIT_CONTENT_ENGINE.md`, then the workbook; inspect `Next Action` before the other workbook sheets. Validate the selector against actual `Evergreen Queue` statuses before selecting the first eligible `Ready` item.
- Use only the two repository-local source-of-truth paths above. Preserve the workbook's sheets, formulas, validations, formatting, and run history; refresh `Next Action` after state changes.
- Read `README.md`, `DEPLOYMENT.md`, and current source before implementation. The current quality gate is `npm run check` (build, Pagefind, build validator); focused regression commands are `npm run test:validator` and `npm run test:maintenance`; no separate lint/typecheck scripts exist. Reuse the existing author/source/disclosure behavior and consent-aware analytics.
- Mark an item `Done` only after successful quality checks and production verification; otherwise record `Blocked` with the exact blocker. Record the content commit hash, then persist post-deployment state/log changes in a subsequent state commit when possible; never attempt to record a commit's own hash inside itself.
- Documentation/instruction/workbook-only setup needs no manual production deployment. Do not change domain, DNS, environment variables, Cloudflare project, deployment branch, or configuration to force/prevent automatic deployment.
