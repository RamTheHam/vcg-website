/* Builds /preview/{still,light-film,masters}/index.html from ../index.html.
   Production index.html is never modified. Run: node preview/build-previews.js */
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const VARIANTS = [
  { key: 'still',      title: 'Still',      film: null },
  { key: 'light-film', title: 'Light film', film: '/preview/media/light' },
  { key: 'masters',    title: 'Masters',    film: '/preview/media/masters' },
];

const EARLY_STATE_SCRIPT = `<script>(function(){var h=new Date().getHours(),s=h>=6&&h<10?'morning':h>=10&&h<17?'midday':h>=17&&h<22?'bluehour':'night';try{var m=sessionStorage.getItem('nl-state');if(m)s=m;else if(localStorage.getItem('nl-pin')==='midday')s='midday';}catch(e){}document.documentElement.setAttribute('data-nl',s);})();</script>`;

const SWITCHER = `
  <div class="nl-switch" role="group" aria-label="Nordic light state">
    <span class="nl-switch__label">Nordic light</span>
    <button type="button" data-state="morning" aria-pressed="false">Morning</button>
    <button type="button" data-state="midday" aria-pressed="false">Midday</button>
    <button type="button" data-state="bluehour" aria-pressed="false">Blue hour</button>
    <button type="button" data-state="night" aria-pressed="false">Night</button>
    <button type="button" class="nl-switch__pin" aria-pressed="false" title="Always show the midday palette">Pin midday</button>
  </div>`;

const AMBIENT = `
  <div class="nl-band" aria-hidden="true"></div>
  <div class="nl-grain" aria-hidden="true"></div>`;

const FILM = `
  <div class="nl-film" aria-hidden="true">
    <video muted playsinline loop preload="metadata" tabindex="-1"></video>
    <video muted playsinline loop preload="none" tabindex="-1"></video>
    <div class="nl-film__tint"></div>
  </div>`;

const INVERSION = `
        <!-- The inversion — the page's single narrative moment -->
        <div class="nl-inversion reveal d3" aria-label="Standard PE sequence versus the VCG sequence">
          <div class="nl-inv-row nl-inv-row--std">
            <span class="nl-inv-label">Standard PE</span>
            <div class="nl-inv-cells">
              <span class="nl-inv-cell">Firm finds target</span>
              <span class="nl-inv-arr" aria-hidden="true">&rarr;</span>
              <span class="nl-inv-cell">Firm builds thesis</span>
              <span class="nl-inv-arr" aria-hidden="true">&rarr;</span>
              <span class="nl-inv-cell">Firm hires manager</span>
            </div>
          </div>
          <div class="nl-inv-row nl-inv-row--vcg">
            <span class="nl-inv-label">VCG</span>
            <div class="nl-inv-cells">
              <span class="nl-inv-cell">Operator&rsquo;s view</span>
              <span class="nl-inv-arr" aria-hidden="true">&rarr;</span>
              <span class="nl-inv-cell">The deal, written down</span>
              <span class="nl-inv-arr" aria-hidden="true">&rarr;</span>
              <span class="nl-inv-cell">Capital arrives aligned</span>
            </div>
          </div>
          <p class="nl-inv-verdict">The operator&rsquo;s view is the deal. <em>The role follows.</em></p>
        </div>
`;

const CREDIT = `<span class="footer__copy" style="max-width: 46ch; text-align: right;">Light studies after Hammersh&oslash;i, Jansson, Kr&oslash;yer, Sohlberg, Halonen &mdash; works in the public domain.</span>`;

function must(haystack, needle, label) {
  if (!haystack.includes(needle)) throw new Error('Anchor not found: ' + label);
}

for (const v of VARIANTS) {
  let html = src;

  // <html> gets the variant + media base + a server-side default state (early script corrects it pre-paint)
  must(html, '<html lang="en">', 'html tag');
  html = html.replace('<html lang="en">',
    `<html lang="en" data-nl="midday" data-nl-variant="${v.key}"${v.film ? ` data-nl-media="${v.film}"` : ''}>`);

  // Head: preview title, no indexing, no canonical; nordic css/js + early state
  html = html.replace(/<title>[^<]*<\/title>/,
    `<title>VCG &mdash; Nordic light preview &middot; ${v.title}</title>`);
  html = html.replace(/\s*<link rel="canonical"[^>]*>/, '');
  must(html, '<link rel="icon"', 'icon link');
  html = html.replace('<link rel="icon"', '<meta name="robots" content="noindex, nofollow">\n  <link rel="icon"');
  must(html, '</head>', 'head close');
  html = html.replace('</head>',
    `  ${EARLY_STATE_SCRIPT}\n  <link rel="stylesheet" href="/preview/nordic.css">\n  <script defer src="/preview/nordic.js"></script>\n</head>`);

  // Body class for film variants
  if (v.film) html = html.replace('<body>', '<body class="nl-has-film">');

  // Asset paths -> absolute (pages live two levels deep)
  html = html.replace(/src="henrik\.jpg"/g, 'src="/henrik.jpg"');
  html = html.replace(/src="logos\//g, 'src="/logos/');

  // Ambient layers + switcher (+ film layer) right after <body>
  const bodyTag = v.film ? '<body class="nl-has-film">' : '<body>';
  html = html.replace(bodyTag, bodyTag + AMBIENT + (v.film ? FILM : '') + SWITCHER);

  // Hero: mullion shadow, staggered rise-in, horizon line
  must(html, '<header class="hero" id="top">', 'hero open');
  html = html.replace('<header class="hero" id="top">',
    '<header class="hero" id="top">\n    <div class="nl-mullion" aria-hidden="true"></div>');
  html = html.replace('class="eyebrow hero__eyebrow reveal"', 'class="eyebrow hero__eyebrow nl-rise nl-rise-1"');
  html = html.replace('<h1 class="reveal d1"><em>For the few</em>', '<h1 class="nl-rise nl-rise-2"><em>For the few</em>');
  must(html, 'class="hero__sub reveal d2"', 'hero sub');
  html = html.replace('class="hero__sub reveal d2"', 'class="hero__sub nl-rise nl-rise-3"');
  // Horizon: after the hero sub paragraph, still inside .container
  const heroSubEnd = 'splitting the deal fee fifty-fifty.</p>';
  must(html, heroSubEnd, 'hero sub end');
  html = html.replace(heroSubEnd, heroSubEnd + '\n      <div class="nl-horizon" aria-hidden="true"></div>');

  // Stat count-ups
  must(html, '<div class="figure__number">50/50</div>', 'figure 50/50');
  html = html.replace('<div class="figure__number">50/50</div>',
    '<div class="figure__number"><span class="nl-count" data-count="50">50</span>/<span class="nl-count" data-count="50">50</span></div>');
  html = html.replace('<div class="figure__number">53%</div>',
    '<div class="figure__number"><span class="nl-count" data-count="53">53</span>%</div>');
  html = html.replace('<div class="figure__number">70%</div>',
    '<div class="figure__number"><span class="nl-count" data-count="70">70</span>%</div>');

  // The inversion, inserted after the How-it-works intro block
  const invAnchor = '        <!-- What we do -->';
  must(html, invAnchor, 'what-we-do anchor');
  html = html.replace(invAnchor, INVERSION + '\n' + invAnchor);

  // Re-map hard-coded panel colours so dark palettes stay legible
  html = html.replace(/#B8C7BC/g, 'var(--nl-panel-accent)');
  html = html.replace(/rgba\(245,\s*241,\s*234,\s*0\.88\)/g, 'var(--nl-nav)');
  html = html.replace(/rgba\(245,\s*241,\s*234,\s*0\.7[25]\)/g, 'var(--nl-panel-soft)');
  html = html.replace(/rgba\(245,\s*241,\s*234,\s*0\.85\)/g, 'var(--nl-panel-ink)');
  html = html.replace(/rgba\(245,\s*241,\s*234,\s*0\.6\)/g, 'var(--nl-panel-faint)');
  html = html.replace(/rgba\(245,\s*241,\s*234,\s*0\.3\)/g, 'var(--nl-panel-rule)');
  html = html.replace(/rgba\(245,\s*241,\s*234,\s*0\.14\)/g, 'var(--nl-panel-rule)');
  html = html.replace(/rgba\(245,\s*241,\s*234,\s*0\.08\)/g, 'var(--nl-panel-rule)');

  // Masters: public-domain credit in the footer
  if (v.key === 'masters') {
    const footAnchor = '<span class="footer__copy">&copy; 2026 &middot; Stockholm</span>';
    const footAnchorAlt = '<span class="footer__copy">© 2026 · Stockholm</span>';
    if (html.includes(footAnchor)) html = html.replace(footAnchor, CREDIT + '\n      ' + footAnchor);
    else { must(html, footAnchorAlt, 'footer copy'); html = html.replace(footAnchorAlt, CREDIT + '\n      ' + footAnchorAlt); }
  }

  const dir = path.join(__dirname, v.key);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log('built preview/' + v.key + '/index.html (' + (html.length / 1024).toFixed(1) + ' KB)');
}
