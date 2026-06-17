---
name: VCG — Value Creation Group
description: Executive deal origination for those who already know the problem
colors:
  paper: "#F5F1EA"
  paper-soft: "#EFEAE1"
  ink: "#1A1612"
  ink-soft: "#5A534A"
  ink-faint: "#8A8278"
  rule: "#D9D2C3"
  accent: "#1E4A3A"
  accent-deep: "#143428"
  accent-faint: "#E8E3D3"
  cta: "#C97455"
  cta-deep: "#A85C40"
  accent-reversed: "#B8C7BC"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(3rem, 7vw, 5.5rem)"
    fontWeight: 300
    lineHeight: 1.0
    letterSpacing: "-0.02em"
    fontVariation: '"opsz" 144'
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 300
    lineHeight: 1.1
    fontVariation: '"opsz" 72'
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.2
    fontVariation: '"opsz" 36'
  body:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 300
    lineHeight: 1.65
    fontVariation: '"opsz" 12'
  label:
    fontFamily: '"JetBrains Mono", "Courier New", monospace'
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  none: "0px"
  hair: "1px"
  micro: "2px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "80px"
  2xl: "120px"
components:
  button-primary:
    backgroundColor: "{colors.cta}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "16px 40px"
  button-primary-hover:
    backgroundColor: "{colors.cta-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "16px 40px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    rounded: "{rounded.none}"
    padding: "14px 32px"
  button-ghost-hover:
    backgroundColor: "{colors.accent-faint}"
    textColor: "{colors.accent-deep}"
    rounded: "{rounded.none}"
    padding: "14px 32px"
---

# Design System: VCG — Value Creation Group

## 1. Overview

**Creative North Star: "The Private Correspondent"**

The design system reads like a letter that wasn't written for general circulation. The surface — warm bond paper, dense ink, no embellishment — says: this was composed for one specific reader who already qualifies. Authority is assumed, not established. The site does not explain itself to the uninitiated; it speaks directly to the person who already recognises the problem.

Three visual moves enforce this. First, ink on paper — the classic weight of record. No colour decorates; every pixel of colour carries semantic load. Second, Fraunces at full optical scale — a variable typeface used at both its upper limit (hero display, opsz 144, barely tracked, almost monumental) and its lower limit (body prose, opsz 12, optically tuned for the reading distance of a briefing document). Third, no radius anywhere — sharp corners throughout, the register of the typed memorandum, not the tech product.

This is not the editorial-magazine lane. It is not Klim-influenced broadsheet typography or display-italic affectation. The warm palette earns its warmth through functional hierarchy — paper for ground, paper-soft for alternating surfaces, a full dark contact section as the third register. The colour green is present and controlled: used on all interactive states and structural anchors, restrained everywhere else. The terracotta CTA carries the warmth of invitation, not the urgency of acquisition.

**Key Characteristics:**
- Ink-on-paper surface discipline: colour only where it signals meaning
- Zero radius throughout — the artefact aesthetic, not the product aesthetic
- Fraunces variable driven by optical-size axis: three characters from one typeface
- Present-but-controlled colour: green for all interactive states, terracotta for all CTAs
- One structural shadow only, on the fixed navigation
- Motion restrained to a single reveal pattern; reduced-motion honoured absolutely

## 2. Colors: The Correspondent's Palette

Five colour groups: a warm ground, a dense ink ramp, a single forest-green accent, a terracotta signal, and a rule. Nothing decorates; everything functions.

### Primary
- **Deal Room Forest** (`#1E4A3A`): The anchor. All interactive states — links at rest, nav items, hover treatments, section eyebrows, structural emphasis. This is the colour of a handwritten annotation on a deal memo. When you see it, something is worth attending to.
- **Forest Deep** (`#143428`): Hover and pressed state for all accent elements. Never used independently as a standalone colour.

### Secondary
- **Campaign Copper** (`#C97455`): The sole call-to-action colour. Every button, every "start a conversation" link. Warm enough to signal without urgency. It carries the personal register — this is the colour of invitation.
- **Copper Deep** (`#A85C40`): Hover and pressed state for all CTA elements.

### Neutral
- **Bond Paper** (`#F5F1EA`): Default ground. All sections unless the markup declares the dark contact register.
- **Paper Soft** (`#EFEAE1`): Alternating section backgrounds. Never used for text.
- **Press Ink** (`#1A1612`): Default body text, all prose, all headings. Near-black with a warm undertow — not a design black, the colour of a broadsheet impression.
- **Ink Soft** (`#5A534A`): Secondary text — section subtitles, captions, meta labels alongside statistics. Contrast ≈5.8:1 on Bond Paper; WCAG AA clear.
- **Ink Faint** (`#8A8278`): Tertiary text — footnotes, footer copy, source attributions. [CHECK: April audit estimated ~3.9:1 on Bond Paper, potentially below WCAG AA 4.5:1 threshold. Verify with a precise contrast tool before shipping. If failing, bump to #706960 or similar.]
- **Rule Grey** (`#D9D2C3`): Dividers, table rules, card borders. Never used as text. Never as a hover state.
- **Forest Faint** (`#E8E3D3`): Subtle warm tint for thesis card hover backgrounds and highlighted table rows. A whisper of alignment — not legible as a brand signal in isolation.

- **Reversed Accent** (`#B8C7BC`): A muted sage — the forest green desaturated and lightened for use on dark surfaces. Appears on the reversed VCG mark (the wordmark's italic "Value" when on the ink background), the contact section signature, and any accent element rendered on the Press Ink ground. It is not used on light surfaces.

**The One-Function Rule.** Each colour role is exclusive. Green appears on interactive states and structural anchors only — never on decorative headings, never on backgrounds. Terracotta appears on CTAs only — never used as an emphasis colour in running prose. If you reach for green to "add personality" to a heading, stop.

## 3. Typography: The Optical Hierarchy

**Display Font:** Fraunces variable (Georgia, serif fallback) — optical size range 9–144, weight 300–700
**Label Font:** JetBrains Mono (Courier New, monospace fallback) — weights 400 and 500

Fraunces appears on the impeccable reflex-reject list due to AI overuse — identity-preservation overrides this here. The brand committed to Fraunces before the current saturation and uses the variable optical-size axis in a way most AI outputs don't: full opsz 144 for the hero, opsz 12 for body prose, making one typeface perform across the entire hierarchy. The mono label font (JetBrains Mono) is similarly pre-committed; it carries precision, not costume.

**Character:** A single typeface used with technical deliberateness — three distinct visual characters depending on optical size. The hero Fraunces at opsz 144 is almost architectural. The body Fraunces at opsz 12 is warm and dense, close to a printed broadsheet. JetBrains Mono appears only where the label register demands it: data labels, eyebrows above statistics, navigation metadata. The constraint is intentional.

### Hierarchy
- **Display** (weight 300, `font-variation-settings: "opsz" 144`, ~5.5rem max, line-height 1.0, letter-spacing -0.02em): Hero headings only. Never more than one per page. The opsz 144 setting opens the letterforms at their most open and generous.
- **Headline** (weight 300, `"opsz" 72`, ~3.25rem max, line-height 1.1): Section headings — "The Principal Gap," "Who this is for." Never italicised on section headings.
- **Title** (weight 400, `"opsz" 36`, ~1.75rem max, line-height 1.2): Subsection labels, stat numerals, emphasis callouts. The slight weight increase at opsz 36 is intentional — the axis makes 400 feel more decisive at this scale.
- **Body** (weight 300, `"opsz" 12`, 1.0625rem, line-height 1.65): All prose. Max line length 68ch. The Fraunces at small optical size is the voice of the site — careful, unhurried, specific.
- **Label** (JetBrains Mono, weight 500, 0.6875rem, letter-spacing 0.06em, uppercase): Eyebrows above statistics only (not above every section). Navigation links, footnote attributions, data table column heads, eyebrow tags.

**The Optical-Size Doctrine.** The variable axis `opsz` is non-negotiable. Every Fraunces instance must declare its optical size via `font-variation-settings`. Missing it collapses the hierarchy — every heading looks the same weight at similar sizes. Display: `"opsz" 144`. Headline: `"opsz" 72`. Title: `"opsz" 36`. Body: `"opsz" 12`.

**The Mono Restriction.** JetBrains Mono is prohibited in paragraph prose. It may only appear in label roles — short, often uppercase, clearly structured context. A sentence in mono reads as costume; a label in mono reads as precision.

## 4. Elevation

The system is flat by doctrine — depth achieved through contrast and section register shifts, never through shadow or blur. One structural exception: a single ambient shadow on the fixed navigation bar, present only when the user has scrolled and content sits behind it.

Section alternation creates depth without elevation: Bond Paper / Paper Soft / Press Ink (contact section) — three registers, each its own layer. No card or content element in the scroll stream casts a shadow; they sit on the surface.

### Shadow Vocabulary
- **Nav Anchor** (`box-shadow: 0 4px 24px rgba(26, 22, 18, 0.08)`): The fixed navigation only. Activates on scroll, when the nav must ground itself against arbitrary content beneath it. Warm-tinted using the ink colour at 8% opacity — diffuse, ambient, barely perceptible.

**The Artefact Document Exception.** The thesis card and deal package card carry a compound ambient shadow (`0 1px 0 rgba(26,22,18,0.03), 0 12px 32px -16px rgba(26,22,18,0.12)`) and a 2px micro-radius. These are deliberate: they simulate a physical document sitting on a desk — the design principle "Show the artefact" demands they feel tangible. They also have 2px corners (`rounded.micro`) to prevent harsh pixel aliasing on high-DPI screens. This is the only exception to the flat-and-sharp doctrine.

**The Flat-By-Default Rule.** Surfaces are flat at rest. The one nav shadow exists because the nav is a persistent layer above changing content — it needs functional grounding, not visual interest. No card, section, or content element in the scroll stream gets a shadow. A shadow added for visual interest is the wrong answer.

## 5. Components

### Buttons
Sharp edges throughout (0px radius) — the physical register of the site is typed correspondence, not product UI. Buttons are functional artefacts, not interface widgets.

- **Primary (CTA):** Campaign Copper (`#C97455`) background, Bond Paper text, no border, 16px 40px padding. Label in JetBrains Mono at 0.6875rem, 0.06em tracking, uppercase. Transition: background 220ms ease-out, transform 220ms ease-out.
- **Primary hover/focus:** Copper Deep (`#A85C40`) background, translateY(-1px). Focus-visible: 2px outline in Deal Room Forest, 2px offset.
- **Ghost (secondary):** Transparent background, 1px Rule Grey border, Deal Room Forest text. Used for in-line anchors that need button affordance without urgency.
- **Ghost hover:** Forest Faint (`#E8E3D3`) background, accent-deep border and text.

### Navigation
Fixed position, `backdrop-filter: blur(10px)` on Bond Paper at 0.92 opacity. On scroll, the Nav Anchor shadow appears. Links in JetBrains Mono label scale. Active/hover link in Deal Room Forest. `@supports not (backdrop-filter: blur(10px))` fallback: solid Bond Paper background for Firefox with hardware acceleration disabled.

### Figures / Stat Cards
Three-column grid (no card container, no border, no background). Each figure: a large numeral in Title scale (Fraunces, `"opsz" 36`, weight 400), a one-line description in body below, and a source attribution in JetBrains Mono label above in Deal Room Forest. The source is not a footnote courtesy — it is the trust mechanism. Without the named source, the statistic is an assertion.

### Thesis Cards
Thin rule border (1px Rule Grey), flat Bond Paper background, 0px radius. A short eyebrow label in JetBrains Mono above, a headline in Headline scale, body prose in Body scale. No shadow. Hover state: border shifts to Forest Faint fill — a warmth change, not a lift. No translateY, no scale.

### Pull-Quote
Single centred line at Title scale, Fraunces at `"opsz" 36` with weight 300 (appears optically italic at this optical size in this family), Ink Soft colour, max-width 52ch to enforce reading rhythm. A 1px Rule Grey rule above and below. No background. No border-left stripe.

### Contact / Dark Section
Full register shift — Press Ink (`#1A1612`) background, Bond Paper as base text. The ink-faint muted text becomes paper at 50% opacity. The CTA button renders identically to the light-mode version: Campaign Copper background, Bond Paper text. The colour identity of the button does not change with the section register.

### Alignments Table
Three-column comparison: "Standard PE approach" / "What we do differently" / "What you keep." JetBrains Mono labels for column heads (0.6875rem, uppercase, 0.06em tracking). Body prose in Fraunces Body. Rule Grey horizontal dividers between rows. No background alternation, no hover states. Tables here are records, not interactive grids.

## 6. Do's and Don'ts

### Do:
- **Do** use Deal Room Forest (`#1E4A3A`) on all interactive states — links, hover treatments, section anchors, navigation. Its rarity in decorative contexts is what makes it land when it matters.
- **Do** set `font-variation-settings: "opsz" N` on every Fraunces instance. The optical size axis is the hierarchy. Missing it collapses all weights to an indistinguishable midpoint.
- **Do** carry a named source on every statistic. "53% of returns are generated by executive-identified deals — not by the fund." The source is the artefact; the artefact is the trust mechanism.
- **Do** keep JetBrains Mono to label roles — eyebrows above figures, navigation links, table column heads. Nothing in paragraph prose.
- **Do** let the dark contact section be the only full-register reversal. One dark section is a deliberate accent. Two would imply a pattern.
- **Do** honour `prefers-reduced-motion` absolutely. The reveal animation (opacity + translateY(8px), 360ms, `cubic-bezier(0.16, 1, 0.3, 1)`) must instantly resolve for users who opt out. No fade-in, no translate — content is visible immediately.
- **Do** cap body prose at 68ch line length. This is not optional — it is what separates the reading experience of a private briefing document from a standard advisory page.
- **Do** write copy that assumes the reader already understands the problem. The site speaks to the person who already recognises the Principal Gap. Explanatory framing for the uninitiated does not belong here.

### Don't:
- **Don't** add a tagline. The wordmark stands alone — "VCG" or "Value Creation Group." The line "The executive claims the deal" must be removed from meta description, OG title, hero H1, and footer tag. The wordmark needs no slogan; a slogan is what advisory firms use when the principal can't stand behind the work.
- **Don't** write copy that could appear on any Big-4 or McKinsey advisory site. "We bring our network and expertise" is prohibited. Every sentence must be specific to VCG's mechanism: co-origination, the 50/50 origination fee split, the Principal Gap. Generic advisory language is the tell that sinks all four anti-references.
- **Don't** use border-left coloured stripes on cards, callouts, or list items. The register is the clean table and the divider rule — side stripes are advisory-template grammar, not the private correspondent's register.
- **Don't** add a shadow to cards, sections, or content containers. The Flat-By-Default Rule is absolute. The one nav shadow is the structural exception, not the model to follow.
- **Don't** render statistics without named sources. A bare percentage on a brand site reads as asserted, not evidenced. The named source is what separates VCG's site from the dozens of advisory pages that claim the same figure without grounding.
- **Don't** add a third typeface. Fraunces and JetBrains Mono are the system. A third family — for pull-quotes, for the dark section, for section numbering — would dilute the deliberateness of the pairing and signal a design decision made for variety rather than voice.
- **Don't** use gradient text, glassmorphism, large rounded-corner icon badges, or identical card grids. None are in the current implementation; none belong in future extensions.
- **Don't** explain VCG to an audience that doesn't already know. If a reader needs the concept of executive-led deal origination explained from the beginning, this is not the right site for them — and that is an intentional feature, not a failure of communication.
- **Don't** optimise for the wrong reader. The site generates one outcome: a qualified first conversation with a senior executive who has a real deal view and is ready to act. Optimising for volume, discovery, or the broader professional audience compromises that.
