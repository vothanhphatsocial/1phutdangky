# Home Credit Evergreen Content Engine

## Operator command

The normal operator input is only:

> Bắt đầu tạo bài mới Home Credit

Do not ask the operator which topic, title, URL, or pillar to choose when the workbook already provides enough information.

## State and source of truth

Use:

`docs/content/1phutdangky_Home_Credit_Evergreen_Content_Engine.xlsx`

Important sheets:

1. `Next Action` — the item to execute now.
2. `Evergreen Queue` — persistent content backlog and state.
3. `Evergreen Operating Protocol` — run sequence and stop conditions.
4. `Execution Briefs` — editorial/SEO/GEO requirements.
5. `CTA Matrix` — affiliate CTA strength and placement.
6. `Publish Source Matrix` — allowed evidence and volatility rules.
7. `Discovery Rules` — how to extend the queue after the initial backlog.
8. `Run Log` — permanent execution evidence.

The old 60-day schedule is only an initial backlog. It is not a stopping point and is not the primary selector.

## One-run algorithm

### 1. Load state

Read repository instructions and the workbook.

Open `Next Action`.

If it contains an Asset ID, execute that item.

If it contains `DISCOVERY`, run Discovery Mode first.

### 2. Lock the item

Find the corresponding row in `Evergreen Queue` and change:

`Ready` -> `In progress`

Record the start of the run in `Run Log`.

### 3. Decide URL vs existing page

Use the queue, execution brief, current routes, and live SERP/source evidence.

A new URL is allowed only when:
- intent is independently useful,
- the page can solve a standalone task,
- current source coverage is sufficient,
- the route does not materially cannibalize an existing owner.

If those conditions are not met, implement the item as a section/update/FAQ/table in its canonical parent.

Do not manufacture a URL merely because the operator asked for a "new article".

Every article must use `/<category>/<slug>/`, matching the frontmatter and source directory. Home Credit loan articles use `/vay-tien-mat/`; credit-card articles use `/the-tin-dung/`. Do not publish articles at the site root. Add a direct 301 redirect when moving an existing URL, and update active links/canonical references while preserving historical run logs.

### 4. Verify current financial information

Before publishing volatile claims, re-check official Home Credit sources.

This applies especially to:
- loan interest,
- card interest,
- fees,
- age/eligibility,
- limits,
- repayment terms,
- early settlement,
- cash advance,
- installment terms,
- promotions,
- application/approval flow.

Prefer official Home Credit sources and current contractual/tariff materials.

Do not copy stale numbers from old articles or third-party SERPs.

### 5. Preserve site UI

The target site is:

`https://1phutdangky.com`

Reuse the existing content model, article template, CTA component, source block, disclosure, typography, spacing, colors, navigation, header, and footer.

Do not redesign the site or introduce a separate affiliate landing-page visual system.

### 6. Conversion ownership

Cash-loan intent routes to the cash-loan pillar/support cluster.

Credit-card intent routes to the credit-card pillar/support cluster.

Use the CTA intensity defined in `CTA Matrix`.

Troubleshooting, servicing, billing, payment, rejection, and eligibility pages solve the user's task before presenting commercial CTAs.

### 7. Safety and trust

Do not request or collect OTP, PIN, passwords, login credentials, biometric information, or banking secrets.

Do not provide bypasses for identity verification, underwriting, credit checks, or security controls.

Do not promise approval, guaranteed limits, guaranteed disbursement time, or guaranteed promotional benefits unless the official source explicitly guarantees them for the relevant case.

### 8. Implement

Make the smallest coherent change that satisfies the selected queue item.

Update:
- content,
- SEO title/meta,
- H1/H2/H3,
- canonical where applicable,
- internal links,
- sources,
- disclosure,
- CTA,
- structured data only when appropriate,
- tracking only through the project's existing analytics pattern.

### 9. Quality checks

Use the repository's existing scripts.

Run applicable:
- lint,
- typecheck,
- tests,
- build.

Do not suppress new errors merely to make checks pass.

Distinguish pre-existing errors from errors caused by the run.

### 10. Git and deployment

Review `git diff` and commit only relevant changes.

Never commit secrets, `.env`, tokens, API keys, credentials, or local/debug artifacts.

If GitHub credentials and push permissions are already available, push using the existing branch/workflow.

If the project deploys to Cloudflare from GitHub, use that existing path.

If the project uses an existing Wrangler/deploy script, use only the existing configured script.

Do not create a new Cloudflare project, change DNS, replace domains, or invent deployment commands.

If credentials are unavailable, report the exact blocked step; do not pretend deployment succeeded.

### 11. Production verification

After deployment, verify the affected production URL(s):
- route loads,
- canonical is correct,
- title/meta are correct,
- internal links work,
- CTA works,
- affiliate disclosure is visible where required,
- sources work,
- mobile layout is not broken,
- no obvious runtime/console errors,
- existing canonical pages are not accidentally replaced or redirected.

### 12. Persist state

At the end of the run, update the selected `Evergreen Queue` row with:
- `Done` or `Blocked`,
- last checked date,
- final route/URL,
- commit hash,
- deployment status,
- notes if needed.

Append a complete row in `Run Log` with:
- selected asset,
- decision,
- route,
- sources checked,
- files changed,
- quality checks,
- commit,
- push status,
- deploy status,
- production verification,
- final result.

This state update is mandatory. It is how the next run knows where to continue.

## Discovery Mode

Run Discovery Mode only when no queue row remains `Ready`.

Use evidence in this order where available:
1. Search Console queries/pages,
2. current site gaps,
3. current SERP/query patterns,
4. official Home Credit product/support/contract sources,
5. conversion/task-completion gaps.

Generate only 3-5 candidates per discovery run.

Score them using `Discovery Rules`.

For a new URL, require strong intent separation and adequate official-source readiness.

If a topic has value but overlaps an existing canonical owner, add it to the queue as an update/section rather than a new page.

Append qualified candidates to `Evergreen Queue`.

Set exactly one best candidate to `Ready`; keep the rest as `Research`.

Then execute the newly `Ready` item in the same run.

## Normal final report

Keep the operator report short. Include:
- what was implemented,
- URL created/updated,
- whether it was a new page or merged section,
- sources verified,
- build/test status,
- commit hash and push status,
- Cloudflare/production status,
- next queued Asset ID.

The operator should not need to make a content-planning decision after a successful run.
