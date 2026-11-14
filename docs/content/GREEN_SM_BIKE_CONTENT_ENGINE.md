# Green SM Bike – Evergreen Content Engine

**Website:** https://1phutdangky.com\
**Confirmed category:** `/dang-ky-doi-tac/`\
**Editorial pillar URL candidate:** `https://1phutdangky.com/dang-ky-doi-tac/dang-ky-tai-xe-green-sm-bike/`\
**User-provided primary recruitment source:** https://tuyentaixe.greensm.com/dang-ky-tai-xe-green-sm-bike\
**Second official source:** https://www.greensm.com/vn-vi/driver-bike\
**Trigger:** `Bắt đầu tạo bài mới Green SM Bike`\
**Primary CTA label:** `Đăng ký tài xế Green SM Bike`\
**Shared CTA URL:** `https://fast.accesstrade.com.vn/deep_link/v5/6083423853747419148/6757021256279841672?utm_source=1phutdangky&utm_medium=website&utm_campaign=dang-ky-doi-tac&sub4=oneatweb&url_enc=aHR0cHM6Ly90dXllbnRhaXhlLmdyZWVuc20uY29tL2Rhbmcta3ktdGFpLXhlLWdyZWVuLXNtLWJpa2U%3D`

## 1. Installation and source of truth

Merge `AGENTS_GREEN_SM_BIKE_SNIPPET.md` into root `AGENTS.md` without overwriting any existing evergreen engine. Place:

- `docs/content/GREEN_SM_BIKE_CONTENT_ENGINE.md`
- `docs/content/1phutdangky_Green_SM_Bike_Evergreen_Content_Engine.xlsx`

Read `AGENTS.md` → playbook → Excel sheets **Next Action, Evergreen Queue, Execution Briefs, CTA Matrix, Publish Source Matrix, Content Portfolio, Discovery Rules, Run Log**. Workbook is editable state, not just an editorial plan. Preserve all existing instructions for MB Bank, Home Credit, TPBank and Home PayLater.

## 2. Exact business scope and canonical architecture

The user has approved the **category** `/dang-ky-doi-tac/` and wants it created if missing. At setup, the repository supports four categories and has no partner-registration category or Green SM Bike article/product. Recheck actual app routes, content taxonomy, navigation, sitemap, old redirects and production before implementation. Only the first triggered content run may extend `src/config/site.ts`, `src/content.config.ts`, the shared category palette, navigation/icon mapping, build/maintenance validators and related tests for this category; sitemap and breadcrumbs follow the existing routing. Preserve existing UI and do not make these application changes during setup.

There is no existing Green SM Bike source article supplied by the owner. Treat it as a greenfield content cluster, while auditing the repo to prevent duplicates.

The first article should be a **Green SM Bike motorcycle-driver recruitment pillar**, editorial candidate `https://1phutdangky.com/dang-ky-doi-tac/dang-ky-tai-xe-green-sm-bike/`. This is a proposed slug that follows the site's patterns, NOT explicitly approved by the user. Check current routing before publishing; if a materially different existing canonical/slug conflict exists that cannot be resolved from repo, ask owner **one** targeted question before publishing. Do not generate multiple synonyms as separate URLs.

The pillar owns variations: đăng ký/tuyển tài xế xe máy Green SM, Green SM Bike, chạy Xanh SM Bike (tên cũ), hướng dẫn đăng ký/ứng tuyển Green SM Bike. Supporting question content becomes stand-alone only with distinct intent + separate SERP + credible current sources + sufficient standalone utility + limited cannibalization. Otherwise use H2/H3/FAQ in owner.

**Brand research seed:** the supplied materials reference a Xanh SM → Green SM announcement dated **13/04/2026**. Verify the applicable official announcement before publishing this date. Use Green SM primary and explain the former name when useful. Supplied official source: https://www.greensm.com/vn-vi/news/xanh-sm-doi-ten-thanh-green-sm-dong-bo-nhan-dien-thuong-hieu-tren-toan-cau

**Product boundaries:** Green SM Bike (2-wheel drivers), Green SM Car/Taxi (4 wheels), and Green SM Platform (different partner/vehicle model) are distinct. Never copy job requirements, incomes, incentives, deposits or vehicle rules from Car/Taxi/Platform into Bike pages.

## 3. CTA – one identical AccessTrade destination for the entire Bike engine

User supplied a single tracked URL in `Plan Settings!B11`:

`https://fast.accesstrade.com.vn/deep_link/v5/6083423853747419148/6757021256279841672?utm_source=1phutdangky&utm_medium=website&utm_campaign=dang-ky-doi-tac&sub4=oneatweb&url_enc=aHR0cHM6Ly90dXllbnRhaXhlLmdyZWVuc20uY29tL2Rhbmcta3ktdGFpLXhlLWdyZWVuLXNtLWJpa2U%3D`

Use this exact string whenever a Green SM Bike recruitment CTA is appropriate, including future Bike content. Do not shorten, strip, re-encode, reorder, or replace query arguments; preserve `utm_source=1phutdangky`, `utm_medium=website`, `utm_campaign=dang-ky-doi-tac`, `sub4=oneatweb`, `url_enc`.

The URL's decoded destination equals user-supplied `https://tuyentaixe.greensm.com/dang-ky-tai-xe-green-sm-bike` (checked as an encoded destination, **not** a confirmation that the remote landing page or tracker is currently operational). Validate the click path during QA if authorized; never claim it works without a real successful check. Use the existing site CTA/button style. Primary label: `Đăng ký tài xế Green SM Bike`. Target `rel` and open-in-new-tab behavior should follow existing safe external-link conventions. Reuse existing analytics events (`cta_green_sm_bike` / `outbound_green_sm_bike`) if configured; never add a new vendor for one button.

**Disclosure:** 1 Phút Đăng Ký is an independent content publisher and may receive a commission when a qualified user proceeds via the referral/affiliate link. Disclose this near prominent CTA, and never suggest this site is Green SM's official recruitment office, decision maker or employer. Send applicants to the provider's own application flow. Do not receive identity documents, OTP, passwords, banking information or payments on 1 Phút Đăng Ký.

## 4. One-trigger, one-content-run operating loop

Upon `Bắt đầu tạo bài mới Green SM Bike`:

1. Inspect repo, current routes/content, `AGENTS.md`, workbook and recent `Run Log` / commits.
2. Read `Next Action` first, apply the shared maintenance gate to published Bike content/product data and official recruitment terms, then validate the selector cache against all actual `Evergreen Queue` rows. Resume unfinished work before selecting a new item. A necessary substantive correction to the canonical owner is the one item for this run. Prefer first eligible `Ready` item then first eligible `Planned` item. If none, enter Discovery Mode. Check actual dependency and do not duplicate an already implemented URL/section.
3. Set selected queue item to `In progress` in workbook and persist accurately. If concurrent runs are detected, stop instead of overwriting run state.
4. If the root category is absent, create the `/dang-ky-doi-tac/` category using existing UI/routing architecture in the same first pillar run; avoid breaking unrelated URLs. Check pillar slug candidate as described above.
5. Verify **current Green SM Bike** source, including the user-provided primary recruitment page and official `greensm.com/vn-vi/driver-bike`. If direct page access is blocked, report that and use provider's other official evidence, **without pretending the form content was verified**.
6. Apply claim + publishing gates. Decide article/new URL vs section/update vs blocked. Use official current Bike requirements. Materially conflicting claims must be omitted pending verification or escalated if essential.
7. For the pillar, reuse the shared Product Card before the table of contents (`productBeforeToc: true`) and existing affiliate action/disclosure components. Model the recruitment program separately from bank accounts, loans or BNPL; do not classify it as a financial product just to satisfy a schema. Configure the exact AccessTrade link as an appropriate enabled affiliate offer and keep program facts specific to Bike, with the article category palette inherited by the card. Implement answer-first content with useful step-by-step, current documents/eligibility, realistic job/earnings explanations, source references, author/review date, correct SEO metadata, breadcrumbs, canonical, sitemap and internal links per site conventions.
8. Place exact CTA near registration-ready intent, after practical eligibility/process guidance, and optionally at end. Use no paid placement to obscure essential conditions. Add independent-site affiliate disclosure near CTA.
9. Read `README.md`, `DEPLOYMENT.md` and current source. The current quality gate is `npm run check` (Astro, Pagefind, build validator). Use `npm run test:validator` and `npm run test:maintenance` when their rules change; no separate lint/typecheck scripts exist. Map planning event labels in the workbook to existing consent-aware analytics without adding tags/vendors or bypassing consent. Run available checks; review mobile/desktop layout, overflow, keyboard/link accessibility, CTA href, external sources, broken images/links, title/meta/canonical and actual routes. Do not disable quality gates.
10. Review Git diff. Commit only related code and workbook state, never `.env`, API keys or unrelated files. Push only when authenticated/authorized. Do not force-push.
11. Deploy only via existing Cloudflare workflow (GitHub auto-deploy or existing scripts). Do not create project, change DNS, domain, secrets, branch or arbitrary build settings.
12. If deploy possible, verify real production page and CTA destination string, metadata, category route, sitemap and mobile layout. Distinguish deploy start/success and production verification.
13. Record the content commit SHA, then persist post-deployment status/log changes in a subsequent state commit; never record a commit's own hash inside itself. Preserve workbook sheets, formulas, formatting, validation and history. Current selectors cover rows 5–1000: refresh cached values and extend dependent selector/dashboard/validation ranges when needed. Use Run Log's actual column headers and empty non-template rows, preserving its template row. Record actual timestamps with `+07:00` and explicit date formatting. Update queue to `Done` **only** when delivery criteria actually completed; otherwise leave `In progress`/`Blocked` with exact reason. Append real timestamp, asset ID, source URLs, files, tests, commit SHA, push/deploy status, URL and next action to `Run Log`. Persist workbook in repo.
14. End after exactly one selected content item. Do not silently implement multiple unrelated items.

Apply the shared evidence-date rules: cosmetic/citation-only edits do not advance `updatedAt`, and partial checks do not refresh a broader `lastVerifiedAt`. These internal rules do not require extra public disclaimers.

The tool cannot perform future background runs from instructions alone; user triggers each invocation manually or sets up a separate permitted scheduled workflow.

## 5. Product-specific truth / claim gates

**Official Green SM Bike application page:** https://tuyentaixe.greensm.com/dang-ky-tai-xe-green-sm-bike (owner supplied; verify live on publish date).\
**Official Green SM Bike details:** https://www.greensm.com/vn-vi/driver-bike

- Age, licence types, documents (including criminal-record documents), eligibility and city coverage may change. The current indexed Bike page mentions documents such as identity document, driving licence, criminal record, owned bank account/SIM, practical interview and health check. Verify the latest implementation conditions before writing a definitive rule.
- **Known cross-date conflicts:** the 2023 Bike recruitment article gave different ages than the current indexed 2026 Bike page; the 2025 policy note changes LLTP handling while the current Bike landing may still mention LLTP số 02. Never choose a figure simply because it appears first. Use the most recent authoritative, applicable Bike notice and note exceptions; if unresolved, avoid unsupported definitive claim.
- The official Bike FAQ says Bike drivers do **not** have a fixed salary; earnings depend on rides and applicable incentive programs. Do **not** convert a marketing 'lên đến' amount into guaranteed income. Never invent monthly take-home pay, fixed wage, acceptance rate, minimum shifts, service fees, deposit, bonus, or time-to-contact.
- Dated Bike promotions (e.g. 2025 initial deposit reduction) are historical unless current official terms explicitly extend them. Do not re-publish as current 2026 benefits by default.
- Do not assume Bike users can bring their own vehicles under the same terms as Green SM Platform. Separate vehicle models and contract programs clearly.
- Do not post job listings as `JobPosting` structured data unless a real position, employer details, location, compensation validity and policy compliance can be established. General affiliate recruitment guides ordinarily use suitable Article/Breadcrumb schemas, not fabricated job postings.
- Don't instruct prospective drivers to pay a deposit to the publisher, any individual bank account, or unauthorized social link. Redirect questions to Green SM's actual official program and support channels.

## 6. SEO/GEO and cluster rules

Use descriptive title/H1 and concise answer-first blocks. Choose one frontmatter `title` ending in `online` for H1, listing cards and generated social images, following `AGENTS.md`; workbook SEO-title/H1 entries are editorial suggestions, not separate visual titles. Candidate title: `Đăng ký tài xế xe máy Green SM Bike online`. This title convention does not require changing the proposed URL slug. Handle Xanh SM in intro/FAQ as old-name modifier. No thin synonym pages.

Clusters: application/pillar, eligibility, paperwork, workflow/interview, income, costs/deposits, schedule, vehicle, geography, post-application troubleshooting, safety, brand FAQ. The queue starts with 60 seed work items; **these are research/editorial candidates without claimed monthly search volume**. Each run chooses exactly one useful action, not necessarily a URL. Important support pages may become standalone only if gates pass.

Internal link graph: category → Bike pillar → eligibility/docs/process/economics/ support → Bike pillar/CTA. Link to Car/Platform only when explaining product differences and avoid making unrelated affiliate claims.

Keep external citation URLs in the final existing Sources/verification block, with prose/list/table/FAQ references rendered as plain text. Preserve internal links and explicit CTA actions. Record checked scope, source version/dates and actual checked-date in Run Log and the shared source-review ledger; supplied source observations are research seeds, not proof of a new live check. No fake review timestamp, source verification or conversion metrics. Keep source links working and category landing discoverable.

## 7. Evergreen discovery when the initial queue is exhausted

1. Read completed queue/content, Search Console if connected, relevant live SERP and official news/FAQ.
2. Generate 3–5 candidates with specific query problem, user journey stage, canonical owner, proposed article/section decision, verified source link and business value.
3. Score demand, intent separation, source readiness, standalone utility, qualified recruitment conversion, and subtract cannibalization/product-conflation penalties.
4. Do not add unverified job promises, geographic city pages without local program data, or synonyms already covered by the Bike pillar.
5. Append viable candidates to `Evergreen Queue` with `Research` or `Planned`; set the best **eligible** item to `Ready` only if source and dependency gate passes.
6. Execute one qualifying item in the current run; otherwise report blocker. Stop.

## 8. GitHub, Cloudflare, handover

**Setup run:** read repo, merge AGENTS snippet into root `AGENTS.md`, place workbook and playbook in `docs/content/`, inspect files/references, commit/push docs if authorized. **Do not publish first article or proactively deploy production** in setup; if the existing GitHub push triggers auto-deploy, report it truthfully.

**Content runs:** use existing Git/Cloudflare workflows, run project checks, check production if deployment succeeded, and keep detailed Run Log. If the remote, permissions or scripts are absent, do not invent success; state local commit and manual next step.

**Report after each content run:** asset ID; article/section/update; URL; source verification + checked date; CTA exact link verification; files changed; SEO/links/UI QA; lint/typecheck/tests/build; Git branch+SHA+push; Cloudflare status and production URL; queue state; next action; unresolved items.

**Setup trigger:** Install the engine only.\
**Daily user command:** `Bắt đầu tạo bài mới Green SM Bike`.
