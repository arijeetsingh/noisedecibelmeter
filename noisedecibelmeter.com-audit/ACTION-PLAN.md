# Action Plan — noisedecibelmeter.com

Ordered by impact ÷ effort. Each item carries the observation it rests on, how you would
know it failed, and a leading indicator you can watch without re-running this audit.

---

## Phase 1 — Critical Fixes (Week 1)

### 1.1 Ship `og-image.png` · 15 min · High impact
`og:image` and `twitter:image` on all 45 pages point at a file that 404s.
- Create a 1200×630 PNG, place at `public/og-image.png`, redeploy.
- Consider per-locale variants later; one shared image is fine now.
- **Fails if:** the file 404s post-deploy, or Cloudflare caches the 404. Verify with
  `curl -I https://noisedecibelmeter.com/og-image.png` and re-scrape in the
  Facebook Sharing Debugger / X Card Validator.
- **Watch:** referral traffic from social/chat sources in GA4.

### 1.2 Fix the two favicon 404s · 2 min · Medium-High impact
```bash
git mv "public/favicon copy.svg" public/favicon.svg
git mv "public/favicon copy.ico" public/favicon.ico
```
The `" copy"` in the filename is the entire bug — `Layout.astro` already references the
correct paths.
- **Fails if:** `curl -I .../favicon.svg` still 404s.
- **Watch:** the tab icon appears in a fresh incognito window.

### 1.3 Move the FAQPage JSON-LD inside `<Layout>` · 5 min · Medium impact
`src/components/IndexPage.astro:98` — the `<script type="application/ld+json">` block sits
before the `<Layout>` component, so it is emitted between `<!DOCTYPE html>` and `<html>`.
Move it inside the `<Layout>` element (or pass it through a head slot).
- **Fails if:** `curl -s https://noisedecibelmeter.com/ | head -c 200` does not show
  `<html lang="en">` immediately after the doctype.
- **Watch:** Rich Results Test still detects FAQPage after the move.

### 1.4 Decide the AI-crawler posture · 30 min · High impact
This is a Cloudflare dashboard setting, **not** a repo change — `public/robots.txt` is clean
and is being overridden at the edge by managed robots.txt / AI Crawl Control.

Currently blocked: `GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`, `Applebot-Extended`,
`Bytespider`, `meta-externalagent`, plus `Content-Signal: ai-train=no`.

For an ad-monetised free tool, AI assistants are a discovery channel, not a threat — there
is no proprietary content to protect, and "recommend me an online decibel meter" is a
high-intent query the site is currently invisible for. Recommended: allow the *retrieval*
agents (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`, `Google-Extended`) and
keep `Bytespider` / `CCBot` blocked if bulk scraping is the concern.

- **This is a judgement call, not a defect** — if you blocked these deliberately to keep
  content out of training corpora, that is a legitimate trade and you can skip this item.
- **Fails if:** `curl https://noisedecibelmeter.com/robots.txt | grep -A1 GPTBot` still
  shows `Disallow: /` after the dashboard change.
- **Watch:** AI-assistant referrers in GA4; ask ChatGPT/Perplexity "best free online
  decibel meter" monthly and record whether the site is cited.

---

## Phase 2 — High-Impact Improvements (Weeks 2–3)

### 2.1 Trim over-length titles and descriptions · 1 hr
Titles over ~60 chars: `ru` 80, `es` 79, `en` 77, `pt` 73, `it` 71, `fr` 66.
Descriptions over ~160: `es` 202, `it` 198, `pt` 197, `fr` 195.
Edit the `title` / `description` values in `src/i18n/*.ts`.
Also rewrite the near-empty `/about/` (27 chars) and `/contact/` (29 chars) titles.
- **Fails if:** Google keeps rewriting your titles in the SERP — check the
  "Search appearance" of top queries in GSC.
- **Watch:** CTR on the homepage query set in Search Console.

### 2.2 301 `www` → apex · 10 min
Add a Cloudflare bulk redirect. The cross-host canonical currently mitigates this, so it is
a hygiene fix rather than an emergency.
- **Fails if:** `curl -sI https://www.noisedecibelmeter.com/` does not return 301.

### 2.3 Fix schema typing · 1 hr
- Stop emitting `WebApplication` on `/about/`, `/contact/`, `/privacy-policy/`, `/terms/`.
  Gate it in `Layout.astro` or move it into `IndexPage.astro`.
- Add a site-wide `Organization` node (name, url, logo) and a `WebSite` node.
- Add `BreadcrumbList` to the four sub-pages.
- Keep `FAQPage`. It no longer earns a Google rich result (retired 7 May 2026) but it costs
  nothing and still describes the page to other consumers.
- **Fails if:** Rich Results Test reports errors, or `WebApplication` still appears on `/terms/`.

### 2.4 Reduce third-party main-thread cost · 2–4 hrs
Desktop TBT is 1165 ms against 0 ms on mobile — AdSense and GTM are the source. TBT is the
lab proxy for INP, and this page's whole value is a button tap.
- Delay AdSense init until first interaction or `requestIdleCallback`.
- Self-host the two Google Fonts files; drop `fonts.googleapis.com` and `fonts.gstatic.com`.
- Self-host the three badge SVG/PNGs instead of hot-linking toolfame/ProductHunt/sellwithboost,
  and give each `width`, `height`, and `loading="lazy"`.
- **Fails if:** desktop TBT stays above ~600 ms, or LCP regresses past 1200 ms.
- **Watch:** the INP row in CrUX once field data accumulates.

### 2.5 Add security headers · 20 min
In `public/_headers`, add `Strict-Transport-Security`, and
`Permissions-Policy: microphone=(self), camera=(), geolocation=()` — the microphone grant is
a meaningful trust signal for a mic-based tool.
- **Fails if:** headers absent from `curl -I` after deploy.

---

## Phase 3 — Content & Authority (Month 2)

### 3.1 Build the informational layer · the highest-ceiling item here
The site is 5 templates. Its own homepage H2s name the topics it has no pages for.
Removing the old blog was the right call — it was one 40-line post duplicated across nine
locales, which is exactly the thin content that earns nothing. The fix is not to restore it
but to build a small number of genuinely useful pages:
- A real decibel reference chart (searchable, with sources).
- "How loud is X?" pages for the handful of genuinely high-volume entities
  (lawnmower, concert, traffic, gunshot, snoring).
- An OSHA / WHO / NIOSH exposure-limit reference page.

Ship English first and validate demand in GSC before translating to nine locales.
- **Fails if:** after 90 days these pages have impressions but near-zero clicks — that means
  intent mismatch, not a content gap. Re-check the SERP page-type for those queries.
- **Watch:** count of distinct queries with impressions in GSC, month over month.

### 3.2 Establish authorship and cite sources · 2 hrs
The content quotes OSHA's 2-hour limit at 100 dB, WHO's <40 dB night-time guidance, and
ISO 61672 — and links to none of them. Add outbound citations and a named
author/maintainer with a stated basis for expertise. This is the cheapest E-E-A-T gain
available and it also raises citability for AI answers.
- **Fails if:** no measurable change — this one is slow and hard to attribute in isolation.
  Treat it as a precondition for 3.1 rather than a standalone win.

### 3.3 Structure FAQ answers for passage extraction · 1 hr
Wrap each `<summary>` question in an `<h3>`. 15 answers become 15 individually addressable
passages for AI extraction and for Google's passage ranking.
- **Fails if:** heading hierarchy breaks (H2 → H3 must stay contiguous).

### 3.4 Add `/llms.txt` · 15 min
Optional and ignored by Google Search. Cheap for a 5-page site. Only worth doing after 1.4 —
it is pointless while the AI agents are disallowed.

---

## Phase 4 — Monitoring (Ongoing)

- Verify apex + `www` in Search Console; submit the sitemap; watch Coverage for the
  retired `/blog/*` URLs dropping out.
- Track CrUX field INP monthly — this is the metric most at risk from AdSense.
- Re-run this audit after Phase 2 to confirm the score moves; expect ~66 → ~82 with
  Phases 1–2 alone.
- Monthly: query ChatGPT and Perplexity for "free online decibel meter" and log citation
  presence. That is the only practical measurement of whether 1.4 paid off.
