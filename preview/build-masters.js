/* Builds /preview/masters/index.html from ../index.html.
   VCG's own palette; five cropped Nordic paintings as chapter bands.
   Production index.html is never modified. Run: node preview/build-masters.js */
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/\r\n/g, '\n');

function must(needle, label) {
  if (!html.includes(needle)) throw new Error('Anchor not found: ' + label);
}
function swap(needle, repl, label) { must(needle, label); html = html.replace(needle, repl); }

/* ── Head: preview title, no indexing, masters assets ── */
html = html.replace(/<title>[^<]*<\/title>/, '<title>VCG &mdash; Masters preview</title>');
html = html.replace(/\s*<link rel="canonical"[^>]*>/, '');
swap('<link rel="icon"', '<meta name="robots" content="noindex, nofollow">\n  <link rel="icon"', 'icon');
swap('</head>',
  '  <link rel="stylesheet" href="/preview/masters.css">\n  <script defer src="/preview/masters.js"></script>\n</head>',
  'head close');

/* ── Asset paths -> absolute (page lives two levels deep) ── */
html = html.replace(/src="henrik\.jpg"/g, 'src="/henrik.jpg"');
html = html.replace(/src="logos\//g, 'src="/logos/');

/* ── Hero becomes a painting band ── */
swap('<header class="hero" id="top">', '<header class="hero mb-hero" id="top">', 'hero');

/* ── Stat count-ups ── */
swap('<div class="figure__number">50/50</div>',
  '<div class="figure__number"><span class="nl-count" data-count="50">50</span>/<span class="nl-count" data-count="50">50</span></div>', 'fig 50');
swap('<div class="figure__number">53%</div>',
  '<div class="figure__number"><span class="nl-count" data-count="53">53</span>%</div>', 'fig 53');
swap('<div class="figure__number">70%</div>',
  '<div class="figure__number"><span class="nl-count" data-count="70">70</span>%</div>', 'fig 70');

/* ── Chapter band helper ── */
function band(mod, inner) {
  return `  <div class="mb-band mb-band--${mod}">\n    <div class="container">\n${inner}\n    </div>\n  </div>\n`;
}

/* ── Diagnosis: lift eyebrow + title into a band before the section ── */
swap(
  '        <div class="rule reveal"></div>\n' +
  '        <p class="eyebrow reveal" style="margin-bottom: 28px;">The diagnosis</p>\n' +
  '        <h2 class="section__title reveal d1" id="principal-gap-heading" style="max-width: 22ch;">The <em>Principal Gap.</em></h2>\n' +
  '        ',
  '', 'diagnosis header strip');
swap('<section class="section section--paper-soft" aria-labelledby="principal-gap-heading">',
  band('diagnosis',
    '      <div class="narrow" style="padding: 0;">\n' +
    '        <p class="eyebrow reveal" style="margin-bottom: 24px;">The diagnosis</p>\n' +
    '        <h2 class="section__title reveal d1" id="principal-gap-heading" style="max-width: 22ch;">The <em>Principal Gap.</em></h2>\n' +
    '      </div>') +
  '  <section class="section section--paper-soft" aria-labelledby="principal-gap-heading">',
  'diagnosis band insert');

/* ── Executives: lift eyebrow + title into a band before the section ── */
swap(
  '        <div class="rule"></div>\n' +
  '        <p class="eyebrow" style="margin-bottom: 28px;">For executives</p>\n' +
  '        <h2 class="section__title" id="exec-heading">Built for executives <em>across a career.</em></h2>\n' +
  '        ',
  '', 'executives header strip');
swap('<section class="section" id="executives" aria-labelledby="exec-heading">',
  band('executives',
    '      <div style="max-width: 760px;">\n' +
    '        <p class="eyebrow reveal" style="margin-bottom: 24px;">For executives</p>\n' +
    '        <h2 class="section__title reveal d1" id="exec-heading">Built for executives <em>across a career.</em></h2>\n' +
    '      </div>') +
  '  <section class="section" id="executives" aria-labelledby="exec-heading">',
  'executives band insert');

/* ── Method / How it works: lift eyebrow + title into a band ── */
swap(
  '        <div class="rule reveal"></div>\n' +
  '        <p class="eyebrow reveal" style="margin-bottom: 28px;">How it works</p>\n' +
  '        <h2 class="section__title reveal d1" id="method-heading" style="max-width: 24ch;"><em>Lead with the operator.</em> Then shape the role.</h2>\n' +
  '        ',
  '', 'method header strip');
swap('<section class="section section--paper-soft" id="method" aria-labelledby="method-heading">',
  band('method',
    '      <div class="narrow" style="padding: 0;">\n' +
    '        <p class="eyebrow reveal" style="margin-bottom: 24px;">How it works</p>\n' +
    '        <h2 class="section__title reveal d1" id="method-heading" style="max-width: 24ch;"><em>Lead with the operator.</em> Then shape the role.</h2>\n' +
    '      </div>') +
  '  <section class="section section--paper-soft" id="method" aria-labelledby="method-heading">',
  'method band insert');

/* ── The inversion — inserted after the How-it-works intro block ── */
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
const invAnchor = '        <!-- What we do -->';
swap(invAnchor, INVERSION + '\n' + invAnchor, 'what-we-do anchor');

/* ── Contact becomes a deep-nocturne band ── */
swap('<section class="section section--ink" id="contact" aria-labelledby="contact-heading">',
  '<section class="section section--ink mb-contact" id="contact" aria-labelledby="contact-heading">',
  'contact band');

/* ── Footer public-domain credit ── */
const CREDIT = '<span class="footer__copy mb-credit">Light studies after Hammersh&oslash;i, Kr&oslash;yer, Halonen and Jansson &mdash; details from works in the public domain.</span>';
swap('<span class="footer__copy">© 2026 · Stockholm</span>',
  CREDIT + '\n      <span class="footer__copy">© 2026 · Stockholm</span>', 'footer credit');

/* ── Write ── */
const dir = path.join(__dirname, 'masters');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'index.html'), html);
console.log('built preview/masters/index.html (' + (html.length / 1024).toFixed(1) + ' KB)');
