/* Builds /preview/films-morning/ and /preview/films-bluehour/ from ../index.html.
   The four 10s ambient clips become full-bleed chapter bands down one page;
   the whole page is pinned to one palette (morning = warm, ~existing site;
   bluehour = deep blue). Production index.html is never modified.
   Run: node preview/build-films.js */
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/\r\n/g, '\n');

const VERSIONS = [
  { key: 'films-morning',  state: 'morning',  title: 'Morning',   order: ['morning', 'midday', 'bluehour', 'night'] },
  { key: 'films-bluehour', state: 'bluehour', title: 'Blue hour', order: ['bluehour', 'midday', 'night', 'morning'] },
];

const MEDIA = '/preview/media/light';

function filmMedia(state) {
  return (
    `    <div class="fb__media" aria-hidden="true" style="background-image:url('${MEDIA}/${state}.jpg')">\n` +
    `      <video class="fb__video" muted loop playsinline preload="none" poster="${MEDIA}/${state}.jpg" tabindex="-1">\n` +
    `        <source src="${MEDIA}/${state}.webm" type="video/webm">\n` +
    `        <source src="${MEDIA}/${state}.mp4" type="video/mp4">\n` +
    `      </video>\n` +
    `    </div>\n` +
    `    <div class="fb__tint" aria-hidden="true"></div>\n`
  );
}
function filmBand(mod, state, inner) {
  return `  <section class="fb fb--${mod}">\n${filmMedia(state)}    <div class="container">\n${inner}\n    </div>\n  </section>\n`;
}

const DIAG_INNER =
  '      <div class="narrow" style="padding: 0;">\n' +
  '        <p class="eyebrow reveal" style="margin-bottom: 24px;">The diagnosis</p>\n' +
  '        <h2 class="section__title reveal d1" id="principal-gap-heading" style="max-width: 22ch;">The <em>Principal Gap.</em></h2>\n' +
  '      </div>';
const EXEC_INNER =
  '      <div style="max-width: 760px;">\n' +
  '        <p class="eyebrow reveal" style="margin-bottom: 24px;">For executives</p>\n' +
  '        <h2 class="section__title reveal d1" id="exec-heading">Built for executives <em>across a career.</em></h2>\n' +
  '      </div>';
const METHOD_INNER =
  '      <div class="narrow" style="padding: 0;">\n' +
  '        <p class="eyebrow reveal" style="margin-bottom: 24px;">How it works</p>\n' +
  '        <h2 class="section__title reveal d1" id="method-heading" style="max-width: 24ch;"><em>Lead with the operator.</em> Then shape the role.</h2>\n' +
  '      </div>';

const INVERSION = `        <!-- The inversion — the page's single narrative moment -->
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

for (const v of VERSIONS) {
  let html = SRC;
  const must = (n, l) => { if (!html.includes(n)) throw new Error(v.key + ' anchor: ' + l); };
  const swap = (n, r, l) => { must(n, l); html = html.replace(n, r); };

  /* head */
  html = html.replace(/<title>[^<]*<\/title>/, `<title>VCG &mdash; Light films &middot; ${v.title}</title>`);
  html = html.replace(/\s*<link rel="canonical"[^>]*>/, '');
  swap('<link rel="icon"', '<meta name="robots" content="noindex, nofollow">\n  <link rel="icon"', 'icon');
  swap('</head>',
    '  <link rel="stylesheet" href="/preview/nordic.css">\n' +
    '  <link rel="stylesheet" href="/preview/films.css">\n' +
    '  <script defer src="/preview/films.js"></script>\n</head>', 'head');

  /* pin palette */
  swap('<html lang="en">', `<html lang="en" data-nl="${v.state}">`, 'html');

  /* asset paths -> absolute */
  html = html.replace(/src="henrik\.jpg"/g, 'src="/henrik.jpg"');
  html = html.replace(/src="logos\//g, 'src="/logos/');

  /* hero -> film band */
  swap('<header class="hero" id="top">',
    '<header class="hero fb fb--hero" id="top">\n' + filmMedia(v.order[0]), 'hero');

  /* diagnosis -> film band */
  swap(
    '        <div class="rule reveal"></div>\n' +
    '        <p class="eyebrow reveal" style="margin-bottom: 28px;">The diagnosis</p>\n' +
    '        <h2 class="section__title reveal d1" id="principal-gap-heading" style="max-width: 22ch;">The <em>Principal Gap.</em></h2>\n' +
    '        ', '', 'diag strip');
  swap('<section class="section section--paper-soft" aria-labelledby="principal-gap-heading">',
    filmBand('diagnosis', v.order[1], DIAG_INNER) +
    '  <section class="section section--paper-soft" aria-labelledby="principal-gap-heading">', 'diag band');

  /* executives -> film band */
  swap(
    '        <div class="rule"></div>\n' +
    '        <p class="eyebrow" style="margin-bottom: 28px;">For executives</p>\n' +
    '        <h2 class="section__title" id="exec-heading">Built for executives <em>across a career.</em></h2>\n' +
    '        ', '', 'exec strip');
  swap('<section class="section" id="executives" aria-labelledby="exec-heading">',
    filmBand('executives', v.order[2], EXEC_INNER) +
    '  <section class="section" id="executives" aria-labelledby="exec-heading">', 'exec band');

  /* method -> film band */
  swap(
    '        <div class="rule reveal"></div>\n' +
    '        <p class="eyebrow reveal" style="margin-bottom: 28px;">How it works</p>\n' +
    '        <h2 class="section__title reveal d1" id="method-heading" style="max-width: 24ch;"><em>Lead with the operator.</em> Then shape the role.</h2>\n' +
    '        ', '', 'method strip');
  swap('<section class="section section--paper-soft" id="method" aria-labelledby="method-heading">',
    filmBand('method', v.order[3], METHOD_INNER) +
    '  <section class="section section--paper-soft" id="method" aria-labelledby="method-heading">', 'method band');

  /* inversion */
  swap('        <!-- What we do -->', INVERSION + '\n        <!-- What we do -->', 'inversion');

  /* Re-map hard-coded panel colours so the deep-blue palette stays legible */
  html = html.replace(/#B8C7BC/g, 'var(--nl-panel-accent)');
  html = html.replace(/rgba\(245,\s*241,\s*234,\s*0\.88\)/g, 'var(--nl-nav)');
  html = html.replace(/rgba\(245,\s*241,\s*234,\s*0\.7[25]\)/g, 'var(--nl-panel-soft)');
  html = html.replace(/rgba\(245,\s*241,\s*234,\s*0\.85\)/g, 'var(--nl-panel-ink)');
  html = html.replace(/rgba\(245,\s*241,\s*234,\s*0\.6\)/g, 'var(--nl-panel-faint)');
  html = html.replace(/rgba\(245,\s*241,\s*234,\s*0\.3\)/g, 'var(--nl-panel-rule)');
  html = html.replace(/rgba\(245,\s*241,\s*234,\s*0\.14\)/g, 'var(--nl-panel-rule)');
  html = html.replace(/rgba\(245,\s*241,\s*234,\s*0\.08\)/g, 'var(--nl-panel-rule)');

  const dir = path.join(__dirname, v.key);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log('built preview/' + v.key + '/index.html (' + (html.length / 1024).toFixed(1) + ' KB)');
}
