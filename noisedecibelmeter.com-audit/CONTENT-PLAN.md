# Phase 3 — Content Plan · noisedecibelmeter.com

**Date:** 2026-08-23 · **Goal:** move Content Quality (23% of the score) off 62.
**Evidence base:** live SERP analysis for the four target topic areas, plus a structural
teardown of the strongest competitor page.

> **Data caveat:** no Search Console or keyword-volume API is connected, so nothing here
> carries a search volume number. Priority is ranked on SERP evidence and competitive
> structure, not on estimated volume. Validate in GSC before translating anything.

---

## What the SERPs actually show

**1. You already rank for the head term.** A live search for "best free online decibel
meter browser, no download" returns noisedecibelmeter.com in second position, behind
DecibelPro. The summary described your dBA/dBC toggle accurately — which also confirms AI
crawlers are reading the site now that the block is off.

**2. The winning content format here is interactive, not editorial.** The two competitors
that rank for the informational queries do it with tools, not blog posts:
- `decibelpro.io/decibel-chart` — filterable chart, ~40 entries, OSHA exposure table,
  colour-coded safety zones, hub links out to per-sound and per-level pages.
- `sounddbmeter.com` — ranks with "NIOSH & OSHA Noise Exposure Limits: Full Chart + **Calculator**".

This matters: the site already ships a Web Audio tool. Interactive reference pages are the
natural extension of what it is, not a pivot into blogging.

**3. The "how loud is X" SERPs are winnable.** They are currently held by lawn-equipment
retailers and affiliate blogs — mowrator, sunseekerelite, eufy, lawncarehive, ursrobot.
None of them is a measurement authority, and the numbers they publish disagree with each
other (lawn mower quoted anywhere from 85 to 105 dB). A sourced page from a measurement
tool has a real claim to that space.

**4. The E-E-A-T gap is the opening.** DecibelPro cites OSHA 29 CFR 1910.95 but names no
author. Nobody in this space has a named, credentialed maintainer. That is cheap to fix
and it is exactly what [[eeat]] rewards.

---

## Architecture — hub and spoke

```
                      /  (the tool — existing)
                      │
        ┌─────────────┼─────────────────┐
        │             │                 │
 /decibel-chart/  /noise-exposure-   /how-loud-is/
   (PILLAR)        limits/            (spoke index)
                  (calculator)            │
                                    ┌─────┴─────┬──────────┐
                              /lawn-mower/  /concert/  /traffic/ …
```

Every page links up to its hub, down to its spokes, and sideways to the tool with a
"measure it yourself" call to action. That last link is the conversion path and the reason
the content earns its place on a tool site.

---

## Build order

### 1. `/decibel-chart/` — the pillar · highest priority

The homepage already has an H2 called "Decibel Meter Chart — Common Sound Levels" with no
page behind it. That is the single clearest gap on the site.

**Format:** interactive, filterable table — not prose. ~50 sound sources, each with:
source, dB range, category, safe exposure time, and a citation.

**Beat DecibelPro by:**
- Citing **NIOSH and WHO alongside OSHA**, not OSHA alone. NIOSH uses an 85 dBA REL and a
  3 dB exchange rate; OSHA uses a 90 dBA PEL and a 5 dB exchange rate. Competitors
  routinely conflate the two. Showing both, side by side, correctly, is a genuine
  authority signal.
- Giving each entry a **source link**, not a bare number. The disagreement between
  competitor figures is the opportunity.
- A **"measure this yourself"** button per row that deep-links to the tool.

**Schema:** `Article` + `Dataset` for the table. Not `HowTo` — deprecated Sept 2023.

**Fails if:** it ranks but nobody clicks through to the tool. Track chart→tool click rate.

### 2. `/noise-exposure-limits/` — the calculator · high priority

Direct competitive parity item. `sounddbmeter.com` ranks on "chart + calculator" and
DecibelPro ships OSHA TWA tracking as a tool feature. You have neither.

**Build:** an input for dB level and exposure duration, returning OSHA PEL and NIOSH REL
verdicts side by side with the permitted time under each standard. The two answers
differ — that contrast *is* the content.

**Reference table:** dBA → max hours, both standards, 80–115 dBA.

**Schema:** `Article` + `SoftwareApplication` for the calculator widget.

**Fails if:** the calculator's numbers can be shown wrong. Have the exchange-rate maths
checked against 29 CFR 1910.95 Table G-16 before publishing — being wrong here is worse
than not publishing.

### 3. `/how-loud-is/` spokes · start with 8, hand-written

**Ship these first**, chosen for SERP weakness and search intent clarity:

| Page | Why |
|---|---|
| `/how-loud-is/lawn-mower/` | Highest competitor disagreement (85–105 dB), all affiliate sites |
| `/how-loud-is/concert/` | High intent, hearing-damage angle, strong safety hook |
| `/how-loud-is/vacuum-cleaner/` | Common household benchmark, weak SERP |
| `/how-loud-is/traffic/` | Ties to WHO night-time guidance, ordinance angle |
| `/how-loud-is/snoring/` | Genuine consumer question, almost no authoritative coverage |
| `/how-loud-is/gunshot/` | Impulse noise — technically distinct, high authority payoff |
| `/how-loud-is/airplane/` | Cabin vs. flyover distinction competitors miss |
| `/how-loud-is/washing-machine/` | Appliance-shopping intent, measurable |

**Each page:** the number with a range and a source, what it means for hearing, how long
is safe under OSHA and NIOSH, how to reduce it, and a measure-it-yourself CTA.
Minimum 600 words of genuinely distinct content.

> **Quality gate:** this pattern is a programmatic-SEO trap. Hand-write the first eight.
> Do **not** template out 30+ until at least three have earned impressions in GSC. At 30+
> near-identical pages you are in thin-content territory and the whole cluster is at risk.

### 4. E-E-A-T layer · cheapest real win

- **Name a maintainer** with a stated basis for expertise, on `/about/` and bylined on
  every reference page. Add `author` to the `Article` schema and `Person` to the graph.
- **Add outbound citations.** The homepage already quotes OSHA's 2-hour limit at 100 dB,
  WHO's <40 dB night-time guidance, and ISO 61672 — and links to none of them. Link all
  three. This is a 30-minute change to existing copy.
- **Publish a methodology note**: how the tool computes RMS → dB, why it is ±2–3 dB, and
  why it is not a substitute for a Type 1/Type 2 meter. Honest limits build more trust
  than accuracy claims.

### 5. Localisation — hold

Nine locales × the pages above is a large translation bill against unvalidated demand.
**Ship English first.** Translate a page only once it has GSC impressions. The existing
hreflang implementation is correct and will pick up new pages automatically, so there is
no technical debt in waiting.

---

## Sequencing and dependencies

| Order | Item | Blocks / unblocks |
|---|---|---|
| 1 | E-E-A-T layer (author, citations) | Unblocks everything — new pages should launch bylined, not be retrofitted |
| 2 | `/decibel-chart/` pillar | Unblocks the spokes; they link up to it |
| 3 | `/noise-exposure-limits/` calculator | Independent; competitive parity |
| 4 | First 3 spokes | Validate the pattern |
| 5 | Remaining 5 spokes | Only after 3 show impressions |
| 6 | Translation | Only after English validates |

Ship 1–2 before anything else. A pillar page published without a byline has to be
revisited later, and retrofitting authorship reads worse than launching with it.

---

## How to know it worked

- **Leading indicator, 30 days:** count of distinct queries with impressions in GSC.
  This moves before rankings do.
- **60 days:** `/decibel-chart/` earning impressions on chart and "how loud" queries.
- **90 days:** chart → tool click-through rate. If the content ranks but never sends
  anyone to the tool, the internal linking is wrong, not the content.
- **Failure mode to watch:** impressions climb but clicks stay flat. That is intent
  mismatch — the SERP wants a different page type — not a content-depth problem.
  Re-check what actually ranks for those queries before writing more.
- **AI visibility:** now that the crawler block is lifted, ask ChatGPT and Perplexity
  monthly for "best free online decibel meter" and "how many decibels is a lawn mower".
  Log whether the site is cited. Baseline: already cited for the head term.

**Expected score movement:** Content Quality 62 → ~85 and On-Page 86 → ~92 once the
pillar, calculator and first spokes are live, taking the overall score from **82 to
roughly 90**. Nothing else on the remaining list moves the number this much.
