"""Run with python -m unittest discover -s tests -v."""
import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]

class FilmDeliveryTests(unittest.TestCase):
    def test_container_ships_films(self):
        dockerfile = (ROOT / 'Dockerfile').read_text()
        self.assertIn('COPY films/ /usr/share/caddy/films/', dockerfile)

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
        self.assertEqual(len(parser.videos), 3)
        for video in parser.videos:
            self.assertIn('poster', video['attrs'])
            self.assertTrue((ROOT / video['attrs']['poster']).is_file())
            self.assertTrue(any(s.get('type') == 'video/mp4' for s in video['sources']))
            for source in video['sources']:
                self.assertTrue((ROOT / source['data-src']).is_file())

if __name__ == '__main__':
    unittest.main()
