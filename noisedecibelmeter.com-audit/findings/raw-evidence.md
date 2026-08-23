# Raw Evidence

## Crawl
45/45 sitemap URLs returned HTTP 200. Response times 0.26–0.54s. See `crawl-data.json`
for per-page title length, description length, heading counts, image counts, schema types
and word counts.

## Asset probe
```
og-image.png        404
favicon.svg         404
favicon.ico         404
favicon-96x96.png   200  5282B  image/png
apple-touch-icon.png 200 10158B image/png
site.webmanifest    200   447B  application/manifest+json
ads.txt             200    58B  text/plain
llms.txt            404
```

## Redirects
```
http://noisedecibelmeter.com/       301 -> https://noisedecibelmeter.com/
https://www.noisedecibelmeter.com/  200  (no redirect; canonical -> apex)
/about (no slash)                   308 -> /about/
/blog/*                             301 -> /
/{lang}/blog/*                      301 -> /{lang}/
/this-does-not-exist-xyz            404
https://noisedecibelmeter.pages.dev/ 200 + X-Robots-Tag: noindex
```

## Response headers (apex)
Present: `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`
Absent: `strict-transport-security`, `content-security-policy`, `permissions-policy`, `x-frame-options`

## Core Web Vitals (Playwright, cold load)
```
              Desktop            Mobile (iPhone 390x844)
TTFB          275 ms             206 ms
FCP           640 ms             424 ms
LCP           640 ms  h1.hero-h1 424 ms  p.hero-body
CLS           0.0016             0
TBT           1165 ms            0 ms
requests      25 (19 third-party across 12 hosts)
```
Third-party hosts: static.cloudflareinsights.com, pagead2.googlesyndication.com,
fonts.googleapis.com, fonts.gstatic.com, www.googletagmanager.com,
googleads.g.doubleclick.net, ep1.adtrafficquality.google, ep2.adtrafficquality.google,
www.google.com, api.producthunt.com, toolfame.com, sellwithboost.com

## Hreflang validation
- 0/45 pages with incomplete hreflang (all carry en, es, fr, ja, zh-Hans, pt, ru, de, it, x-default)
- 0 canonical mismatches (all self-referencing)
- 0 missing return links in the homepage cluster

## Content parity (body text characters)
```
page            en    es    fr    it    pt    de    ru    ja    zh
homepage      6595  7217  7228  7098  6977  7137  6850  3239  2609
about         1829  2031  2087  2036  2059  2025  1922   938   719
contact        675   755   792   723   720   714   729   429   331
privacy       2002  2156  2384  2118  2190  2197  2099  1041   772
terms         2379  2430  2524  2470  2361  2528  2441  1075   849
```
ja/zh at 40–50% of Latin counts is the expected CJK compression ratio, and section
structure (7 H2s, 15 FAQ items) is identical across all locales. Not a parity defect.

## Document structure bug
```
byte offset of <!DOCTYPE  : 0
byte offset of FAQPage    : 92     <-- JSON-LD before <html>
byte offset of <html      : 5000
byte offset of <head      : 5016
```
Source: `src/components/IndexPage.astro:98`

## Live robots.txt
See `robots-live.txt`. Blocked AI agents: Amazonbot, Applebot-Extended, Bytespider, CCBot,
ClaudeBot, CloudflareBrowserRenderingCrawler, Google-Extended, GPTBot, meta-externalagent.
`Content-Signal: search=yes,ai-train=no,use=reference`.
The repo's `public/robots.txt` is 4 lines and clean — this is Cloudflare edge injection.

## Tooling note
The bundled claude-seo Python scripts could not run: this machine has only Python 3.9.6
(`/usr/bin/python3`) and the runtime requires 3.10+. All measurements above were taken with
curl, the project's own Playwright install, and direct HTML parsing instead.
