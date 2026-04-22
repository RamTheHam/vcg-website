# VCG Website Audit — 2026-04-20

**File audited:** `vcg-corporate/brand-assets/website/index.html`
**Standards:** `vcg-brand-voice-guidelines.md` v2.0, Alexander's Misfits, processing-fluency, craft.

---

## Executive take

The site is 85% on-brand — editorial register, restrained palette, warm ink on paper, proper sources on statistics, good tonal separation between exec and PE sections. But **three structural problems** undercut it:

1. **The tagline "The executive claims the deal" is used everywhere — brand guidelines explicitly say VCG has no tagline.**
2. **The core one-liner "We advance senior executives into PE-backed ownership" never appears on the page.**
3. **Numeric style violates the guide throughout** (twenty years, forty-five minutes, twenty-minute — should be 20, 45, 20).

These are not small. The site right now tells a reader the brand's handle is a poetic slogan, not its positioning. Fix these and the site jumps to ~98%.

---

## 1 · Alexander's Misfits — forces vs. form

| Force (what the site must do) | Current form | Misfit | Severity | Resolution |
|---|---|---|---|---|
| A PE partner decodes VCG in 30 seconds | H1 "The executive claims the deal." + sub-head | H1 is evocative, not load-bearing. Partner reads a slogan before a position. | **High** | Replace H1 with the one-liner or a position-first line. Demote "claims the deal" to eyebrow or drop it. |
| The brand doesn't carry a tag (per guidelines) | Tag appears in meta, OG, footer, favicon, signature template | Every public surface contradicts the voice guide | **High** | Strip the tag from meta, OG, footer, signature. Wordmark stands alone. |
| The category is named so it sticks | Category ("executive-first deal origination with co-investment") never stated in a single sentence | Reader must piece it together from the essay | **Medium** | Add a category-definer line near the hero or in About. |
| Numeric precision (PE-grade rigour) | "twenty years," "forty-five minute," "twenty-minute," "five to ten years" | Violates numeric rule (10+ → figures). Reads magazine, not PE. | **Medium** | 20 years, 45-minute, 20-minute, 5–10 years. |
| Written strategy document as a trust signal | Mentioned once, buried in audience__body | Under-weighted for a unique exec-side hook | **Low** | Surface in hero or exec section pitch. |

---

## 2 · Brand voice audit

### Violations (must fix)

**Tagline — appears 5+ times, guide says none exists:**
- `<meta name="description">` line 7 — "The executive claims the deal" baked into OG title.
- `<meta property="og:description">` line 10 — same.
- Hero `<h1>` line 641 — the biggest type on the site is the forbidden tag.
- Footer `.vcg-mark__tag` line 850.
- Email signature template at `templates/email-signature.html:84` carries it too.

**Guide says:** *"No tagline. The wordmark stands alone… If a line is needed in supporting copy, use the one-liner, not a shortened slogan."*

**One-liner missing entirely:** *"We advance senior executives into PE-backed ownership."* Should anchor the hero or sit directly under the wordmark on the about slab.

**Numeric rule violations** (guide §5.3: spell one–nine, figures for 10+):
- Line 692: "Twenty years of operating experience" → **20 years**
- Line 747: "Twenty years of operating judgment" → **20 years**
- Line 817: "Founded after twenty years in PE" → **20 years**
- Line 832: "a forty-five minute conversation" → **a 45-minute conversation**
- Line 832: "the next five to ten years" → **the next 5 to 10 years**
- Line 833: "a twenty-minute call" → **a 20-minute call**

### Strong — keep as-is
- Hero sub (line 642) — directness, no filler.
- Three figures with named sources — exactly as §4.4 prescribes.
- Essay lede — "the standard playbook is driven by the PE firm and the auction process" — disarming admission pattern done right.
- Exec section subheads "What we bring / What you bring / What you keep" — structure as argument.
- "The economics" / "What it costs you upfront" terms blocks — clean, no fee percentages leaked.
- Role flexibility ("CEO, as active chairman, as operating partner, or in whichever role the deal requires") — present and consistent.
- British English throughout ("colour," "centre," "realise," "behaviour" all clean).
- Contact section — "Start with a conversation" with the forty-five-minute concrete offer is on-brand (once the number is fixed).

### Minor tuning
- Line 642 "the right PE firms" → **"the PE firms whose mandate fits"** (matches essay vocabulary, less generic).
- Line 734 "Your expertise deserves capital and access. Not a database listing." — beautiful, but "database listing" is the only place you reach for competitor-attack framing. Acceptable; leave.
- Line 780 "PE firms running management-heavy platforms" — echoed twice (line 799). Second echo is redundant. Cut or vary.
- Line 817 "senior executives generate most of the returns" → the stat is 53%; "most" is technically correct but soft. Consider **"generate the majority of the returns"** or cite the 53% directly in the prose.

### Blacklist scan — clean
No "best-in-class," "leverage" as verb, "synergy," "unlock," "delve," "seamless," "transformative," corporate filler ("we are pleased"), or fee percentages. Zero buzzwords. That part is tight.

---

## 3 · Design audit

### Works
- **Palette discipline:** paper / paper-soft / ink rhythm across sections. Forest accent under the four-instance-per-viewport cap.
- **Typography:** Fraunces variable axis driven properly (opsz 144 for display, opsz 36 for tagged meta). JetBrains Mono only on eyebrows/labels. No third typeface.
- **Editorial cues:** rule dashes, numbered list leading-zeros, italic accent for emphasis (no bold), drop-cap-ready CSS.
- **Motion:** reveal fade-up at 700ms with `cubic-bezier(0.16, 1, 0.3, 1)` — slow, not snappy, matches guide §8.
- **Accessibility:** `aria-label` on nav, `aria-labelledby` on every section, focus-visible outlines at 2px accent, `prefers-reduced-motion` honoured, skip-target anchor.

### Issues

| # | Issue | Location | Fix |
|---|---|---|---|
| D1 | Drop-cap class `.drop` defined (line 305–314) but never applied to any element — dead CSS, and the "Why executives come first" lede is where it belongs | CSS:305, essay markup 689–694 | Add `class="drop"` to line 691's first body paragraph, or delete the CSS |
| D2 | Footer copy `rgba(245,241,234,0.36)` on ink — WCAG AA likely failing (~3.9:1 est.) | `.footer__copy` 556, `.contact__meta` 521 | Bump to 0.55 opacity or lighten the paper variant |
| D3 | No OG image — LinkedIn previews will be a bare text card | `<head>` | Add `og:image` + apple-touch-icon. Use a 1200×630 with the wordmark on paper |
| D4 | Favicon = "C" (Catalyst) while guide describes a "V" tile mark; logo.svg uses space-separated wordmark while guide §1 describes forest-green dot separators — two mark systems in play | `favicon.svg`, `logo.svg`, guide §1 | Pick one canonical mark. If the current wordmark is it, update the voice guide; if the guide is canonical, regenerate the assets |
| D5 | Nav blur effect uses `backdrop-filter` without a solid-bg fallback for Firefox with backdrop-filter disabled — small chance of unreadable nav on scroll | CSS 80–83 | Add `@supports not (backdrop-filter: blur(10px)) { .nav { background: #F5F1EA; } }` |
| D6 | Signature template copies the forbidden tagline verbatim — signatures get forwarded, so this broadcasts the misaligned brand further than the site alone | `templates/email-signature.html:84` | Remove `The executive claims the deal` line; keep wordmark + name + email + city |
| D7 | No canonical URL, no sitemap/robots — not critical but a small credibility tell once a partner inspects | `<head>` | Add `<link rel="canonical">`. |
| D8 | Hero padding `184px 0 120px` on desktop is generous and correct; but at 761–900px width the hero loses its breathing room without dedicated rules — sub breaks hard | `@media (max-width:760px)` boundary | Add a `@media (max-width: 900px)` hero rule: `padding: 152px 0 96px` |

---

## 4 · Processing fluency

Stranger landing from a LinkedIn share:

- **First fixation** — H1 "The executive claims the deal." Ambiguous. A PE partner may read it as a legal or M&A term. An executive may read it as aspiration.
- **Second fixation** — sub clarifies in 25 words. Good recovery.
- **Third** — three figures anchor with named sources. Strong.
- **Scroll-past risk** — the essay is four dense paragraphs with no pull-quote. Partners who scan (most of them) will get the lede and bounce. A single pulled sentence in larger type would hold them.
- **CTA clarity** — two entry links at the fold. Symmetry is good; verbs could sharpen ("See the model" > "See how it works" — keep current).

**Fluency fix:** rework the hero H1 so the *position* is the thing readers encode in the first second. Current H1 is craft; the one-liner is load-bearing.

---

## 5 · Priority fix list

Do in this order:

**Tier 1 — brand integrity (30 minutes of edits):**
1. Remove "The executive claims the deal" from: meta description (line 7), og:description (line 10), footer tag (line 850), email signature template.
2. Replace hero H1 (line 641) with position-first copy. Recommended: **"We advance senior executives into PE-backed ownership."** with hero sub stripped to a shorter explanatory line. Alt: keep "claims the deal" as a small eyebrow above the H1 if you want to preserve it.
3. Fix six numeric-rule violations (list in §2).

**Tier 2 — design debt (1 hour):**
4. Footer contrast (D2), OG image (D3), drop-cap application (D1), mobile hero breakpoint (D8), email signature cleanup (D6).

**Tier 3 — brand system reconciliation (decision needed):**
5. Resolve the mark conflict (D4): the voice guide describes a V-tile and dot-separator wordmark; the implemented site uses a vertical-rule-plus-wordmark system. Pick one and align every surface (favicon, logo, signature, deck templates).

---

## 6 · What I'd do differently

Two judgment calls to flag:

- **The hero H1 is the single biggest decision on the page.** "The executive claims the deal" is beautiful but it's a slogan. Swapping it for the one-liner loses poetry and gains precision. My vote is swap — the guide is explicit and a PE partner is not the audience for evocative phrasing on first contact. But this is your call: the line has character and you may have written it deliberately over the guide.
- **The V-tile mark described in the guide never got built.** The current vertical-rule-plus-wordmark system is actually more restrained and more editorial than the guide's described mark. Consider updating the guide to match the built system rather than rebuilding assets to match the guide.
