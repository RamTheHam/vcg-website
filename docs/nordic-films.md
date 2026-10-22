# Nordic-light films: recovery and integration

## Sources

- Website: https://www.valuecatalyst.group
- Repository: https://github.com/RamTheHam/vcg-website
- Live HTML matched `main` at `037bbbd48036d6e97793dfaaa33c445d05b981e9` byte-for-byte during this work.
- July previews: `origin/preview/nordic-light`, with morning, midday, bluehour and night assets under `preview/media/light/` and `preview/media/masters/`.
- Existing integration: `origin/feat/nordic-light-films` at `0d78badd2e258ca739b656571ce9c81e8576605c`, dated 3 August 2026.
- The August integration commit explicitly selected morning/hero, bluehour/executives and night/contact and omitted midday per prior direction.
- Original generation conversations have not been recovered. Earlier session history supplied the Nordic-light, circa-1900 Stockholm archipelago mood brief. New portrait winter and autumn media were generated with Henrik's approval.

## This implementation

Local branch: `refine/ambient-films`, following the earlier integration merged in PR #1.

Preserves all original visible website copy and recovered source films. Final order: morning hero; off-white figures/Principal Gap; portrait winter behind For Executives; off-white Economics; autumn behind How It Works; off-white About; night behind Contact. Portrait scenes sit behind the text, not above it. On narrow screens they stay in the viewport while their section scrolls to avoid extreme cropping. Paper cards retain dark text on off-white.

The production Docker image includes films. Native forward/reverse WebM and MP4 cycles avoid seeking on every animation frame. Morning and night retain their original pacing. New portrait loops are encoded at half-speed and played at 0.5x again: quarter-speed source motion, a 32-second file and a 64-second displayed cycle. No audio tracks. Retained generation masters in `films/masters/` are excluded from the Docker build context. Reproduce delivery files with `python scripts/encode-ambient-films.py autumn bluehour-portrait`.

Replaces screenshot-based posters with actual film frames. Sources attach only to visible videos. Offscreen and hidden-tab playback pauses. Reduced-motion and supported save-data preferences suppress video loading on initial load. The visible pause control was removed at Henrik's explicit request; autoplay refusal leaves a still. MP4 follows WebM as a compatibility fallback. This is not a claim of full WCAG conformance: there is no on-page pause control.

## New generation provenance

Approved budget: US$5. GPT Image 2 created the portrait references from the recovered blue-hour frame; Veo 3.1 Fast animated them.

- Winter image: `cbxmwashs5rmr0d1cfeb4sxs64`, US$0.128.
- Autumn image: `tb3wadhm2xrmr0d1cfe9rsmezc`, US$0.128.
- Winter video: `p8d8azzvfdrmt0d1cft9y6phbr`, eight seconds, 720p portrait, US$0.80. Prompt: locked camera, very slow thin-cloud drift, fixed moon/trees/rocks/horizon, no new subjects or dramatic weather.
- Autumn video: `q5axzdzp79rmr0d1cfs8c35b24`, eight seconds, 1080p portrait, US$0.80. Prompt: locked camera, tiny slow water ripples, fixed pier/trees/horizon, no people or new objects, circa-1900 archipelago.
- Three provider-load failures were refunded; one rate-limited submission was not charged. Successful generation total: US$1.856.

## Verification

- `python -m unittest discover -s tests -v`: delivery and fallback tests.
- Browser checks: verify all four films play, slow playback rates, offscreen pausing, initially unloaded offscreen sources, reduced motion at startup and changed live, mobile sticky backgrounds and no horizontal overflow at 390px.
- Visual review in Chromium: desktop/mobile backgrounds, off-white separation, paper-card contrast. Compare film contact sheets for stable scene geometry and restrained motion.
- `git diff --check`.

Docker is unavailable locally. Production is on Railway, not GitHub Pages: after publication, verify the exact deployed HTML and media. Safari/iOS hardware testing has not been performed. Publication was approved by Henrik.

## Local preview

From this repository: `python -m http.server 4178 --bind 127.0.0.1`.
Open http://127.0.0.1:4178 in Chrome.
