# LIOBANK EVERGREEN CONTENT ENGINE

- **Website** — https://1phutdangky.com
- **Canonical pillar** — https://1phutdangky.com/the-tin-dung/mo-the-tin-dung-liobank/
- **Trigger** — `Bắt đầu tạo bài mới Liobank`
- **Run scope** — One content item per trigger, with no end date.
- **Owner confirmation** — The existing pillar's primary CTA is the website's affiliate CTA.
- **Exact affiliate href** — Recorded in workbook `Plan Settings!B10` after setup verification against the current site and repository. Resolve from the active offer again on every run.

## 1. Editorial scope

One canonical Liobank credit-card acquisition pillar already exists. Keep its exact route under `/the-tin-dung/`. Build a long-term topic cluster around registration, eligibility, use of the multifunctional card, credit-limit approval, cost, billing, repayments, installment conversion, cash withdrawal cost, errors and trust.

Liobank is a brand of Ngân hàng TMCP Phương Đông (OCB). An opened Liobank account/payment/debit functionality does **not** mean a credit limit has been approved. Do not conflate the credit-card funnel with Liobank's separate personal cash-loan product. Do not create a parallel canonical for `mở`, `đăng ký`, `làm` or `tạo` thẻ if they share the same intent.

The spreadsheet's 60 topics are **planning hypotheses and execution slots**, not a user-supplied keyword report, 60 guaranteed distinct search intents, or a requirement to create 60 URLs.

## 2. Read these workbook sheets in order

1. `Next Action` — inspect first. Apply the shared maintenance gate in `AGENTS.md` before selecting work.
2. `Evergreen Queue` — persistent editable state and dependencies.
3. `Plan Settings` — canonical and affiliate-link provenance.
4. `Execution Briefs` — SEO/H1/answer blocks and content requirements.
5. `CTA Matrix` — placement and intensities by intent.
6. `Publish Source Matrix` — official evidence, caveats and check cadence.
7. `Seed-to-Question Map` / `Content Portfolio` — question and topic architecture.
8. `Run Log` — actual results.
9. `Discovery Rules` — when the initial queue is exhausted.
10. `Dashboard` — read-only progress summary.

Do not overwrite a completed item on later runs. Track workbook changes in the repository so state persists. Reconcile the cached selector against all actual rows in `Evergreen Queue` column M before selection. The selector and dashboard formulas currently cover rows 5–5000 while status validation covers rows 5–64. On append, extend validation for new rows and extend dependent formula ranges when capacity is exceeded. Preserve prior formulas, formatting, validations and the Run Log template.

## 3. First content run — audit/update the published pillar

At setup, asset `C-PILLAR` is **Ready**. The first triggered run audits/updates the existing owner, subject to the shared maintenance gate. It must:
1. Find the actual source file and route for `https://1phutdangky.com/the-tin-dung/mo-the-tin-dung-liobank/` in the project.
2. Confirm existing canonical, title/meta, H1, breadcrumb, sitemap and related links.
3. Locate the primary CTA component/href **actually used by the pillar**.
4. Extract the exact link, including all tracking parameters and redirects. Do not normalize URL strings or drop affiliate identifiers.
5. Confirm CTA button label, design component, `target`/`rel`, event tracking and affiliate disclosure; reuse these patterns.
6. Compare `Plan Settings!B10` to the active rendered href and record the source and date. If multiple possible links are present, trace which is rendered and actually used; if unresolved, ask a targeted question rather than inventing.
7. Verify substantive card content against live official Liobank/OCB sources; improve answer blocks, proper account-vs-credit wording, sources and conversion placement **without redesign or changing canonical**.
8. Apply standard quality checks and truthful deployment state.

Never confuse the page URL `https://1phutdangky.com/the-tin-dung/mo-the-tin-dung-liobank/` (internal canonical) with its outbound affiliate CTA URL (external link sourced from actual code).

## 4. Source registry and source hierarchy

- Official Liobank card page: https://liobank.vn/vn/credit-card
- **Current tariff index:** https://liobank.vn/vn/tariffs
- Liobank credit-card FAQ: https://liobank.vn/vn/faq/credit
- Liobank general FAQ: https://liobank.vn/vn/faq/overview
- Cash/withdrawal information: https://liobank.vn/vn/cash
- Installment: https://liobank.vn/vn/installment
- Installment FAQ: https://liobank.vn/vn/faq/installment
- Official friend's invite program: https://liobank.vn/vn/invite
- OCB entity page: https://www.ocb.com.vn/vi/tin-tuc-su-kien/tin-tuc/ocb-ra-mat-ngan-hang-so-the-he-moi-liobank

**Source gate:** retrieve the latest *effective* price/tariff document before publishing any fees, interest, credit-limit conditions, penalty, installments or cash-advance cost. Research on 2026-11-22 found a tariff indexed as effective **15/10/2026**. Recheck the index at each publishing run; newer terms supersede this research snapshot.

Liobank's product/FAQ pages have shown different rate descriptions (e.g. annual versus monthly, and purchases versus cash use). Do not silently select one number or mix product marketing claims and tariff figures. Prefer the applicable official effective tariff and contract terms; if unresolved, use a qualitative description and mark the claim blocked for verification.

No fixed rewards, credit approval rate, guaranteed limit, universal free card/0%-cost claim, exact delivery promise, or financial obligation without current official proof. Time-bound promotions require current official eligibility and validity.

## 5. Affiliate CTA: inheritance contract

**User-confirmed:** The primary registration button in `https://1phutdangky.com/the-tin-dung/mo-the-tin-dung-liobank/` is already an affiliate link.

- **Single source of truth for outbound CTA:** the existing **repository source/config actually rendering that button**. The web search cache or a similar article on any other domain is not an affiliate-link source.
- The published MDX article selects `credit-cards/liobank-credit-card` in `src/data/products/credit-cards/liobank-credit-card.json`. The enabled primary offer is `liobank-credit-card-direct-referral`. `ArticleLayout.astro` renders `ProductCard.astro → AffiliateCTA.astro` and `StickyCTA.astro`, both resolving the same offer via `src/utils/productOffers.ts`. The shared `appAction` label is defined in `src/data/app-cta-labels.json`.
- Compare the literal configured href with the rendered DOM attribute after HTML entity decoding. Preserve all original URL bytes and tracking parameters. Verify the affiliate disclosure near the product card and record link scope without implying confirmed conversion or a tested registration.
- Once verified, store the actual link in `Plan Settings` and keep a provenance entry in `Run Log`. New articles and relevant sections reuse the same verified CTA by importing/reusing the existing component/config, not scattering duplicate hardcoded literals.
- If site uses a centralized affiliate-link map, reuse it and document the key. If CTA is rendered indirectly, trace the actual config/variable to its computed href.
- If the exact href is inaccessible or ambiguous, **do not generate an alternative outbound CTA**. Leave the current working CTA untouched, mark link-dependent tasks Blocked, and report the missing source.
- Do not confuse Liobank's official **Mời bạn bè** scheme with this website's affiliate partnership. No personal referral code is assumed.
- Near money CTA, disclose that 1 Phút Đăng Ký may receive a commission when qualified registrations occur.
- Use the primary CTA near the opening procedure on money pages, contextual CTA after eligibility/cost guidance, and minimal or zero CTA on payment, debt, loss, security and troubleshooting pages. For a support article without a product, point `stickyCtaFrom` to the canonical owner when appropriate, or set `stickyCtaFrom: false` with a recorded reason for an intentional omission. For app links, use the shared label. Treat workbook event names as planning labels and reuse consent-aware `affiliate_click` for the app action.

Do not obtain OTP, PIN, card details, passwords, full identity photos, biometric evidence or banking credentials through 1 Phút Đăng Ký or affiliate landing pages; direct visitors to the Liobank/OCB channels.

## 6. New URL vs section gate

Before creating any support route, document:
1. Does this have a genuinely distinct intent/SERP?
2. Can it stand alone with enough practical value?
3. Can current official sources support its financial claims?
4. Does it avoid cannibalizing the existing pillar?
5. Does the user journey and internal-link graph justify a separate URL?

If not, deliver an H2/H3/FAQ/table to the canonical parent and log `Section` as the action. `Article if validated` is not automatic approval. For new URLs, follow existing site route/naming conventions and check that a proposed slug is available; never presume an exact user-approved support slug.

## 7. One-run procedure

On `Bắt đầu tạo bài mới Liobank`:

1. Read repo `AGENTS.md`, this playbook and workbook. Inspect `Next Action` first, then run `npm run content:review` and review `docs/content/source-review.json`, the published Liobank material and shared product data. Follow the shared maintenance gate before selecting work. A verified substantive correction counts as this run. Record source scope and timestamps without advancing broader verification dates after a partial review.
2. Select first `Ready`, else first qualified `Planned`. If none, use Discovery Mode. Respect dependencies and existing content.
3. Set `In progress` before modifying content. Do not process a second item.
4. Check site-specific CTA source, official fee/version/product sources and selected topic's search intent.
5. Choose: `Update existing`, `New article` (only if gate passes), `Section/FAQ` inside owner, or `Blocked`.
6. Build readable user-focused content (direct answer → conditions → details → official source → next action). Reuse design, author/review, sources, metadata, schema and analytics patterns already in repository.
7. Connect internal links to pillar and relevant supporting pages. Add site affiliate CTA by copying the exact verified source only where appropriate, with clear disclosure.
8. Run `npm run check` (Astro build, Pagefind and build validation). Use `npm run test:validator` and `npm run test:maintenance` when relevant. No standalone lint/typecheck command is configured. Check responsive layout, sticky CTA while scrolling on mobile and desktop, canonical, sitemap, metadata, structured data, internal links and runtime.
9. Review diff; commit only relevant code/state files; no `.env`, secrets, credentials or temporary files. Never force push.
10. Push using existing GitHub workflow when authorized. Deploy through current Cloudflare setup (GitHub trigger or project script), no new project/DNS/branch/env changes; verify actual production URL/CTA/canonical when accessible.
11. Update `Evergreen Queue`, refresh `Next Action` and record the actual result in `Run Log` using its existing columns: date and time with `+07:00`, asset, action, sources and versions, URL, files, quality checks, content commit SHA, push and Cloudflare outcome. Set `Done` only after production verification. Record unfinished state and the exact blocker when applicable. Persist the post-deploy state in a subsequent commit if authorized, without self-referencing its SHA.
12. Stop after one asset, with next item indicated.

When production deploy is not possible due to access, don't claim completion. Report exact blocker and next required action.

## 8. Discovery Mode (no expiration)

When no actionable queued items remain, use available Search Console data (if connected), current SERPs, official Liobank product/FAQ updates and the site's own pages. Propose 3–5 non-duplicate candidates and score on source readiness, user utility, SERP intent separation, traffic evidence, affiliate relevance and cannibalization risk. Add evidence-backed qualified candidates to `Evergreen Queue`, select one and execute. Prefer meaningful page updates when all candidate questions overlap existing owners. No invented keyword volume or autopublishing thin content.

## 9. UI / GitHub / Cloudflare safety

Preserve original global UI and article pattern; do not redesign typography/colors/spacing/nav/header/footer/card/buttons. Reuse existing link/CTA event tracking. No unrelated auth/payment/API changes. Deploy only through workflows that already exist in the repo with permission; never claim push/deploy/testing was successful if it was not executed and checked.

## 10. Setup-only operation

If asked to **install the engine**, merge `AGENTS_LIOBANK_SNIPPET.md` into existing `AGENTS.md` without overwriting MB Bank/Home Credit/TPBank/Home PayLater/Green SM engine instructions. Save this playbook and workbook under `docs/content/`, verify paths and workbook integrity, review/setup commit/push if authorized. Log CTA provenance as `SETUP-CTA` in `Run Log` without consuming a content item or changing the queue. No manual production deployment is required for documentation-only setup. **Do not edit Liobank production content during setup.**

## 11. Report after each run

Return concise summary of selected asset, content decision (new/update/section/blocked), files and route, official source versions, CTA provenance/placement, SEO/internal links, lint/test/build, Git branch/SHA/push, Cloudflare deploy, actual production checks, workbook queue/log update and next action.
