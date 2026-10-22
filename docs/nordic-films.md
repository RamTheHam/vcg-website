# Nordic-light films: recovery and integration

## Sources

- Website: https://www.valuecatalyst.group
- Repository: https://github.com/RamTheHam/vcg-website
- Live HTML matched `main` at `037bbbd48036d6e97793dfaaa33c445d05b981e9` byte-for-byte during this work.
- July previews: `origin/preview/nordic-light`, with morning, midday, bluehour and night assets under `preview/media/light/` and `preview/media/masters/`.
- Existing integration: `origin/feat/nordic-light-films` at `0d78badd2e258ca739b656571ce9c81e8576605c`, dated 3 August 2026.
- The August integration commit explicitly selected morning/hero, bluehour/executives and night/contact and omitted midday per prior direction.
- Original generation conversations have not been recovered. No new AI videos were generated.

## This implementation

Local branch: `implement/nordic-films`.

Preserves the August section assignments, original video files and all existing website copy. Following Henrik's review, blue hour is shown uncropped at 16:9 above the Executives text, without a pale veil; morning and night remain background films. Adds the films directory to the production Docker image. Encodes forward/reverse cycles into new `*-loop.mp4` and `*-loop.webm` files rather than seeking on every animation frame. Source footage is 9 seconds (morning, previously trimmed) and 10 seconds (bluehour/night); complete forward/reverse cycles are 18 and 20 seconds respectively. No audio tracks.

Replaces screenshot-based poster images with actual frames from the films. Sources attach only to visible videos. Offscreen and hidden-tab playback pauses. Reduced-motion and supported save-data preferences suppress video loading on initial load. A keyboard-accessible control pauses/resumes background films. Autoplay rejection leaves a still and offers explicit playback. MP4 is provided after WebM as a compatibility fallback.

## Verification

- `python -m unittest discover -s tests -v`: delivery and fallback tests.
- Browser checks: actual playback in all three sections; pause/resume; offscreen pausing; initially unloaded offscreen sources; reduced-motion at startup and changed live; mobile navigation; no horizontal overflow at 390px.
- Visual review in Chromium: desktop hero and contact, mobile hero.
- `git diff --check`.

Docker is not installed on this machine, so a container build and real Railway deployment remain unverified. Safari/iOS hardware testing has not been performed. The live site has not been changed. Publishing requires approval and authenticated GitHub/Railway access.

## Local preview

From this repository: `python -m http.server 4178 --bind 127.0.0.1`.
Open http://127.0.0.1:4178 in Chrome.
