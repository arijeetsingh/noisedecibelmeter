# SEO Audit — noisedecibelmeter.com

**Date:** 2026-08-23 · **Scope:** live site, all 45 sitemap URLs crawled (100% HTTP 200)
**Business type:** Utility / free web tool (single-purpose, ad-monetised, 9 locales)
**SEO Health Score: 66 / 100**

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 78 |
| Content Quality | 23% | 62 |
| On-Page SEO | 20% | 70 |
| Schema / Structured Data | 10% | 58 |
| Performance (CWV) | 10% | 85 |
| AI Search Readiness | 10% | **35** |
| Images | 5% | 55 |

---

## Executive Summary

The technical foundation is genuinely strong — and stronger than most sites of this type.
Hreflang is implemented correctly across all 45 URLs with full reciprocity and `x-default`,
every page self-canonicalises, trailing slashes 308-normalise, HTTP 301s to HTTPS, the
`pages.dev` staging host is `noindex`, and the removed blog's URLs 301 to the right locale
home. Core Web Vitals are good (LCP 424–640 ms, CLS ~0).

The score is held down by three things, in order of cost:

1. **AI crawlers are blocked at the CDN.** Cloudflare's managed robots.txt is serving
   `Disallow: /` to GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended,
   Bytespider and meta-externalagent. For a free browser tool, "which online decibel meter
   should I use" is exactly the query an assistant answers — and the site has opted out of
   being the answer.
2. **`og-image.png` 404s on all 45 pages.** Every share, every social preview, every
   AI/LLM link unfurl renders blank.
3. **The site is 5 templates.** No informational content exists to catch the long tail the
   homepage's own H2s gesture at ("Decibel Meter Chart", "Outdoor & Professional Use Cases").

## Top 5 Critical / High Issues

1. **AI crawler blanket block** (High) — `robots.txt` disallows 7 AI user-agents.
2. **`og-image.png` returns 404** (High) — referenced by `og:image` + `twitter:image` on every page.
3. **`favicon.svg` and `favicon.ico` return 404** (Medium-High) — files exist in `public/`
   as `favicon copy.svg` / `favicon copy.ico`; the literal `" copy"` in the filename breaks both.
4. **JSON-LD emitted before `<html>`** (Medium) — `IndexPage.astro:98` places the FAQPage
   `<script>` outside `<Layout>`, so ~5 KB precedes the document element and pushes
   `<meta charset>` past the 1024-byte window.
5. **`www` serves HTTP 200 instead of redirecting** (Medium) — mitigated by a correct
   cross-host canonical, but it splits crawl budget and link equity.

## Top 5 Quick Wins

1. Create and deploy `og-image.png` (1200×630) — 15 min, fixes 45 pages.
2. Rename `public/favicon copy.svg` → `favicon.svg`, `favicon copy.ico` → `favicon.ico`.
3. Move the FAQPage `<script>` inside `<Layout>` in `IndexPage.astro`.
4. Unblock `GPTBot`, `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`, `Google-Extended`
   in the Cloudflare dashboard (AI Crawl Control → managed robots.txt).
5. Trim the 6 over-length titles (66–80 chars) to ≤60.

---

## Technical SEO — 78

### What works
- All 45 URLs return 200; zero redirect chains, zero orphans vs. sitemap.
- Self-referencing canonical on every page, verified programmatically.
- `http://` → 301 → `https://`; `/about` → 308 → `/about/`.
- `pages.dev` preview host serves `X-Robots-Tag: noindex` via `public/_headers`.
- Blog retirement handled properly: `/blog/*` and `/{lang}/blog/*` → 301 to locale home.
- Sitemap is valid, 45 URLs, `lastmod` present, referenced from robots.txt.

### Findings
| Severity | Finding |
|---|---|
| Medium | `<script type="application/ld+json">` sits between `<!DOCTYPE html>` and `<html>` (offset 5–5000). Parsers relocate it, but `<meta charset>` lands at byte ~5030, outside the 1024-byte scan window. Saved only by the `charset=utf-8` HTTP header. |
| Medium | `https://www.noisedecibelmeter.com/` returns 200, not a 301 to apex. |
| Medium | No `Strict-Transport-Security` header. |
| Low | No `Content-Security-Policy` or `Permissions-Policy`. `Permissions-Policy: microphone=(self)` is a natural fit for a mic-based tool. |
| Low | Sitemap carries no `<xhtml:link>` hreflang annotations (the on-page tags are correct, so this is redundancy, not a defect). |

## Content Quality — 62

### What works
- Homepage is substantive: ~1,060 words, 7 H2 sections, 15 FAQ entries.
- Answers are specific and numeric (OSHA 2-hour limit at 100 dB, WHO <40 dB night-time,
  ±2–3 dB accuracy caveat) — genuinely citable passages.
- The tool honestly states its limits vs. certified ISO 61672 hardware. Good trust signal.
- Locale content parity holds: ja/zh run 40–50% of the Latin character count, which is the
  normal CJK compression ratio, and section structure (7 H2s, 15 FAQs) is identical.

### Findings
| Severity | Finding |
|---|---|
| High | Only 5 unique templates exist. No page targets "decibel chart", "how loud is X", OSHA/WHO threshold queries, or any informational long-tail. |
| Medium | No author, organisation, credentials, or "reviewed by" anywhere. The page cites OSHA, WHO and ISO 61672 but links to none of them — asserting authority without sourcing it. |
| Medium | `/contact/` is ~112 words, `/about/` ~280. Both thin. |
| Low | H1 renders as `Online decibel meter.Real-time sound levels.` in extracted text — a `<br/>` with no surrounding space. Visually fine, but that is the string crawlers and LLMs read. |

## On-Page SEO — 70

### What works
- Exactly one H1 per page across all 45 pages. No heading-count anomalies.
- Descriptive, unique titles and descriptions per locale — no cross-locale duplication.
- Complete OG + Twitter card tag sets.

### Findings
| Severity | Finding |
|---|---|
| Medium | 6 titles exceed the ~60-char SERP limit: ru 80, es 79, en 77, pt 73, it 71, fr 66. |
| Medium | 4 descriptions exceed ~160 chars: es 202, it 198, pt 197, fr 195. |
| Medium | `/about/` (27 chars) and `/contact/` (29 chars) titles are near-empty of intent. |
| Low | ja (75) and zh (52) descriptions are short even allowing for CJK density. |
| Low | `<meta name="keywords">` present on every page. Ignored by all engines; harmless but dead weight. |
| Low | Internal linking is nav/footer only — 14 links, zero contextual. |

## Schema / Structured Data — 58

### What works
- Valid JSON-LD, parses cleanly. `WebApplication` correctly declares `offers.price: 0`, `applicationCategory`, and a real `featureList`.
- `FAQPage` covers all 15 on-page questions with matching visible content.

### Findings
| Severity | Finding |
|---|---|
| Medium | `WebApplication` is emitted on `/privacy-policy/`, `/terms/`, `/contact/` and `/about/`. Those pages are not the application. |
| Medium | No `Organization` node and no `WebSite` node — nothing establishes the publisher entity. |
| Low | No `BreadcrumbList` on sub-pages. |
| Info | `FAQPage` no longer produces a Google rich result (retired for all sites 7 May 2026). Keep it — it costs nothing and still describes the page to non-Google consumers — but do not expect SERP real estate from it. |

## Performance (CWV) — 85

| Metric | Desktop | Mobile | Threshold |
|---|---|---|---|
| TTFB | 275 ms | 206 ms | <800 ms ✅ |
| FCP | 640 ms | 424 ms | <1800 ms ✅ |
| LCP | 640 ms (`h1.hero-h1`) | 424 ms (`p.hero-body`) | <2500 ms ✅ |
| CLS | 0.0016 | 0 | <0.1 ✅ |
| TBT | **1165 ms** | 0 ms | proxy for INP ⚠️ |

### Findings
| Severity | Finding |
|---|---|
| Medium | Desktop TBT of 1165 ms is main-thread time from AdSense + GTM. TBT is the lab proxy for INP — on a page whose core interaction is "tap Start Measuring", this is the metric most likely to fail in field data. |
| Medium | 19 of 25 requests are third-party, across 12 hosts (AdSense, DoubleClick, adtrafficquality ×2, GTM, Google Fonts ×2, Cloudflare Insights, ProductHunt, toolfame, sellwithboost). |
| Low | Google Fonts loaded from `fonts.googleapis.com` — self-hosting would remove two cross-origin connections from the critical path. |

## AI Search Readiness — 35

This is the weakest category and the one with the clearest upside.

### Findings
| Severity | Finding |
|---|---|
| High | Cloudflare managed robots.txt serves `Disallow: /` to `GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`, `Applebot-Extended`, `Bytespider`, `meta-externalagent`, plus `Content-Signal: ai-train=no`. `PerplexityBot` and `OAI-SearchBot` are not named, so they fall through to `Allow: /`. Note the fix is in the Cloudflare dashboard — `public/robots.txt` in the repo is clean (4 lines) and is being overridden at the edge. |
| High | `og:image` 404s, so every LLM and social unfurl of the URL renders without a preview. |
| Medium | No `Organization` schema, no consistent entity name/URL/logo triple for AI systems to attach a brand to. |
| Medium | 15 FAQ answers sit inside `<summary>` elements, not headings. They are in the DOM and indexable, but there is no `h3` anchor structure for passage-level extraction. |
| Low | No `/llms.txt`. Optional and ignored by Google, but cheap for a 5-page site. |

## Images — 55

### Findings
| Severity | Finding |
|---|---|
| High | `og-image.png` — referenced by `og:image` and `twitter:image` on all 45 pages, declared 1200×630 — returns 404. |
| Medium | `favicon.svg` and `favicon.ico` 404. Source files are `public/favicon copy.svg` and `public/favicon copy.ico`. |
| Medium | All 3 homepage images are hot-linked from third-party domains (toolfame.com, api.producthunt.com, sellwithboost.com) — external render dependency and a privacy leak. |
| Low | Badge images lack `width`/`height` and `loading="lazy"`. Measured CLS is ~0 today, but nothing prevents regression. |
| Info | Alt text is present and descriptive on all 3 images. |
