## Article URL structure

- Every article must use `/<category>/<slug>/`, with exactly one category segment matching its `category` frontmatter: `mo-tai-khoan`, `the-tin-dung`, or `vay-tien-mat`.
- Store article files and their cover assets in `src/content/articles/<category>/`. Do not publish articles at the site root or override their slug to bypass the category directory.
- When moving a published article, add a direct 301 redirect for its old URL and update internal links, canonical, breadcrumb data, sitemap and active engine references. Preserve historical run logs.

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
- Current quality gate is `npm run check` (build, Pagefind, build validator). No separate lint/typecheck/test scripts exist; use available checks and report unavailable ones accurately.
- Commit only relevant engine/content files, never secrets or unrelated changes; never force-push. Log the content commit hash, then persist post-deployment status/log updates in a subsequent state commit when possible; do not attempt to record a commit's own hash inside itself.
- Documentation/instruction/workbook-only setup needs no manual production deployment. Do not change domain, DNS, environment variables, Cloudflare project, deployment branch, or configuration to force/prevent automatic deployment.

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
- Read `README.md`, `DEPLOYMENT.md`, and current source before implementation. The current quality gate is `npm run check` (build, Pagefind, build validator); no separate lint/typecheck/test scripts exist. Reuse the existing author/source/disclosure behavior and consent-aware analytics.
- Mark an item `Done` only after successful quality checks and production verification; otherwise record `Blocked` with the exact blocker. Record the content commit hash, then persist post-deployment state/log changes in a subsequent state commit when possible; never attempt to record a commit's own hash inside itself.
- Documentation/instruction/workbook-only setup needs no manual production deployment. Do not change domain, DNS, environment variables, Cloudflare project, deployment branch, or configuration to force/prevent automatic deployment.
