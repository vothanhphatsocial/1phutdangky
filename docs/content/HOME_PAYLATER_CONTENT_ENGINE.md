# Home PayLater Evergreen Content Engine

**Site:** https://1phutdangky.com\
**Category:** `/vi-dien-tu/`\
**Owner-confirmed product pillar:** `https://1phutdangky.com/vi-dien-tu/mo-tai-khoan-tra-sau-home-paylater-online/`\
**Trigger:** `Bắt đầu tạo bài mới Home PayLater`\
**Product:** Tài khoản trả sau Home PayLater, do Home Credit phát triển (BNPL / mua trước trả sau)\
**Primary contact CTA:** `Nhắn Zalo – Võ Thành Phát` → https://zalo.me/0896451911\
**Contact role (owner-confirmed):** Võ Thành Phát là nhân viên Home Credit.

## 1. Source of truth / install paths

Read these files in order:

1. `AGENTS.md` (repository instructions)
2. `docs/content/HOME_PAYLATER_CONTENT_ENGINE.md`
3. `docs/content/1phutdangky_Home_PayLater_Evergreen_Content_Engine.xlsx`
4. Workbook sheets: **Next Action → Evergreen Queue → Execution Briefs → CTA Matrix → Publish Source Matrix → Content Portfolio → Discovery Rules → Run Log**.

The workbook is the content queue and persistent state. The Markdown playbook defines the workflow and hard rules. Follow existing higher-priority repository/security instructions. Preserve all sheets, formulas, validations, formatting and historical logs. `Next Action` currently selects within queue rows 5–64; validate against all actual rows, extend dependent selector/dashboard/validation ranges when adding items, and refresh formula caches after state changes. The 60-row seed is not an engine limit.

## 2. Starting state and route decisions

At setup, there was no Home PayLater article and `/vi-dien-tu/` had been deleted. The first content run restored the category and published the approved pillar on 2026-11-13; both production URLs were verified. Recheck actual content, routes and workbook on each run, and update the canonical owner instead of recreating it.

- **Required category:** `https://1phutdangky.com/vi-dien-tu/`. Restore it within the current routing/navigation/taxonomy architecture if missing. Respect existing design/components and consider original route history, redirects, sitemap and category discoverability.
- **Product pillar:** one new article at **`https://1phutdangky.com/vi-dien-tu/mo-tai-khoan-tra-sau-home-paylater-online/`**, owning generic account-opening and Home PayLater registration intent. This canonical is **approved by the site owner**. Inspect repository route conventions for correct implementation, without changing its exact path or asking to re-confirm it.
- **Category integration:** `vi-dien-tu` is supported in category config, article schema, shared palette, navigation, sitemap and build/maintenance validation. The pillar uses the shared Product Card with a separate `bnpl` product and an explicit contact action for Zalo; the contact action is not an affiliate offer or official registration submission. Keep the current design system and exact canonical; do not map BNPL to an unrelated product type merely to pass a schema.
- **Do not treat Home PayLater as a generic e-wallet.** The category is the website's taxonomy choice. The financial product is a Home Credit buy-now-pay-later service, not a cash loan or generic digital wallet.
- **Do not reuse the Home Credit cash-loan canonical** for Home PayLater, even if the same provider backs both products. Contextual cross-linking is allowed, but intent ownership is separate.

## 3. One-trigger, one-run workflow

When the user says **`Bắt đầu tạo bài mới Home PayLater`**:

1. Inspect repository state, `AGENTS.md`, playbook, workbook and recent Git history.
2. Read `Next Action` first, then follow the shared maintenance gate in `AGENTS.md` for published Home PayLater content and source records before selecting work. A necessary substantive maintenance correction is the one content item for that run. Validate `Evergreen Queue` statuses against the selector cache. Prefer the earliest `Ready` item; otherwise promote the earliest eligible `Planned` item after dependency/source checks. If queue is exhausted, perform Discovery Mode.
3. Verify the item has not already been published or completed; check route, body content, canonical, recent commits and `Run Log` for idempotency.
4. Mark the selected item `In progress` in the working workbook (do not mark Done prematurely).
5. Restore `/vi-dien-tu/` as a foundation dependency in the same content run if missing, using site conventions; use the owner-approved canonical path for the pillar.
6. Research current official Home PayLater / Home Credit sources. Apply Source Gate and check intent separation/duplicate content.
7. Choose **New article / Update existing / Add section / Block**. A planned item is **not automatically a new URL**.
8. Implement one meaningful content item, using the site's current UI, article components, source blocks, navigation, and SEO implementation.
9. Add the Zalo CTA only as defined in `CTA Matrix`; include a clear independent-site context, safety copy and no unsupported promise of approval.
10. Read `README.md`, `DEPLOYMENT.md` and current implementation. Run `npm run check` (Astro build, Pagefind and build validator); use `npm run test:validator` / `npm run test:maintenance` when their rules change. No separate lint/typecheck scripts currently exist. Review diff, routes, internal links, canonical and responsive UI.
11. Commit relevant code and state as appropriate; push only when authenticated/authorized; use the configured Cloudflare workflow, never assume a command or project.
12. Verify deployed production (when deploy is possible): HTTP page, canonical, metadata, CTA URL, visible label, `/vi-dien-tu/`, responsive, sitemap, sources, no runtime errors.
13. Only when the completion gate is met, mark `Done`, append actual URL, source dates, Git SHA, push/deployment status and outcome to `Run Log`. If production verification is pending, leave `In progress`/`Blocked` as appropriate, then report. Never invent a successful deploy.
14. Record the content commit hash, then persist post-deployment status/log changes in a subsequent state commit; never record a commit's own hash inside itself. Persist workbook state back into the repository. If a post-deployment log commit triggers an additional build, follow existing workflow rather than disabling it. Stop after **one** content run.

Do not choose a different asset simply because the first one hits a material blocker requiring user confirmation; report the blocker clearly.

## 4. Canonical ownership and content gates

**PILLAR:** Home PayLater registration / opening / account overview, direct-answer benefits/requirements, using the Home Credit app, usage, eligibility context, costs, repayment, safety, CTA. Owns synonyms `mở`, `đăng ký`, `tạo`, `kích hoạt tài khoản` unless an operation is clearly separate.

**Support hubs, only if warranted:** Conditions and preparation, fees/interest/terms, payment and due dates, errors/declines, QR and partners, safety, comparisons. A content item is a **standalone URL** only if independent intent, credible sources, sufficient standalone utility, distinct SERP and low cannibalization. Otherwise implement as H2/H3/FAQ/table within the canonical pillar or existing support hub.

**Never publish** a new page simply to satisfy one-content-item-per-trigger cadence. Updates, useful sections and source refreshes are valid work. Avoid changing last-reviewed dates if no substantive checking occurred.

## 5. Product truth and financial-claim controls

- Home PayLater is Home Credit's buy-now-pay-later product; it **does not provide cash withdrawal**. Do not conflate it with cash loans, a bank account, a credit card, or a normal e-wallet.
- Not all advertised terms apply to every order, period, customer or partner. Do not promise approval, 60-second completion, a specific approved limit, 0% interest for every tenor, fee-free treatment for all events, or any rewards without verifying the current offer/contract.
- Official pages differ on minimum registration age (examples: 18+ versus over 20). **DO NOT publish an age requirement until the applicable current Home Credit product conditions resolve the conflict**; if unresolved, escalate to the user rather than pick a number.
- Different official pages also describe different minimum order values or registration channels. Qualify by merchant/product/date and verify with current terms.
- Interest depends on transaction, term and assessment. Give practical cost framing and total repayment; verify penalties, late charges, cancellation/refund and repayment terms against the current contract and official sources.
- Distinguish provider-assessed eligibility and actual contract from informational guidance on 1 Phút Đăng Ký.
- Promotions and merchant partnerships change. Confirm current dates and partner participation before naming an active offer.

## 6. CTA – Zalo (explicit user configuration)

- **Destination:** `https://zalo.me/0896451911`
- **Visible recipient:** `Võ Thành Phát` (as supplied by the site owner)
- **Role:** nhân viên Home Credit (the site owner has confirmed this role).
- **Exact button label:** `Nhắn Zalo – Võ Thành Phát`. Preserve this owner-approved wording.
- Zalo is the provided contact endpoint for **Võ Thành Phát, nhân viên Home Credit**. State his role accurately. This Zalo endpoint is **not the Home Credit app or official identity-verification, approval, repayment or security system**; applications and regulated servicing must follow the provider's applicable official procedures.
- On account-opening/product-intent pages, place a clear Zalo contact CTA after essential explanation, plus optionally a second CTA after eligibility/steps. In support/payment/complaints pages, solve the task and point to official Home Credit channels first; use the contact CTA only where contextually appropriate and non-deceptive.
- The site owner has expressly confirmed **Võ Thành Phát is a Home Credit employee**. Do not invent additional titles, special accreditation, delegated approval powers or provider-owned support-channel status.
- Never collect or request OTP, PIN, passwords, full ID photos, biometric data, bank credentials or sensitive loan details through Zalo. No promise of guaranteed approval, special access, fee-waiver, cash withdrawal or cashback.
- Never ask users to pay a processing fee via personal account or Zalo; never place a "cash out Home PayLater" CTA. Home Credit warned about cash-out scams perpetrated over social media including Zalo in April 2026.
- Existing site CTA design system must be reused; update button destination/label only in Home PayLater content scope. Tracking event, if system supports it: `cta_hpl_zalo_click`; never add a new analytics vendor just for this.

## 7. Source hierarchy / verification

Source of truth (record URL + page/terms date + checked date in `Publish Source Matrix`):

1. https://www.homepaylater.vn/ — product landing, FAQ, usage/partners and contract links.
2. https://www.homecredit.vn/blog/huong-dan-dang-ky-home-paylater-online — Home Credit official registration overview, dated 09/04/2026.
3. https://www.homecredit.vn/faq/hop-dong-vay — official product interest/eligibility FAQs.
4. https://www.homepaylater.vn/huong-dan-thanh-toan/ — official repayment methods.
5. https://www.homecredit.vn/blog/canh-bao-gian-lan-rut-tien-mat-qua-tai-khoan-tra-sau-home-pay-later — official 22/04/2026 cash-out fraud warning.
6. https://www.homepaylater.vn/blog/huong-dan-mo-tai-khoan-home-paylater/ — official older registration article; may be superseded.
7. https://www.homepaylater.vn/blog/gioi-thieu-ve-home-paylater/ — official explanatory article; age claim conflicts with other official sources.

Official support for Home PayLater is on Home Credit's current contact pages; recheck before publication. The Home Credit fraud-alert page currently shows **1900 633 999** for card/Home PayLater service, but do not silently freeze hotline numbers across future updates.

Third-party SERP can suggest demand and user language, not prove current fees, eligibility, rewards, approval odds or partner status. For volatile claims recheck official contract/FAQ on publish day. When official sources conflict, block the claim and escalate; never guess.

## 8. Security / ethics / important product distinction

- Never provide instructions to monetize the account's limit into cash, circumvent purchase restrictions, simulate fake purchases, or route funds to personal bank accounts.
- The provided Zalo contact belongs to **Võ Thành Phát, nhân viên Home Credit** (owner-confirmed). Preserve a clear distinction between contacting this employee and Home Credit's official app/verification/contract/repayment/support channels, and keep any independent-publisher/affiliate disclosure accurate.
- No OTP or personal identity capture by 1 Phút Đăng Ký. Registration and identity verification occur only through official Home Credit channels.
- Home PayLater credit and Home Credit cash loans are different products. Do not mislead readers by conflating fees, terms, disbursement or eligibility.
- If reporting a suspicious transaction/contract or requesting account servicing, route to Home Credit official support first rather than the third-party contact CTA.

## 9. SEO / GEO / UI

- Maintain current 1phutdangky.com UI (fonts, colors, layout, widths, navigation, header/footer, cards, buttons, mobile behavior) with the current article components.
- For each new page/updated article: accurate title/meta/H1/H2-H3, canonical, breadcrumbs if supported, source references, reviewed date, safety/independent-site disclosure, descriptive internal links, schema only when appropriate and valid, sitemap/indexability.
- Use answer-first format: Question → Direct answer → conditions → details/steps → sources → safe next action.
- Follow shared article contracts in `AGENTS.md`: frontmatter `title` is the single H1/listing/social-image title; title ends in `online`; generated social images and shared category colors are automatic. External citation links belong only in the final Sources block; keep contact/action CTAs functional and explicitly identified as actions. Reuse consent-aware analytics; workbook event names are planning labels to map to existing tracking, not authorization to add tags or bypass consent.
- Follow the shared evidence-date rules: only substantive edits advance `updatedAt`; `lastVerifiedAt` requires actual source review for its scope; use actual timestamps with `+07:00`. Source URLs and historical claim dates supplied in this playbook/workbook are research seeds, not proof of a current source check. For the first pillar, the owner confirmed age 18+ on 2026-11-13 for the supported consultation channel, consistent with the official introduction; other official FAQ age text still differs. Preserve that scope and recheck on future edits instead of asserting that every channel was reconciled.
- Avoid duplicate titles/sections for synonyms. Keep category `/vi-dien-tu/` without mislabeling Home PayLater as a normal e-wallet.
- Do not generate or copy unsupported testimonials, customer numbers, promotional reward claims or outdated screenshots.

## 10. GitHub / Cloudflare / state persistence

- Setup run installs only this playbook, its workbook and the merged root `AGENTS.md`; **no article creation and no production deploy solely for setup** unless the repo's existing auto-deploy is triggered by a normal push.
- Content runs: inspect existing Git remote/branch, CI, Cloudflare integration and required checks; never create a new Cloudflare project, change DNS/production branch or force-push without instruction.
- Make a reviewable commit with only relevant files. Never commit secrets or local config containing credentials.
- Do not report a production launch without inspecting the real production URL. If credentials are missing, report exact blocker and stage achieved.
- Persist `Evergreen Queue` and `Run Log` in Git-tracked workbook and only mark `Done` when applicable checks pass. The next trigger should never duplicate a finished route/section.
- A `Blocked` item remains visible until resolved; do not silently skip it or invent a resolution.

## 11. Discovery mode (no end date)

When no publishable `Ready` or `Planned` items remain:

1. Use Search Console if genuinely connected; otherwise SERP questions and official documentation, with source origin recorded.
2. Re-audit published Home PayLater pages and 1 Phút Đăng Ký category/canonical map.
3. Generate 3–5 candidate topics across acquisition, eligibility, costs, usage, repayments, troubleshooting, trust and partner intent.
4. Score search demand, intent separation, user utility, source readiness, conversion relevance and cannibalization risk.
5. Prefer update/section for overlap. Only add new URL if the article gate passes.
6. Append candidates with unique asset IDs to `Evergreen Queue`, mark only one best qualified candidate `Ready`, and execute it.
7. Preserve revision history and avoid repeat topics previously marked Done or Blocked.

## 12. Report after each content run

Report: selected Asset ID; URL/category status; page vs section decision; sources verified, unresolved claims; Zalo CTA and disclosure; SEO/UX/mobile checks; files changed; lint/typecheck/test/build results; branch/commit/push; Cloudflare deployment and actual production verification; workbook queue/log changes; next eligible item; blockers requiring owner input.

**Current owner-confirmed configuration:** website `1phutdangky.com`; category `/vi-dien-tu/`; canonical `https://1phutdangky.com/vi-dien-tu/mo-tai-khoan-tra-sau-home-paylater-online/`; Zalo https://zalo.me/0896451911; recipient `Võ Thành Phát`, **nhân viên Home Credit**. Do not infer special approval powers, promotion terms, or that the Zalo endpoint is Home Credit's official app/payment/verification channel.
