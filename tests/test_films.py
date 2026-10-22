"""Run with python -m unittest discover -s tests -v."""
import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]

class FilmDeliveryTests(unittest.TestCase):
    def test_container_ships_films(self):
        dockerfile = (ROOT / 'Dockerfile').read_text()
        self.assertIn('COPY films/ /usr/share/caddy/films/', dockerfile)

    def test_autumn_is_in_method_with_paper_economics_between(self):
        from html.parser import HTMLParser
        class Sections(HTMLParser):
            def __init__(self):
                super().__init__(); self.sections = []; self.current = None
            def handle_starttag(self, tag, attrs):
                attrs = dict(attrs)
                if tag == 'section':
                    self.current = {'id': attrs.get('id'), 'class': attrs.get('class', ''), 'films': []}
                    self.sections.append(self.current)
                elif tag == 'video' and self.current is not None:
                    self.current['films'].append(attrs.get('poster'))
            def handle_endtag(self, tag):
                if tag == 'section': self.current = None
        parser = Sections(); parser.feed((ROOT / 'index.html').read_text(encoding='utf-8'))
        sections = {s['id']: s for s in parser.sections}
        self.assertEqual(sections['economics']['films'], [])
        self.assertIn('section--paper-soft', sections['economics']['class'])
        self.assertEqual(sections['method']['films'], ['films/autumn.jpg'])
        ids = [s['id'] for s in parser.sections]
        self.assertLess(ids.index('executives'), ids.index('economics'))
        self.assertLess(ids.index('economics'), ids.index('method'))
        self.assertTrue(any(not s['films'] for s in parser.sections[ids.index('method')+1:ids.index('contact')]))

    def test_autumn_ends_before_the_plan_example(self):
        html = (ROOT / 'index.html').read_text(encoding='utf-8')
        method = html.split('id="method"', 1)[1].split('</section>', 1)[0]
        self.assertNotIn('Your deal, written down', method)
        self.assertIn('We write the Plan with you.', method)
        self.assertIn('class="section section--paper-soft" id="plan-example"', html)
        example = html.split('id="plan-example"', 1)[1].split('</section>', 1)[0]
        self.assertIn('Your deal, written down', example)
        self.assertNotIn('<video', example)

    def test_no_visible_film_control(self):
        from html.parser import HTMLParser
        class Controls(HTMLParser):
            def __init__(self):
                super().__init__(); self.film_controls = []
            def handle_starttag(self, tag, attrs):
                attrs = dict(attrs)
                if attrs.get('id') == 'filmToggle' or (tag == 'video' and 'controls' in attrs):
                    self.film_controls.append(attrs)
        parser = Controls(); parser.feed((ROOT / 'index.html').read_text(encoding='utf-8'))
        self.assertEqual(parser.film_controls, [])

    def test_every_film_has_mp4_fallback_and_poster(self):
        from html.parser import HTMLParser
        class Videos(HTMLParser):
            def __init__(self):
                super().__init__(); self.videos = []; self.current = None
            def handle_starttag(self, tag, attrs):
                attrs = dict(attrs)
                if tag == 'video':
                    self.current = {'attrs': attrs, 'sources': []}
                    self.videos.append(self.current)
                elif tag == 'source' and self.current is not None:
                    self.current['sources'].append(attrs)
            def handle_endtag(self, tag):
                if tag == 'video': self.current = None
        parser = Videos(); parser.feed((ROOT / 'index.html').read_text(encoding='utf-8'))
        self.assertEqual(len(parser.videos), 4)
        for video in parser.videos:
            self.assertIn('poster', video['attrs'])
            if video['attrs']['poster'] in ('films/autumn.jpg', 'films/bluehour-portrait.jpg'):
                self.assertEqual(video['attrs'].get('data-playback-rate'), '0.5')
            self.assertTrue((ROOT / video['attrs']['poster']).is_file())
            self.assertTrue(any(s.get('type') == 'video/mp4' for s in video['sources']))
            for source in video['sources']:
                self.assertTrue((ROOT / source['data-src']).is_file())

if __name__ == '__main__':
    unittest.main()
